import {useState, useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";

import { Loader } from "../Loader/Loader";
import { Dog } from "../Dog/Dog";
import { Pagination } from "../Pagination/Pagination";

export function DogList() {
    const [isLoading, setLoading] = useState(true);
    const [dogs, setDogs] = useState([]);
    const [zip, setZip] = useState(60616);
    const [distance, setDistance] = useState(15);
    const [age, setAge] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const {pageNum} = useParams();
    let history = useHistory();

    // match page param and page number
    if (page !== pageNum) {
        setPage(pageNum);
    }

    // update pages from pagination
    const nextPage = () => {
        setPage(page + 1);
        history.push('/' + (parseInt(page) + 1));
    }

    const prevPage = () => {
        setPage(page - 1);
        history.push('/' + (parseInt(page) - 1));
    }

    // get dogs
    const getDogs = () => {
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
            return fetch('https://api.petfinder.com/v2/animals?type=dog&limit=12&location=' + zip + '&distance=' + distance + '&page=' + page, {
                headers: {
                    'Authorization': data.token_type + ' ' + data.access_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        })
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            setDogs(data.animals);
            setTotalPages(data.pagination.total_pages);
            setLoading(false);
        })
        .catch(function (err) {
            console.log('something went wrong', err);
        });
    }

    // update dogs on page change
    useEffect(() => {
        getDogs();
    }, [page]);


    if (isLoading){
        return (
            <Loader />
        );
    }

    return (
        <div>
            <div className="dog-list">
                {dogs.map((dog) => {
                    return (
                        <Dog key={dog.id} dog={dog} />
                    )
                })}
            </div>
            <Pagination page={page} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} />
        </div>
    );
}
