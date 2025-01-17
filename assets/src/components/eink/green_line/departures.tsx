import React from "react";

import BaseDepartureTime from "Components/eink/base_departure_time";
import InlineAlert from "Components/eink/green_line/inline_alert";
import TakeoverInlineAlert from "Components/eink/green_line/takeover_inline_alert";

import { einkTimeRepresentation } from "Util/time_representation";

const Departure = ({ time, currentTimeString }): JSX.Element => {
  return (
    <div className="departures__departure">
      <BaseDepartureTime
        time={einkTimeRepresentation(time, currentTimeString)}
      />
    </div>
  );
};

enum HeadwayMessageVariant {
  Main,
  Sub,
}

interface HeadwayMessageProps {
  destination: string;
  headway: number;
  variant: HeadwayMessageVariant;
}
const HeadwayMessage = ({
  destination,
  headway,
  variant,
}: HeadwayMessageProps): JSX.Element => {
  const range = 2;
  const message = (
    <>
      Trains to {destination} every{" "}
      <span className="departures__headway-message__range">
        {headway - range}-{headway + range}
      </span>{" "}
      minutes
    </>
  );

  switch (variant) {
    case HeadwayMessageVariant.Main:
      return (
        <>
          <div className="departures__headway-message departures__headway-message--large">
            {message}
          </div>
          <div className="departures__headway-message__subheading">
            Live updates are not available during this reduced service
          </div>
        </>
      );
    case HeadwayMessageVariant.Sub:
      return <div className="departures__headway-message">{message}</div>;
  }
};

// Displays up to 2 departures, padding with a headway
// message when there is only 0 or 1 departure to show.
const DepartureList = ({
  departures,
  currentTimeString,
  destination,
  headway,
}: DepartureListProps): JSX.Element[] => {
  const renderedDepartures = departures.map(({ id, time }) => (
    <Departure time={time} currentTimeString={currentTimeString} key={id} />
  ));

  if (renderedDepartures.length < 2) {
    renderedDepartures.push(
      <HeadwayMessage
        destination={destination}
        headway={headway}
        variant={HeadwayMessageVariant.Sub}
        key="departure-list-headway"
      />
    );
  }

  return [
    ...renderedDepartures.slice(0, 1),
    <div className="departures__hairline" key="departure-list-hairline" />,
    ...renderedDepartures.slice(1, 2),
  ];
};

interface DepartureListProps {
  departures: { time: string }[];
  currentTimeString: string;
  destination: string;
  headway: number;
}

const DeparturesListPsa = ({ psaFilename }): JSX.Element => {
  const srcPath = `https://mbta-dotcom.s3.amazonaws.com/screens/images/psa/${psaFilename}`;
  return (
    <div>
      <img src={srcPath} />
    </div>
  );
};

const DepartureWithPsa = ({
  departures,
  currentTimeString,
  destination,
  headway,
  psaFilename,
}): JSX.Element[] => {
  let firstDepartureOrHeadway;

  if (departures.length > 0) {
    firstDepartureOrHeadway = (
      <Departure
        time={departures[0].time}
        currentTimeString={currentTimeString}
        key={departures[0].id}
      />
    );
  } else {
    firstDepartureOrHeadway = (
      <HeadwayMessage
        destination={destination}
        headway={headway}
        variant={HeadwayMessageVariant.Sub}
        key={"departures-list-headway"}
      />
    );
  }

  const psa = <DeparturesListPsa psaFilename={psaFilename} />;

  return [firstDepartureOrHeadway, psa];
};

const Departures = ({
  departures,
  destination,
  headway,
  inlineAlert,
  currentTimeString,
  serviceLevel,
  isHeadwayMode,
  psaFilename,
}): JSX.Element => {
  let departuresComponent;

  if (psaFilename) {
    departuresComponent = (
      <DepartureWithPsa
        departures={departures}
        currentTimeString={currentTimeString}
        destination={destination}
        headway={headway}
        psaFilename={psaFilename}
      />
    );
  } else if (isHeadwayMode) {
    departuresComponent = (
      <HeadwayMessage
        destination={destination}
        headway={headway}
        variant={HeadwayMessageVariant.Main}
      />
    );
  } else {
    departuresComponent = (
      <DepartureList
        departures={departures}
        currentTimeString={currentTimeString}
        destination={destination}
        headway={headway}
      />
    );
  }

  return (
    <div className="departures">
      <div className="departures__container">
        {departuresComponent}
        <div className="departures__delay-badge">
          {serviceLevel > 1 ? (
            <TakeoverInlineAlert />
          ) : (
            <InlineAlert alertData={inlineAlert} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Departures;
