import React from 'react';
import LargeSpinnerSVG from './large_spinner.svg';
import SmallSpinnerSVG from './small_spinner.svg';

export const SMALL_SIZE = "small";
export const LARGE_SIZE = "large";

const largeText = (
  <div className="loading">
    <img src={LargeSpinnerSVG}
         alt="Loading"/>
    <h2>Loading</h2>
    <h6>Retrieving data from AlphaVantage takes around 30 seconds </h6>
    <h6> because I am getting access to their data for free.</h6>
  </div>
)

export default (props) => {
  return(
    <div>
      { props.size === null || props.size === SMALL_SIZE
        ? largeText
        : (
            <div className="loading">
              <h3 style={{display:"inline"}}>Loading</h3>
              <img src={SmallSpinnerSVG}
                   alt="Loading Spinner"/>
            </div>
          )
      }
    </div>
  )
};
