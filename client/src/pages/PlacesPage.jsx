import React, { useEffect, useState } from 'react'
import { Link, Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
import Perks from '../perks';
import axios from "axios";
import PhotoUploader from '../photoUploader';
import PlacesForm from './PlacesForms';
import AccounNavs from './AccounNav';
axios.defaults.withCredentials = true

function PlacesPage() {
    const [places, setPlaces] = useState([]);
    const { action } = useParams();


    // console.log(places)

    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            console.log(data)
            setPlaces(data);
            // console.log(data)
        })
    }, [])

    return (
        <div>
            <AccounNavs />
            <div>
                <div className='text-center'>
                    List of all added places
                    <br />
                    <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>

                        Add New Place
                    </Link>

                </div>


                <div className='mt-4'>
                    {places.map((place) => (
                        <Link to={'/account/places/' + place._id} className=' cursor-pointer flex gap-4 bg-gray-200 p-4 my-4 rounded-2xl'>
                            <div className='flex w-32 h-32 bg-gray-300 grow shrink-0'>
                                {place.photos.length > 0 && (
                                    <img classname="object-cover" src={'http://localhost:5000/uploads/' + place.photos[0]} alt="" />
                                )}
                            </div>
                            <div className='grow-1  shrink'>
                                <h2 className='text-xl'>{place.title}</h2>
                                <p className='text-sm text-bold mt-2'>{place.description}</p>
                            </div>
                            <div>

                            </div>
                        </Link>
                    ))}
                </div>
                {/* <PlacesForm  /> */}

                {/* {action === 'new' && (
                   
                )} */}



            </div>
        </div>

    )
}

export default PlacesPage;