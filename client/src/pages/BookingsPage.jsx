import React, { useEffect, useState } from 'react'
import AccounNavs from './AccounNav';
import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';

function BookingPages() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings').then(response => {
      console.log({ data: response.data })
      setBookings(response.data)
    })
  }, [])
  return (

    <div>
      <AccounNavs />
      <Link>
      </Link>
      {bookings?.map(booking => (
        <Link to={`/account/bookings/${booking._id}`}>
          <div className='mb-5 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
            <div className='w-48'>
              <img classname='object-cover' src={'http://localhost:5000/uploads/' + booking.place.photos[0]} alt="" />
            </div>

            <div className='py-3 pr-3 grow'>
              <h2 className='text-xl'>{booking.place.title}</h2>
              <div className=' flex border-t border-gray-500 mt-2 py-2  mb-2 mt-2 text-sm text-gray-500'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
                &rarr;
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                {format(new Date(booking.checkOut), 'yyyy-MM-dd')}

              </div>
              <div className='text-xl'>
                <div className='flex gap-1'>
                  <div className='text-2xl'>
                    {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Nights |
                    ${booking.price}
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>

              </div>
            </div>



          </div>
        </Link>

      ))}

    </div>
  )
}

export default BookingPages;