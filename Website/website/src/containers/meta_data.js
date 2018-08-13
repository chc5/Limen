import React from 'react';


const INFORMATION = "1. Information";
const SYMBOL = "2. Symbol";
const LAST_UPDATE = "3. Last Refreshed";
const TIME_ZONE = "4. Time Zone";

export default (props) => {
  let metaData = props.metaData;
  return(
    <div key={metaData[INFORMATION]}>
      <h6 key={SYMBOL}> {metaData[SYMBOL].toUpperCase()} {metaData[INFORMATION]}</h6>
      <h6 key={LAST_UPDATE}> {metaData[LAST_UPDATE]} {metaData[TIME_ZONE]}</h6>
    </div>
  );
}
