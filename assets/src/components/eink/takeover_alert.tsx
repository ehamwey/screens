import React from "react";

const TakeoverAlert = ({ name, mode }): JSX.Element => {
  if (!name || !mode || !["bus", "subway"].includes(mode)) {
    return null;
  } else {
    return (
      <div className="takeover-alert">
        <img
          src={`https://mbta-dotcom.s3.amazonaws.com/screens/images/psa/${name}-${mode}.png`}
        />
      </div>
    );
  }
};

export default TakeoverAlert;
