import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';

import 'swiper/swiper.scss';
//import 'swiper/components/navigation/navigation.scss';
//import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Navigation, Pagination, A11y]);

export function DogDetail() {
    const [isLoading, setLoading] = useState(true);
    const {organizationId, dogId} = useParams();
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
                console.log(data[0].animal);
            })
            .catch(function (error) {
                console.log(error);
            })
        });
    }

    useEffect(() => {
        getDog();
    }, [dogId]);

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
                <div className="dog-detail__photos">
                    <div className="dog-detail__photos__container">
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            loop
                            navigation
                            pagination={{ clickable: true }}
                            a11y
                        >
                            {dog.photos.map((photo, index) => (
                                <SwiperSlide key={index} >
                                    <div className="slide">
                                        <img src={photo.large} alt={dog.name} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="dog-detail__info">
                    <div className="dog-detail__info__dog">
                        <p>{dog.name}</p>
                        <p>{dog.breeds.primary}
                            {dog.breeds.secondary &&
                                <span> Mix</span>
                            }
                        </p>
                        <p>{dog.size} {dog.gender} {dog.age}</p>
                        {dog.environment.cats &&
                            <p>&#10008; No Cats</p>
                        }
                        {dog.environment.children &&
                            <p>&#10008; No Children</p>
                        }
                        {dog.environment.dogs &&
                            <p>&#10008; No Other Dogs</p>
                        }
                    </div>
                    <div className="dog-detail__info__org">
                        <p>{organization.name}</p>
                        {dog.contact.email &&
                            <a href={"mailto:" + dog.contact.email + "?subject=" + dog.name}>{dog.contact.email}</a>
                        }
                        {dog.contact.phone &&
                            <p>{dog.contact.phone}</p>
                        }
                        <a href={dog.url}>Find Out More about {dog.name}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
