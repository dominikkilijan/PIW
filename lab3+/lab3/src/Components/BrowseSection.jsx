import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeartLiked from '../Assets/HeartLiked.svg';
import HeartUnliked from '../Assets/HeartUnliked.svg';
import Arrow from '../Assets/Arrow.svg';
import hotelsData from '../HotelsData';

function BrowseSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const chunkedHotels = chunkArray(hotelsData.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.description.toLowerCase().includes(searchQuery.toLowerCase())
  ), 4);

  return (
    <>
      <section id="browse" className="browse-section">
        <p className="title-middle">Explore the hotels:</p>
        <input
          className="searchbar"
          placeholder="Search by hotel name, place etc."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <section className="hotel-card-space">
          {chunkedHotels.map((chunk, index) => (
            <div key={index} className="hotel-row">
              {chunk.map((hotel) => (
                <article key={hotel.id} className="hotel-card">
                  <div className="card-image2">
                    <div className="offer-image" style={{ backgroundImage: `url(${hotel.image})`, backgroundSize: 'cover' }}>
                      <div className="card-image offer-image">
                        <p className="chip">{hotel.location}</p>
                        <p className="chip round-chip"> <img className="clickable" src={hotel.liked ? HeartLiked : HeartUnliked} alt="Heart" /> </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-middle">{hotel.name}</p>
                  <p className="text-small">{hotel.description}</p>
                  <div className="hotel-card-footer">
                    <p className="text-middle">{hotel.rating}</p>
                    <p className="text-middle">{hotel.price}</p>
                  </div>
                  <Link to={`/hotels/${hotel.id}`} className="view-offer-button">
                    <p className="text-small">View offer  </p>
                    <p className="text-small "><img src={Arrow} alt="Arrow" />  </p>
                  </Link>
                </article>
              ))}
            </div>
          ))}
        </section>
      </section>
    </>
  );
}

export default BrowseSection;
