import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../init';
import HeartUnliked from '../Assets/HeartUnliked.svg';
import Mail from '../Assets/Mail.svg';
import Edit from '../Assets/Edit.svg';

function ViewSection() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchHotel = async () => {
      const hotelRef = doc(db, "hotels", id);
      const hotelSnap = await getDoc(hotelRef);

      if (hotelSnap.exists()) {
        setHotel({ ...hotelSnap.data(), id: hotelSnap.id });
        setFormData({
          name: hotelSnap.data().name,
          location: hotelSnap.data().location,
          price: hotelSnap.data().price,
          description: hotelSnap.data().description
        });
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchHotel();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const hotelRef = doc(db, "hotels", id);
    await updateDoc(hotelRef, formData);
    setHotel(prevState => ({
      ...prevState,
      ...formData
    }));
    setIsEditing(false);
  };

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
          {isEditing ? (
            <form onSubmit={handleFormSubmit}>
              <p><b>Name: </b>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </p>
              <p><b>Location: </b>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </p>
              <p><b>Price: </b>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </p>
              <p><b>Description: </b></p>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="input-field"
              ></textarea>
              <button type="submit" className="submit-button">Save</button>
            </form>
          ) : (
            <>
              <p><b>Name: </b> {hotel.name} </p>
              <p><b>Location: </b> {hotel.location} </p>
              <p><b>Local category: </b> {hotel.rating} </p>
              <p><b>Price: </b> {hotel.price} </p>
              <p><b>Description: </b></p>
              <article>{hotel.description}</article>
            </>
          )}
          <div className="contact-button" onClick={handleEditToggle}>
            <p>{isEditing ? "Cancel" : "Edit"}</p>
            <img src={Edit} alt="Edit" />
          </div>
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
