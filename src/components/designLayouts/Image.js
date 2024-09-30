import React from "react";
import placehold from "../../assets/images/placeholderimage.jpg"

const Image = ({ imgSrc, className }) => {
  return <img loading="lazy" className={className} src={imgSrc} alt={imgSrc} 
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = `${placehold}`;
  }}
  />;
};

export default Image;
