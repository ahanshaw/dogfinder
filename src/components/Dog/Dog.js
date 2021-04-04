import {Link} from 'react-router-dom';
import { Paw } from "../Paw/Paw";

export function Dog({dog}) {
    return (
        <Link className="dog" to={`${dog.organization_id}/${dog.id}`}>
            <div className="dog__photo">
                {!dog.primary_photo_cropped &&
                    <Paw />
                }
                {dog.primary_photo_cropped &&
                    <img src={dog.primary_photo_cropped.medium} alt={dog.name} />
                }
            </div>
            <div className="dog__info">
                <div className="dog__info__name">
                    <h2>
                        {dog.name}
                    </h2>
                </div>
                <div className="dog__info__detail">
                    <p>{dog.age} {dog.gender} {dog.breeds.primary}
                        {dog.breeds.secondary &&
                            <span> Mix</span>
                        }
                    </p>
                </div>
            </div>
        </Link>
    );
}
