import React, { useEffect, useState } from "react";

import { StationStatus, StationInformation } from 'gbfs-typescript-types/v3.0';
import { DepartureRoutePill } from "./route_pill";
import BaseDepartureDestination from "Components/eink/base_departure_destination";


type StationInfo = {
  num_bikes_available: number;
  num_docks_available: number;
  num_ebikes_available: number;
}

type StationData = {
  [key: string]: StationInfo;
}

type BlueBikesProps = {
  screenName: string;
}

const BlueBikes = ({ screenName }: BlueBikesProps) => {
  let BlueBikeStations: string[] = [];
  switch (screenName) {
    case "The Dighton":
      BlueBikeStations = ['f8351255-0de8-11e7-991c-3863bb43a7d0', 'f83512c9-0de8-11e7-991c-3863bb43a7d0']
      break;
    case "91 Glen":
      BlueBikeStations = ['25cc602a-152a-4abe-9df8-a131d0a5d94b', '42886366-9cbf-432c-ba84-beef38877c87', '13681246-4bf8-444a-a908-fa165e4ad298']
      break;
    default:
      break;
  }



  const [stationInfo, setStationInfo] = useState<StationInformation>();
  fetch("https://gbfs.lyft.com/gbfs/1.1/bos/en/station_information.json")
    .then((response) => response.json())
    .then((result: StationInformation) => setStationInfo(result));

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
          console.log(nextData);
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
  return (
    <div key="bikes">
      <div className="section section--normal">
        <div className="section-list section-header"><span className="section-header__name">Bikes</span></div>

      </div>
      <div
        className={"departure-container departure-container--group-start departure-container--group-end section section-list-container departures-container section--normal"}
      >
        {Object.entries(bikeStationData).sort(([a], [b]) => b.localeCompare(a)).map(([station_id, station]) => {
          return (
            <div className={"departure departure--no-via "} key={station_id}>

              <DepartureRoutePill route="BIKE" routeId="Bike-pl" />

              <div className="departure-destination">
                {(stationInfo && stationInfo.data && stationInfo.data.stations) && <BaseDepartureDestination destination={stationInfo.data.stations.find((station) => station.station_id == station_id)?.name} />}
              </div>
              <div
                className={"departure-time"}
              >
                <div className="base-departure-time bike_count">
                  {station && <>
                    <span className="base-departure-time__timestamp ">{(station.num_bikes_available)}</span>
                    <span className="base-departure-time__ampm">{"🚲"}</span>{" "}
                    <span className="base-departure-time__timestamp ">{(station.num_ebikes_available)}</span>
                    <span className="base-departure-time__ampm">{"⚡️"}</span> </>}
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>

  )
}

export default BlueBikes;
