import React, { useEffect } from 'react';
import Perks from '../perks';
import { useState } from 'react';
import PhotoUploader from '../photoUploader';
import axios from 'axios';
import AccounNavs from './AccounNav';
import { useNavigate, useParams } from 'react-router-dom';

function PlacesForm() {

    // const { action } = useParams();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhoto] = useState([]);
    // const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerk] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckin] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuest] = useState(1);
    const [price, setPrice] = useState(100);


    const navigate = useNavigate()



    function inputHeader(text) {
        return (
            <div>
                <h2 className='text-2xl mt-4'>{text}</h2>
            </div>
        )
    }

    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        )
    }


    // useEffect(() => {
    //     console.log({addedPhotos})
        
    //     savePlace()

    // }, [id, addedPhotos])

    // a function that edits and add new information to the database
    const placeData = {
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    };

    

    async function savePlace() {
        if (id) {
            await axios.put('/places', {
                id,
                ...placeData
            });
           
        }
        else {
            await axios.post('/places', placeData);
            
        }
        
        // navigate('/account/places')
    }
    
    async function handleOnSubmit(ev) {
        ev.preventDefault();
        await savePlace()
        
        navigate('/account/places')
    }

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/'+id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhoto(data.photos);
            setDescription(data.description);
            setPerk(data.perks);
            setExtraInfo(data.extraInfo)
            setCheckin(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuest(data.maxGuests);
            setPrice(data.price);


        })
    }, [id])


    return (
        <div>
            <AccounNavs />
            <div className="">

                <form onSubmit={handleOnSubmit}>
                    {preInput('Title', 'Title should be short and catchy as in advertisement')}
                    <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apartmant" />
                    {preInput('Address', 'Address to this Place')}
                    <input type='text'
                        value={address} onChange={ev => setAddress(ev.target.value)} placeholder='address' />
                    {preInput('Photos', 'More = Better')}
                    <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhoto} />
                    {preInput('Description', 'Description of the place')}
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)} className='border-gray-500 w-full my-1 py-2 px-3 rounded-2xl h-200' />

                    {preInput('Perks', 'Select all perk of your place')}
                    <Perks selected={perks} onChange={setPerk} />
                    {preInput('Extra info', 'House Rules')}
                    <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} className='h-200 border-gray-500 w-full my-1 py-2 px-3 rounded-2xl' />
                    {preInput('Check in&out, max guests', 'Add check in and out times, remember to have some time window for cleaning the room between guests')}
                    <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
                        <div >
                            <h3 className='mt-2 mb-1'>Check in time</h3>
                            <input value={checkIn} onChange={ev => setCheckin(ev.target.value)} type='text' placeholder='14:00' />
                        </div>
                        <div>
                            <h3 className='mt-2 mb-1'>Check out time</h3>
                            <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} type='text' placeholder='15:00' />
                        </div>
                        <div>
                            <h3 className='mt-2 mb-1'>Max number of guests</h3>
                            <input type='number' value={maxGuests} onChange={ev => setMaxGuest(ev.target.value)} />
                        </div>
                        <div>
                        <h3 className='mt-2 mb-1'>Price Per Night</h3>
                            <input type="text" value={price} onChange={ev => setPrice(ev.target.value)} placeholder="Enter price" />

                        </div>
                    </div>
                    <div>
                        <button className='my-4 bg-grey-300 w-full bg-primary text-white rounded-2xl'>Save</button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default PlacesForm;