import React from 'react';

const EmbeddedMap = () => {
  return (
    <div>

      <iframe
        title="Embedded Map"
        src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.9793066790785!2d74.47702107397104!3d19.883095681494826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc4461181601cf%3A0x5060fb8815261b84!2sYuvaTech%20Computer%20Institute!5e0!3m2!1sen!2sin!4v1713613489543!5m2!1sen!2sin"}
        width="300"
        height="300"
        style={{ border: '2px solid white'}}        
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default EmbeddedMap;
