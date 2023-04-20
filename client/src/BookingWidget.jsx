import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from 'react-router-dom';
import { UserContex } from './userContex';
import { useNavigate } from 'react-router-dom';

function BookingWidgets({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuest, setNumberOfGuest] = useState(1);
    const [name, setName] = useState('');
    // const[email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const navigate = useNavigate()
    const { user } = useContext(UserContex)


    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {

        if (user) {
            const response = await axios.post('/bookings', {
                checkOut, name,
                phone, numberOfGuest,
                checkIn,
                place: place._id,
                price: numberOfNights * place.price,
                user: user._id
            });

            const bookingId = response.data._id
            // setRedirect(`/account/bookings/${bookingId}`)
            navigate(`/account/bookings/${bookingId}`)
        }
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user])
    return (
        <div>
            <div className='mt-8 mb-8 gap-4 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
                <div>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl' >Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn} <br />
                    Check-Out: {place.checkOut} <br />
                    Max number of guests: {place.maxGuests}
                </div>
                <div>
                    <div className='bg-white shadow p-4 rounded-2xl'>
                        <div className='text-2xl text-center'>
                            Price: {place.price} / per night
                        </div>
                        <div className='border rounded-2xl mt-4'>
                            <div className="flex">
                                <div className='py-3 px-3'>
                                    <label>Check In:</label>
                                    <input type="date"
                                        value={checkIn}
                                        onChange={ev => setCheckIn(ev.target.value)} />
                                </div>
                                <div className='py-3 px-3 border-l'>
                                    <label>Check Out:</label>
                                    <input value={checkOut}
                                        onChange={ev => setCheckOut(ev.target.value)}
                                        type="date" />
                                </div>
                            </div>
                            <div className='py-3 px-4 border-t'>
                                <label>number of guests:</label>
                                <input value={numberOfGuest}
                                    onChange={ev => setNumberOfGuest(ev.target.value)}
                                    type="number" />
                            </div>

                            {numberOfNights > 0 && (
                                <div className='py-3 px-4 border-t'>
                                    <label>Your Full Name</label>
                                    <input value={name}
                                        onChange={ev => setName(ev.target.value)}
                                        type="text" />

                                    <label>Phone Number</label>
                                    <input value={phone}
                                        onChange={ev => setPhone(ev.target.value)}
                                        type="tel" />
                                </div>
                            )}
                        </div>

                        <button onClick={bookThisPlace} className="p-2 bg-grey-300 w-full bg-primary text-white rounded-2xl mt-4">
                            Book this place
                            {numberOfNights > 0 && (
                                <span> ${numberOfNights * place.price}</span>
                            )}

                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingWidgets;