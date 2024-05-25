import React from "react";

const splitDestination = (destination) => {
  const viaPattern = /(.+) (via .+)/;
  const parenPattern = /(.+) (\(.+)/;
  const atPattern = /(.+) (at .+)/;
  const dashPattern = /(.+) (\- .+)/

  if (viaPattern.test(destination)) {
    return viaPattern.exec(destination).slice(1);
  } else if (parenPattern.test(destination)) {
    return parenPattern.exec(destination).slice(1);
  } else if (dashPattern.test(destination)) {
    return [dashPattern.exec(destination).slice(1)[0], dashPattern.exec(destination).slice(1)[1].substring(2)];
  } else if (atPattern.test(destination)) {
    return atPattern.exec(destination).slice(1);
  } else {
    return [destination];
  }
};

const BaseDepartureDestination = ({ destination }): JSX.Element => {
  if (!destination) {
    return null;
  }

  const [primaryDestination, secondaryDestination] = splitDestination(
    destination
  );

  return (
    <div className="base-departure-destination__container">
      <div className="base-departure-destination__primary">
        {primaryDestination}
      </div>
      {secondaryDestination && (
        <div className="base-departure-destination__secondary">
          {secondaryDestination}
        </div>
      )}
    </div>
  );
};

export default BaseDepartureDestination;
