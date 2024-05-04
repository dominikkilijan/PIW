// import React from 'react';
// import { Link } from 'react-router-dom';
// import HeartUnliked from '../Assets/HeartUnliked.svg';
// import Mail from '../Assets/Mail.svg';
// import hotelsData from '../HotelsData';

// function ViewSection() {
//   // Funkcja wyszukująca hotel o określonym ID w hotelsData
//   const findHotelById = (id) => {
//     return hotelsData.find((hotel) => hotel.id === id);
//   };

//   // Pobieramy dane hotelu o ID równym 1
//   const hotel = findHotelById(1);

//   return (
//     <section id="view" className="view-section">
//       <p className="title-large welcome">Serene Retreat</p>
//       <div className="grid">
//         <div style={{ backgroundImage: `url(${hotel.image})` }} className="view-image-container">
//           <p className="chip"> Add to favorites <img className="clickable" src={HeartUnliked} alt="HeartUnliked" /> </p>
//         </div>
//         <article className="view-details">
//           <p> <b>Location: </b> {hotel.location} </p>
//           <p> <b>Local category: </b> {hotel.rating} </p>
//           <p> <b>Price: </b> {hotel.price} </p>
//           <p> <b>Description: </b></p>
//           <article>
//             {hotel.description}
//           </article>
//           <div className="contact-button">
//             <p>Contact</p>
//             <img src={Mail} alt="Mail" />
//           </div>
//           <div className="view-cards">
//             <img className="view-image" src={hotel.image} alt={hotel.name} />
//             <img className="view-image" src={hotel.image} alt={hotel.name} />
//           </div>
//         </article>
//       </div>
//     </section>
//   );
// }

// export default ViewSection;


import React from 'react';
import { Link, useParams } from 'react-router-dom';
import HeartUnliked from '../Assets/HeartUnliked.svg';
import Mail from '../Assets/Mail.svg';
import hotelsData from '../HotelsData';

function ViewSection() {
  // Pobranie parametru ID z URL za pomocą hooka useParams z React Router
  const { id } = useParams();

  // Funkcja wyszukująca hotel o określonym ID w hotelsData
  const findHotelById = (id) => {
    return hotelsData.find((hotel) => hotel.id === parseInt(id));
  };

  // Pobieramy dane hotelu na podstawie przekazanego ID z URL
  const hotel = findHotelById(id);

  if (!hotel) {
    return <p>Hotel not found</p>; // Obsługa sytuacji, gdy hotel o podanym ID nie istnieje
  }

  return (
    <section id="view" className="view-section">
      <p className="title-large welcome">Serene Retreat</p>
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
