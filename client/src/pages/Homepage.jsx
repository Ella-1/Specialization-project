import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Homepage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        })
    }, [])
    return (
        <div>
            {/* <Header /> */}
            <div className=" mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {places.length > 0 && places.map(place => (
                <Link to={'/place/'+place._id}>
                    <div className="bg-gray-500 rounded-2xl flex mb-2">
                    {place.photos?.[0] && (
                        <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:5000/uploads/'+place.photos?.[0]} alt="" />
                    )}
                    </div>
                    
                    <h3 className="font-bold ">{place.address}</h3>
                    <h2 className="text-sm truncate text-gray-500">{place.title}</h2>
                    <div className="mt-1">
                        <span className="font-bold">${place.price} Per night</span>
                    </div>
                </Link>
            ))}
            </div>
            
        </div>
    )
}

export default Homepage;