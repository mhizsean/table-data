import React from "react";
import Popup from "reactjs-popup";
import './Popup.css';

const PopUp = () => (
  <Popup trigger={<button> Add Data</button>} position="right center">
    <div>Hello</div>
  </Popup>
);

export default PopUp;