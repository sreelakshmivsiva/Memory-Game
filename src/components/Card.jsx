import React from 'react';
const Card = ({ value, isFlipped, onClick }) => 
<div
      className={`card w-16 h-16 flex items-center justify-center border rounded cursor-pointer ${
        isFlipped ? 'bg-white' : 'bg-gray-500'
      }`}
      onClick={onClick}
    >
      {isFlipped ? <span className="text-2xl">{value}</span> : ''}
    </div>
;
export default Card;