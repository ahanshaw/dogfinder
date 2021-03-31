import {useState, useEffect} from 'react';

export function DogDetail() {
    const [isLoading, setLoading] = useState(true);
    const [dogId, setDogId] = useState('51040728');
    const [organizationId, setOrganizationId] = useState('IL126');
    const [organization, setOrganization] = useState();
    const [dog, setDog] = useState();

    const getDog = () => {
        const key = "NALA3V53iwbO5ojzf2Vxbi3NO21OP3H78iNOq7qhrr3wDDUtA7";
        const secret = "v1pMZO8xrk569hosPez56ZHsC4lXeFYG0wYiuGRm";

        setLoading(true);

        fetch('https://api.petfinder.com/v2/oauth2/token', {
            method: 'POST',
            body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            return Promise.all([
                fetch('https://api.petfinder.com/v2/animals/' + dogId, {
              		headers: {
              			'Authorization': data.token_type + ' ' + data.access_token,
              			'Content-Type': 'application/x-www-form-urlencoded'
              		}
              	}),
                fetch('https://api.petfinder.com/v2/organizations/' + organizationId, {
              		headers: {
              			'Authorization': data.token_type + ' ' + data.access_token,
              			'Content-Type': 'application/x-www-form-urlencoded'
              		}
              	})
            ])
            .then(function (responses) {
                return Promise.all(responses.map(function (response) {
                    return response.json();
                }));
            })
            .then(function (data) {
                setDog(data[0].animal);
                setOrganization(data[1].organization);
                setLoading(false);
                //console.log(data[1].organization);
            })
            .catch(function (error) {
                console.log(error);
            })
        });
    }

    useEffect(() => {
        getDog();
    }, []);

    if (isLoading){
        return (
            <div className="wrapper">
                <p>Loading ...</p>
            </div>
        );
    }

    return (
        <div className="wrapper">
            <div className="dog-detail">
            <p>{dog.name}</p>
            <p>{organization.name}</p>
            </div>
        </div>
    );
}
