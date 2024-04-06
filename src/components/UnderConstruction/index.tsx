import React from 'react';
import './index.scss';
import construction from '../../images/under-construction.svg';

function UnderConstruction() {
  return (
    <div className="hs-under-construction">
      <h3>Ops... This page is currently under construction</h3>
      <img src={construction} alt="" srcSet="" />

      <p className="text-ha">hello world</p>
    </div>
  );
}

export default UnderConstruction;
