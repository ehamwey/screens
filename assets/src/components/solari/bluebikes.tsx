import React, { useEffect, useState } from "react";

import { StationStatus } from 'gbfs-typescript-types/v3.0';
import { classWithModifiers } from "util/util";
import { PlaceholderRoutePill, DepartureRoutePill } from "./route_pill";
import BaseDepartureDestination from "Components/eink/base_departure_destination";
import BaseDepartureTime from "Components/eink/base_departure_time";

const BlueBikeStations: string[] = [
  'f83512c9-0de8-11e7-991c-3863bb43a7d0'];

type StationInfo = {
  num_bikes_available: number;
  num_docks_available: number;
  num_ebikes_available: number;
}

type StationData = {
  [key: string]: StationInfo;
}

const BlueBikes = () => {

  const [bikeStationData, setBikeStationData] = useState<StationData>({});

  useEffect(() => {
    function getBikes() {
      console.log("updating bluebikes data");
      fetch("https://gbfs.lyft.com/gbfs/1.1/bos/en/station_status.json")
        .then((response) => response.json())
        .then((result: StationStatus) => {
          const nextData: StationData = {};
          result.data.stations.forEach((station) => {
            if (BlueBikeStations.includes(station.station_id)) {
              nextData[station.station_id] = {
                num_bikes_available: station.num_bikes_available,
                num_docks_available: station.num_docks_available || 0,
                num_ebikes_available: station.num_ebikes_available,
              }
            }
          });
          setBikeStationData(nextData);
        })
        .catch((error) => console.error(error));
    }
    getBikes()
    const interval = setInterval(() => getBikes(), 10000)
    return () => {
      clearInterval(interval);
    }
  }, []);
  console.log(bikeStationData["f83512c9-0de8-11e7-991c-3863bb43a7d0"]);
  return (
    <div>
      <div className="section section--normal">
        <div className="section-list section-header"><span className="section-header__name">Bikes</span></div>

      </div>
      <div
        className={"departure-container departure-container--group-start departure-container--group-end section section-list-container departures-container section--normal"}
      >
        <div className={"departure departure--no-via "}>

          <DepartureRoutePill route="BIKE" routeId="Bike-pl" />

          <div className="departure-destination">
            <BaseDepartureDestination destination={"Brighton Center"} />
          </div>
          <div
            className={"departure-time"}
          >
            <div className="base-departure-time bike_count">
              {bikeStationData["f83512c9-0de8-11e7-991c-3863bb43a7d0"] && <>
                <span className="base-departure-time__timestamp ">{(bikeStationData["f83512c9-0de8-11e7-991c-3863bb43a7d0"].num_bikes_available)}</span>
                <span className="base-departure-time__ampm">{"🚲"}</span>{" "}
                <span className="base-departure-time__timestamp ">{(bikeStationData["f83512c9-0de8-11e7-991c-3863bb43a7d0"].num_ebikes_available)}</span>
                <span className="base-departure-time__ampm">{"⚡️"}</span> </>}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default BlueBikes;
