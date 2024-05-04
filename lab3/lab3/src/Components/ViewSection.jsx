import React from 'react';
import { useParams } from 'react-router-dom';
import HeartUnliked from '../Assets/HeartUnliked.svg';
import Mail from '../Assets/Mail.svg';
import hotelsData from '../HotelsData';
import { useEffect } from 'react';

function ViewSection() {
  useEffect(() => {
    window.scrollTo(0, 0); // Przesuń widok na górę strony po zamontowaniu komponentu
  }, []);

  const { id } = useParams();

  const findHotelById = (id) => {
    return hotelsData.find((hotel) => hotel.id === parseInt(id));
  };

  const hotel = findHotelById(id);

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
