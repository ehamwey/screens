import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";

import ConnectionError from "Components/connection_error";
import DigitalBridge from "Components/digital_bridge";
import Departures from "Components/eink/bus/departures";
import FareInfo from "Components/eink/bus/fare_info";
import Header from "Components/eink/bus/header";
import FlexZoneContainer from "Components/flex_zone_container";
import { NoServiceBottom, NoServiceTop } from "Components/no_service";
import OvernightDepartures from "Components/overnight_departures";

const TopScreenLayout = forwardRef(
  ({ currentTimeString, stopName, departures }, ref): JSX.Element => {
    return (
      <div className="single-screen-container">
        <Header stopName={stopName} currentTimeString={currentTimeString} />
        <Departures
          currentTimeString={currentTimeString}
          departures={departures}
          size="large"
          ref={ref}
        />
      </div>
    );
  }
);

const BottomScreenLayout = forwardRef(
  (
    {
      currentTimeString,
      departures,
      globalAlert,
      stopId,
      nearbyConnections,
      serviceLevel
    },
    ref
  ): JSX.Element => {
    return (
      <div className="single-screen-container">
        <FlexZoneContainer
          currentTimeString={currentTimeString}
          departures={departures}
          globalAlert={globalAlert}
          nearbyConnections={nearbyConnections}
          serviceLevel={serviceLevel}
          ref={ref}
        />
        <FareInfo />
        <DigitalBridge stopId={stopId} />
      </div>
    );
  }
);

const useApiResponse = id => {
  const DATA_REFRESH_MS = 30000;

  const [apiResponse, setApiResponse] = useState(null);
  const apiVersion = document.getElementById("app").dataset.apiVersion;

  const fetchData = async () => {
    try {
      const result = await fetch(`/api/screen/${id}?version=${apiVersion}`);
      const json = await result.json();

      if (json.force_reload === true) {
        window.location.reload(false);
      }
      setApiResponse(json);
    } catch (err) {
      setApiResponse({ success: false });
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, DATA_REFRESH_MS);

    return () => clearInterval(interval);
  }, []);

  return apiResponse;
};

const DefaultScreenLayout = ({ apiResponse }): JSX.Element => {
  // Fit as many rows as will fit in departures and later departures
  const MAX_DEPARTURE_ROWS = 7;
  const MAX_LATER_DEPARTURE_ROWS = 5;
  const MAX_DEPARTURES_HEIGHT = 1312;
  const MAX_LATER_DEPARTURES_HEIGHT = 585;

  const [departureCount, setDepartureCount] = useState(MAX_DEPARTURE_ROWS);
  const [laterDepartureCount, setLaterDepartureCount] = useState(
    MAX_LATER_DEPARTURE_ROWS
  );
  const departuresRef = useRef(null);
  const laterDeparturesRef = useRef(null);

  useLayoutEffect(() => {
    if (departuresRef.current) {
      const departuresHeight = departuresRef.current.clientHeight;
      if (departuresHeight > MAX_DEPARTURES_HEIGHT) {
        setDepartureCount(departureCount - 1);
      }
    }

    if (laterDeparturesRef.current) {
      const laterDeparturesHeight = laterDeparturesRef.current.clientHeight;
      if (laterDeparturesHeight > MAX_LATER_DEPARTURES_HEIGHT) {
        setLaterDepartureCount(laterDepartureCount - 1);
      }
    }
  });

  const departuresData = apiResponse.departures.slice(0, departureCount);
  const laterDeparturesData = apiResponse.departures.slice(
    departureCount,
    departureCount + laterDepartureCount
  );

  return (
    <div>
      <TopScreenLayout
        currentTimeString={apiResponse.current_time}
        stopName={apiResponse.stop_name}
        departures={departuresData}
        ref={departuresRef}
      />
      <BottomScreenLayout
        currentTimeString={apiResponse.current_time}
        departures={laterDeparturesData}
        globalAlert={apiResponse.global_alert}
        stopId={apiResponse.stop_id}
        nearbyConnections={apiResponse.nearbyConnections}
        serviceLevel={apiResponse.service_level}
        ref={laterDeparturesRef}
      />
    </div>
  );
};

const NoServiceScreenLayout = (): JSX.Element => {
  // COVID Level 5 message
  return (
    <div>
      <NoServiceTop mode="bus" />
      <NoServiceBottom />
    </div>
  );
};

const NoDeparturesScreenLayout = ({ apiResponse }): JSX.Element => {
  // We successfully fetched data, but there are no predictions.
  // For now, assume that this is because it's the middle of the night.
  return (
    <div>
      <OvernightDepartures
        size="double"
        currentTimeString={apiResponse.currentTimeString}
      />
    </div>
  );
};

const NoConnectionScreenLayout = (): JSX.Element => {
  // We weren't able to fetch data. Show a connection error message.
  return (
    <div>
      <ConnectionError />
      <ConnectionError />
    </div>
  );
};

const ScreenLayout = ({ apiResponse }): JSX.Element => {
  if (!apiResponse || apiResponse.success === false) {
    return <NoConnectionScreenLayout />;
  }

  if (apiResponse.serviceLevel === 5) {
    return <NoServiceScreenLayout />;
  }

  if (!apiResponse.departures || apiResponse.departures.length === 0) {
    return <NoDeparturesScreenLayout apiResponse={apiResponse} />;
  }

  return <DefaultScreenLayout apiResponse={apiResponse} />;
};

const ScreenContainer = ({ id }): JSX.Element => {
  const apiResponse = useApiResponse(id);
  return <ScreenLayout apiResponse={apiResponse} />;
};

export default ScreenContainer;
export { ScreenLayout };
