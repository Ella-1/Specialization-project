import React from 'react'

function PlaceImgs({place, index=0,className=null}) {
    if (!place.photos?.length) {
        return '';
    }

    if (!className) {
        className ='object-cover'
    }
  return (

    <div>
        <img classname={className} src={'http://localhost:5000/uploads/'+place.photos[0]} alt="" />
    </div>
  )
}

export default PlaceImgs;