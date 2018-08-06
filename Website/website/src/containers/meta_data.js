import React from 'react';


const INFORMATION = "1. Information";
const SYMBOL = "2. Symbol";
const LAST_UPDATE = "3. Last Refreshed";
const TIME_ZONE = "4. Time Zone";

export default (props) => {
  let metaData = props.metaData;
  return(
    <div key={metaData[INFORMATION]}>
      <h1 key={SYMBOL}> {metaData[SYMBOL]} </h1>
      <h2 key={INFORMATION}> {metaData[INFORMATION]} </h2>
      <h3 key={LAST_UPDATE}> {metaData[LAST_UPDATE]} {metaData[TIME_ZONE]}</h3>
    </div>
  );
}
