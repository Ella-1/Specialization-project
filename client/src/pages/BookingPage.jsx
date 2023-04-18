import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AccounNavs from './AccounNav';
import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
// import PlaceGallery from '../placeGallary';

function BookingPage() {
  const { id } = useParams();
  const [booking, setBookings] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    axios.get('/bookings').then(response => {
      const foundBooking = response.data.find(({ _id }) => _id === id)
      if (foundBooking) {
        setBookings(foundBooking);
      }
    })


  }, [id])

  if (!booking) {
    return '';
  }

  if (showAllPhotos) {
    return (
      <div className='absolute insert-0 bg-black text-white min-w-full min-h-screen shadow shadow-gray-500'>
        <div className='p-14 grid gap-4'>
          <h2 className='text-3xl mr-48'>Photos of {booking.place.title}</h2>
          <button onClick={() => setShowAllPhotos(false)} className='fixed right-12  flex gap-1 py-2 px-4  bg-gray-500 rounded-2xl bg-white text-black'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
            Close Photos
          </button>
          {booking.place?.photos?.length > 0 && booking.place.photos.map(photo => (
            <div>
              <img src={'http://localhost:5000/uploads/' + photo} alt="" />
            </div>
          ))}
        </div>


      </div>
    )
  }
  return (
    <div>
      <AccounNavs />
      {/* Single Booking: {id} */}
      <div className='my-8'>
        <div className='text-3xl'>{booking.place.title}</div>

        <div>
          <a className='flex gap-1 my-2 block font-semibold underline' target="_blank" href={'https://maps.google.com/?=' + booking.place.address}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {booking.place.address}
            {/* <PlaceGallery place={booking.place}/> */}

          </a>
        </div>

        <div className='bg-gray-200 p-6 my-4 rounded-2xl'>
          <h2 className='text-2xl'>Your Booking information:</h2>
          <div>
          <div className='flex border-gray-500 mt-2 py-2  mb-2 mt-2 text-sm text-gray-500'>
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



        <div className="relative">
          <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div>
              {booking.place.photos?.[0] && (
                <div>
                  <img onClick={() => setShowAllPhotos(true)} src={'http://localhost:5000/uploads/' + booking.place.photos[0]} alt="" />
                </div>
              )}
            </div>
            <div className="grid">
              {booking.place.photos?.[1] && (
                <img onClick={() => setShowAllPhotos(true)} src={'http://localhost:5000/uploads/' + booking.place.photos[1]} alt="" />
              )}
              <div className="overflow-hidden">
                {booking.place.photos?.[2] && (
                  <img onClick={() => setShowAllPhotos(true)} src={'http://localhost:5000/uploads/' + booking.place.photos[2]} alt="" />
                )}
              </div>
            </div>
          </div>
          <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
            </svg>
            Show more photos
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingPage;