import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

import { Loader } from "../Loader/Loader";

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
            <Loader />
        );
    }

    return (
        <div className="dog-detail">
            <div className="dog-detail__photos">
            {!dog.photos &&
                <div className="single-image">
                    <svg className="no-image" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1280 1280"><title>paw print</title><path d="M461.5 32.4c-16.7 3.9-29.3 11.2-43.6 25.5C406.3 69.4 398 81.1 390 97c-47.7 95.4-31.6 252.8 35.3 343 9.1 12.3 24.9 28.5 35.7 36.6 35.4 26.7 75.2 28.1 107.1 3.8 32.7-25 55.1-73.2 63.6-136.9 2.1-16.4 2.5-67.2.5-84-8.2-70.2-29.1-128.3-61.8-172.2-8.2-10.9-24.3-27.3-34.4-35-9.4-7.1-27.2-16.3-36.5-18.8-8.3-2.3-30.2-2.9-38-1.1zM854.6 52.6c-31.1 6.1-63.6 29.9-90.5 66.1-34.6 46.5-58 108-66.8 175.8-2.8 21.6-2.5 69.8.5 89.4 7 44.7 21.9 78.9 44.2 101.1 19.1 19.2 43.1 28.1 67.5 25.2 58.1-7.2 115.4-70.6 146-161.6 25.4-75.5 28.1-155 7.3-215.6-20.3-59.1-61.5-89.7-108.2-80.4zM209.5 379c-40.9 6.5-71.7 39.5-85.6 91.9-7.9 30.1-9 71.6-2.8 108.1 14.3 85 63.5 163.1 121.7 193.3 29.8 15.4 59.5 18.1 85 7.5 37.6-15.6 62.3-56 70.4-115.3 1.6-11.9 1.6-47.2-.1-61-13-110.2-80.9-206.9-156.4-223-8.9-1.9-24.7-2.6-32.2-1.5zM1057 460c-36 7.7-71.3 33-100.6 72.2-31.8 42.6-53.2 98.2-59.4 154.2-1.6 14.6-1.3 46 .5 60.1 12.2 94.8 76.6 140.3 149.5 105.9 39.1-18.5 74.5-56.6 99.8-107.3 48-96 44.9-208.5-7.3-260.6-22-22-52.3-31-82.5-24.5zM622.5 637.9c-66.2 11.8-149.7 81.3-223.7 186.1-57.9 82.1-98.7 170.5-110.9 240.5-2.9 16.8-3.2 46.8-.6 58.3 4.1 17.9 11 29.7 24.4 42.2 22.4 20.7 49.3 32.9 83 37.6 17.5 2.4 52.9 1.5 75.4-1.9 30.1-4.7 55.5-10.8 112.4-27.2 55-15.8 70.4-19.1 85.6-18.1 19.3 1.3 33.8 6 75.4 24.3 29.8 13.1 46.4 19.3 60.6 22.8 53 12.8 97.6-3.9 143.5-53.7 13.7-14.8 17.9-22 22.2-37.7 2.4-9 2.6-11 2.6-32.1 0-19.1-.3-24.5-2.3-35.5-11.8-66.7-46.9-147.3-97.6-224-60.3-91.2-131.1-156.9-190.2-176.4-21.5-7.1-39.8-8.7-59.8-5.2z"/></svg>
                </div>
            }
            {dog.photos === 1 &&
                <div className="single-image">
                    <img src={dog.photos[0].large} alt={dog.name} />
                </div>
            }
            {dog.photos.length > 1 &&
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
                }
            </div>
            <div className="dog-detail__info">
                <div className="dog-detail__info__dog">
                    <h2>{dog.name}</h2>
                    <p>{dog.breeds.primary}
                        {dog.breeds.secondary &&
                            <span> Mix</span>
                        }
                    </p>
                    <p>{dog.size}-sized {dog.age} {dog.gender}</p>
                    <div className="limitations">
                        {dog.environment.cats === false &&
                            <p>&#10008; Cats</p>
                        }
                        {dog.environment.children === false &&
                            <p>&#10008; Children</p>
                        }
                        {dog.environment.dogs === false &&
                            <p>&#10008; Other Dogs</p>
                        }
                    </div>
                </div>
                <div className="dog-detail__info__org">
                    <p className="org-name">{organization.name}</p>
                    {dog.contact.email &&
                        <a href={"mailto:" + dog.contact.email + "?subject=" + dog.name}>
                            {dog.contact.email}
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1280 1280"><title>paw print</title><path d="M461.5 32.4c-16.7 3.9-29.3 11.2-43.6 25.5C406.3 69.4 398 81.1 390 97c-47.7 95.4-31.6 252.8 35.3 343 9.1 12.3 24.9 28.5 35.7 36.6 35.4 26.7 75.2 28.1 107.1 3.8 32.7-25 55.1-73.2 63.6-136.9 2.1-16.4 2.5-67.2.5-84-8.2-70.2-29.1-128.3-61.8-172.2-8.2-10.9-24.3-27.3-34.4-35-9.4-7.1-27.2-16.3-36.5-18.8-8.3-2.3-30.2-2.9-38-1.1zM854.6 52.6c-31.1 6.1-63.6 29.9-90.5 66.1-34.6 46.5-58 108-66.8 175.8-2.8 21.6-2.5 69.8.5 89.4 7 44.7 21.9 78.9 44.2 101.1 19.1 19.2 43.1 28.1 67.5 25.2 58.1-7.2 115.4-70.6 146-161.6 25.4-75.5 28.1-155 7.3-215.6-20.3-59.1-61.5-89.7-108.2-80.4zM209.5 379c-40.9 6.5-71.7 39.5-85.6 91.9-7.9 30.1-9 71.6-2.8 108.1 14.3 85 63.5 163.1 121.7 193.3 29.8 15.4 59.5 18.1 85 7.5 37.6-15.6 62.3-56 70.4-115.3 1.6-11.9 1.6-47.2-.1-61-13-110.2-80.9-206.9-156.4-223-8.9-1.9-24.7-2.6-32.2-1.5zM1057 460c-36 7.7-71.3 33-100.6 72.2-31.8 42.6-53.2 98.2-59.4 154.2-1.6 14.6-1.3 46 .5 60.1 12.2 94.8 76.6 140.3 149.5 105.9 39.1-18.5 74.5-56.6 99.8-107.3 48-96 44.9-208.5-7.3-260.6-22-22-52.3-31-82.5-24.5zM622.5 637.9c-66.2 11.8-149.7 81.3-223.7 186.1-57.9 82.1-98.7 170.5-110.9 240.5-2.9 16.8-3.2 46.8-.6 58.3 4.1 17.9 11 29.7 24.4 42.2 22.4 20.7 49.3 32.9 83 37.6 17.5 2.4 52.9 1.5 75.4-1.9 30.1-4.7 55.5-10.8 112.4-27.2 55-15.8 70.4-19.1 85.6-18.1 19.3 1.3 33.8 6 75.4 24.3 29.8 13.1 46.4 19.3 60.6 22.8 53 12.8 97.6-3.9 143.5-53.7 13.7-14.8 17.9-22 22.2-37.7 2.4-9 2.6-11 2.6-32.1 0-19.1-.3-24.5-2.3-35.5-11.8-66.7-46.9-147.3-97.6-224-60.3-91.2-131.1-156.9-190.2-176.4-21.5-7.1-39.8-8.7-59.8-5.2z"/></svg>
                        </a>
                    }
                    {dog.contact.phone &&
                        <p>{dog.contact.phone}</p>
                    }
                    <a className="more" href={dog.url} target="_blank" rel="noopener noreferrer">
                        Find Out More about {dog.name}
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1280 1280"><title>paw print</title><path d="M461.5 32.4c-16.7 3.9-29.3 11.2-43.6 25.5C406.3 69.4 398 81.1 390 97c-47.7 95.4-31.6 252.8 35.3 343 9.1 12.3 24.9 28.5 35.7 36.6 35.4 26.7 75.2 28.1 107.1 3.8 32.7-25 55.1-73.2 63.6-136.9 2.1-16.4 2.5-67.2.5-84-8.2-70.2-29.1-128.3-61.8-172.2-8.2-10.9-24.3-27.3-34.4-35-9.4-7.1-27.2-16.3-36.5-18.8-8.3-2.3-30.2-2.9-38-1.1zM854.6 52.6c-31.1 6.1-63.6 29.9-90.5 66.1-34.6 46.5-58 108-66.8 175.8-2.8 21.6-2.5 69.8.5 89.4 7 44.7 21.9 78.9 44.2 101.1 19.1 19.2 43.1 28.1 67.5 25.2 58.1-7.2 115.4-70.6 146-161.6 25.4-75.5 28.1-155 7.3-215.6-20.3-59.1-61.5-89.7-108.2-80.4zM209.5 379c-40.9 6.5-71.7 39.5-85.6 91.9-7.9 30.1-9 71.6-2.8 108.1 14.3 85 63.5 163.1 121.7 193.3 29.8 15.4 59.5 18.1 85 7.5 37.6-15.6 62.3-56 70.4-115.3 1.6-11.9 1.6-47.2-.1-61-13-110.2-80.9-206.9-156.4-223-8.9-1.9-24.7-2.6-32.2-1.5zM1057 460c-36 7.7-71.3 33-100.6 72.2-31.8 42.6-53.2 98.2-59.4 154.2-1.6 14.6-1.3 46 .5 60.1 12.2 94.8 76.6 140.3 149.5 105.9 39.1-18.5 74.5-56.6 99.8-107.3 48-96 44.9-208.5-7.3-260.6-22-22-52.3-31-82.5-24.5zM622.5 637.9c-66.2 11.8-149.7 81.3-223.7 186.1-57.9 82.1-98.7 170.5-110.9 240.5-2.9 16.8-3.2 46.8-.6 58.3 4.1 17.9 11 29.7 24.4 42.2 22.4 20.7 49.3 32.9 83 37.6 17.5 2.4 52.9 1.5 75.4-1.9 30.1-4.7 55.5-10.8 112.4-27.2 55-15.8 70.4-19.1 85.6-18.1 19.3 1.3 33.8 6 75.4 24.3 29.8 13.1 46.4 19.3 60.6 22.8 53 12.8 97.6-3.9 143.5-53.7 13.7-14.8 17.9-22 22.2-37.7 2.4-9 2.6-11 2.6-32.1 0-19.1-.3-24.5-2.3-35.5-11.8-66.7-46.9-147.3-97.6-224-60.3-91.2-131.1-156.9-190.2-176.4-21.5-7.1-39.8-8.7-59.8-5.2z"/></svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
