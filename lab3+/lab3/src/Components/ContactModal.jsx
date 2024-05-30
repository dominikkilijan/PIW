// import React from 'react';
// import closingX from '../Assets/closingX.svg';
// import Mail from '../Assets/Mail.svg';

// function ContactModal({ onClose, hotelName }) {
//   const handleSend = (e) => {
//     e.preventDefault();
//     alert("Mail sent");
//     onClose();
//   };

//   return (
//     <dialog className="modal" open>
//       <p className="close-button" onClick={onClose}><img className="clickable" src={closingX} alt="Close" /></p>
//       <p id="contact-title" className="title-large">Contact</p>
//       <p className="text-small">You're contacting the {hotelName} hotel</p>
//       <form className="contact-form">
//         <textarea className="contact-input"></textarea>
//       </form>
//       <div className="nav-links rightside-buttons">
//         <div className="button" onClick={onClose}>Cancel </div>
//         <div className="contact-button" onClick={handleSend}>Send <img className="clickable" src={Mail} alt="Send" /></div>
//       </div>
//     </dialog>
//   );
// }

// export default ContactModal;

import React, { useRef } from 'react';
import closingX from '../Assets/closingX.svg';
import Mail from '../Assets/Mail.svg';

function ContactModal({ onClose, hotelName }) {
  const messageRef = useRef('');

  const handleSend = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    alert(`Mail sent: ${message}`);
    onClose();
  };

  return (
    <dialog className="modal" open>
      <p className="close-button" onClick={onClose}>
        <img className="clickable" src={closingX} alt="Close" />
      </p>
      <p id="contact-title" className="title-large">Contact</p>
      <p className="text-small">You're contacting the {hotelName} hotel</p>
      <form className="contact-form">
        <textarea className="contact-input" ref={messageRef}></textarea>
      </form>
      <div className="nav-links rightside-buttons">
        <div className="button" onClick={onClose}>Cancel</div>
        <div className="contact-button" onClick={handleSend}>
          Send <img className="clickable" src={Mail} alt="Send" />
        </div>
      </div>
    </dialog>
  );
}

export default ContactModal;
