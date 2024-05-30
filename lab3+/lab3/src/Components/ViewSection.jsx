import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../init'; // Adjust the path according to your project structure
import HeartUnliked from '../Assets/HeartUnliked.svg';
import Mail from '../Assets/Mail.svg';
import Edit from '../Assets/Edit.svg';

function ViewSection() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts

    const fetchHotel = async () => {
      const hotelRef = doc(db, "hotels", id);
      const hotelSnap = await getDoc(hotelRef);

      if (hotelSnap.exists()) {
        setHotel({ ...hotelSnap.data(), id: hotelSnap.id });
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchHotel();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!hotel) {
    return <p>Hotel not found</p>;
  }

  return (
    <section id="view" className="view-section">
      <p className="title-large welcome">{hotel.name}</p>
      <div className="grid">
        <div style={{ backgroundImage: `url(${hotel.image})` }} className="view-image-container">
          <p className="chip view-chip" style={{ marginBottom: '20px' }}> Add to favorites <img className="clickable" src={HeartUnliked} alt="HeartUnliked" /> </p>
        </div>
        <article className="view-details">
          <p> <b>Location: </b> {hotel.location} </p>
          <p> <b>Local category: </b> {hotel.rating} </p>
          <p> <b>Price: </b> {hotel.price} </p>
          <p> <b>Description: </b></p>
          <article>
            {hotel.description}
          </article>
          <div className="contact-button">
            <p>Contact</p>
            <img src={Mail} alt="Mail" />
          </div>
          <div className="contact-button">
            <p>Edit</p>
            <img src={Edit} alt="Edit" />
          </div>
          <div className="view-cards">
            <img className="view-image" src={hotel.image} alt={hotel.name} />
            <img className="view-image" src={hotel.image} alt={hotel.name} />
          </div>
        </article>
      </div>
    </section>
  );
}

export default ViewSection;
