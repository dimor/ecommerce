import React from "react";
import { useNavigate } from "react-router-dom";
import "./menu-item.styles.scss";



const MenuItem = ({ title, imageUrl, size, linkUrl}) => {

  const navigate = useNavigate();
  
  const navigateHandler = ()=> navigate(linkUrl);

  return(
  <div className={`${size} menu-item`}>
    <div
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
      className="background-image"
    ></div>
    <div onClick={navigateHandler} className="content">
      <h1 className="title">{title}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
)};

export default MenuItem;
