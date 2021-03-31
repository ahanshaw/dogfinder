//import {useState, useEffect} from 'react';

export function Dog({dog}){
    return (
        <div className="dog">
            <div className="dog__photo">
                {dog.primary_photo_cropped.medium &&
                    <img src={dog.primary_photo_cropped.medium} alt={dog.name} />
                }
            </div>
            <div className="dog__info">
                <div className="dog__info__name">
                    <h2>{dog.name}</h2>
                </div>
                <div className="dog__info__detail">
                    <p>{dog.age} {dog.gender} {dog.breeds.primary}
                        {dog.breeds.secondary &&
                            <span> Mix</span>
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}
