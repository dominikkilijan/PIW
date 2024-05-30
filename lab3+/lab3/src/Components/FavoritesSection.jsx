import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../init';
import HeartLiked from '../Assets/HeartLiked.svg';
import HeartUnliked from '../Assets/HeartUnliked.svg';
import Arrow from '../Assets/Arrow.svg';


const likedHotelsReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_LIKE':
      const updatedState = state.includes(action.payload)
        ? state.filter(id => id !== action.payload)
        : [...state, action.payload];
      localStorage.setItem('likedHotels', JSON.stringify(updatedState));
      return updatedState;
    case 'LOAD_LIKES':
      return action.payload || [];
    default:
      return state;
  }
};

function FavoritesSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hotelsData, setHotelsData] = useState([]);
  const [likedHotels, dispatch] = useReducer(likedHotelsReducer, [], () => {
    const savedLikes = localStorage.getItem('likedHotels');
    return savedLikes ? JSON.parse(savedLikes) : [];
  });

  useEffect(() => {
    const fetchHotels = async () => {
      const querySnapshot = await getDocs(collection(db, "hotels"));
      const hotelsList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setHotelsData(hotelsList);
    };

    fetchHotels();
  }, []);

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const filteredHotels = hotelsData.filter(hotel => likedHotels.includes(hotel.id));
  
  const chunkedHotels = chunkArray(filteredHotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.description.toLowerCase().includes(searchQuery.toLowerCase())
  ), 4);

  const handleToggleLike = (hotelId) => {
    dispatch({ type: 'TOGGLE_LIKE', payload: hotelId });
  };

  return (
    <section id="browse" className="browse-section">
      <p className="title-middle">Your Favorite Hotels:</p>
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
                      <p
                        className="chip round-chip clickable"
                        onClick={() => handleToggleLike(hotel.id)}
                      >
                        <img src={likedHotels.includes(hotel.id) ? HeartLiked : HeartUnliked} alt="Heart" />
                      </p>
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
                  <p className="text-small">View offer</p>
                  <p className="text-small"><img src={Arrow} alt="Arrow" /></p>
                </Link>
              </article>
            ))}
          </div>
        ))}
      </section>
    </section>
  );
}

export default FavoritesSection;
