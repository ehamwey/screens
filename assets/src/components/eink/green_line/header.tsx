import React, { useLayoutEffect, useRef, useState } from "react";

import { classWithModifier, formatTimeString } from "Util/util";

const HeaderRouteIcon = ({ route }): JSX.Element => {
  let path;

  if (route === "Green-B") {
    path = (
      <path d="M64,0 C99.346224,0 128,28.653776 128,64 C128,99.346224 99.346224,128 64,128 C28.653776,128 0,99.346224 0,64 C0,28.653776 28.653776,0 64,0 Z M69.664,32.168 L40.096,32.168 L40.096,95 L70.544,95 C74.768,95 74.768,95 78.772,93.944 C82.776,92.888 82.776,92.888 85.9,90.688 C89.024,88.488 89.024,88.488 90.872,85.012 C92.72,81.536 92.72,81.536 92.72,76.784 C92.72,70.888 92.72,70.888 89.86,66.708 C87,62.528 87,62.528 81.192,60.856 C85.416,58.832 85.416,58.832 87.572,55.664 C89.728,52.496 89.728,52.496 89.728,47.744 C89.728,43.344 89.728,43.344 88.276,40.352 C86.824,37.36 86.824,37.36 84.184,35.556 C81.544,33.752 81.544,33.752 77.848,32.96 C74.152,32.168 74.152,32.168 69.664,32.168 Z M68.96,67.016 C73.448,67.016 73.448,67.016 76.176,69.084 C78.904,71.152 78.904,71.152 78.904,75.992 C78.904,78.456 78.904,78.456 78.068,80.04 C77.232,81.624 77.232,81.624 75.824,82.548 C74.416,83.472 74.416,83.472 72.568,83.868 C70.72,84.264 70.72,84.264 68.696,84.264 L53.912,84.264 L53.912,67.016 L68.96,67.016 Z M66.848,42.904 C68.696,42.904 68.696,42.904 70.412,43.212 C72.128,43.52 72.128,43.52 73.448,44.312 C74.768,45.104 74.768,45.104 75.56,46.512 C76.352,47.92 76.352,47.92 76.352,50.12 C76.352,54.08 76.352,54.08 73.976,55.84 C71.6,57.6 71.6,57.6 67.904,57.6 L53.912,57.6 L53.912,42.904 L66.848,42.904 Z"></path>
    );
  } else if (route === "Green-C") {
    path = (
      <path d="M64,0 C99.346224,0 128,28.653776 128,64 C128,99.346224 99.346224,128 64,128 C28.653776,128 0,99.346224 0,64 C0,28.653776 28.653776,0 64,0 Z M65.628,30.672 C58.412,30.672 58.412,30.672 52.648,33.224 C46.884,35.776 46.884,35.776 42.924,40.264 C38.964,44.752 38.964,44.752 36.852,50.78 C34.74,56.808 34.74,56.808 34.74,63.848 C34.74,70.712 34.74,70.712 36.852,76.652 C38.964,82.592 38.964,82.592 42.924,86.992 C46.884,91.392 46.884,91.392 52.648,93.9 C58.412,96.408 58.412,96.408 65.628,96.408 C71.436,96.408 71.436,96.408 76.276,94.648 C81.116,92.888 81.116,92.888 84.724,89.544 C88.332,86.2 88.332,86.2 90.532,81.448 C92.732,76.696 92.732,76.696 93.26,70.8 L79.884,70.8 C79.092,77.136 79.092,77.136 75.528,81.008 C71.964,84.88 71.964,84.88 65.628,84.88 C60.964,84.88 60.964,84.88 57.708,83.076 C54.452,81.272 54.452,81.272 52.428,78.28 C50.404,75.288 50.404,75.288 49.48,71.548 C48.556,67.808 48.556,67.808 48.556,63.848 C48.556,59.712 48.556,59.712 49.48,55.84 C50.404,51.968 50.404,51.968 52.428,48.932 C54.452,45.896 54.452,45.896 57.708,44.092 C60.964,42.288 60.964,42.288 65.628,42.288 C68.18,42.288 68.18,42.288 70.512,43.124 C72.844,43.96 72.844,43.96 74.692,45.456 C76.54,46.952 76.54,46.952 77.772,48.932 C79.004,50.912 79.004,50.912 79.356,53.288 L92.732,53.288 C92.116,47.832 92.116,47.832 89.74,43.608 C87.364,39.384 87.364,39.384 83.712,36.524 C80.06,33.664 80.06,33.664 75.44,32.168 C70.82,30.672 70.82,30.672 65.628,30.672 Z"></path>
    );
  } else if (route === "Green-D") {
    path = (
      <path d="M64,0 C99.346224,0 128,28.653776 128,64 C128,99.346224 99.346224,128 64,128 C28.653776,128 0,99.346224 0,64 C0,28.653776 28.653776,0 64,0 Z M66.572,32.168 L39.468,32.168 L39.468,95 L66.572,95 C73.788,95 73.788,95 79.112,92.58 C84.436,90.16 84.436,90.16 88,85.936 C91.564,81.712 91.564,81.712 93.324,75.904 C95.084,70.096 95.084,70.096 95.084,63.232 C95.084,55.4 95.084,55.4 92.928,49.592 C90.772,43.784 90.772,43.784 86.944,39.912 C83.116,36.04 83.116,36.04 77.88,34.104 C72.644,32.168 72.644,32.168 66.572,32.168 Z M63.14,43.784 C68.244,43.784 68.244,43.784 71.72,45.236 C75.196,46.688 75.196,46.688 77.308,49.416 C79.42,52.144 79.42,52.144 80.344,55.972 C81.268,59.8 81.268,59.8 81.268,64.552 C81.268,69.744 81.268,69.744 79.948,73.352 C78.628,76.96 78.628,76.96 76.428,79.204 C74.228,81.448 74.228,81.448 71.412,82.416 C68.596,83.384 68.596,83.384 65.604,83.384 L53.284,83.384 L53.284,43.784 L63.14,43.784 Z"></path>
    );
  } else if (route === "Green-E") {
    path = (
      <path d="M64,0 C99.346224,0 128,28.653776 128,64 C128,99.346224 99.346224,128 64,128 C28.653776,128 0,99.346224 0,64 C0,28.653776 28.653776,0 64,0 Z M87.552,32.168 L40.56,32.168 L40.56,95 L88.256,95 L88.256,83.384 L54.376,83.384 L54.376,67.984 L84.824,67.984 L84.824,57.248 L54.376,57.248 L54.376,43.784 L87.552,43.784 L87.552,32.168 Z"></path>
    );
  } else {
    path = null;
  }

  return (
    <div className="header__stop-container-route-image">
      <svg
        width="128px"
        height="128px"
        viewBox="0 0 128 128"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" strokeWidth="1" fill="#FFFFFF" fillRule="evenodd">
          {path}
        </g>
      </svg>
    </div>
  );
};

const Header = ({ stopName, routeId, currentTimeString }): JSX.Element => {
  const SIZES = ["small", "large"];
  const MAX_HEIGHT = 216;

  const ref = useRef(null);
  const [stopSize, setStopSize] = useState(1);
  const currentTime = formatTimeString(currentTimeString);

  useLayoutEffect(() => {
    const height = ref.current.clientHeight;
    if (height > MAX_HEIGHT) {
      setStopSize(stopSize - 1);
    }
  });

  const environmentName = document.getElementById("app").dataset
    .environmentName;

  return (
    <div className="header">
      <div className="header__environment">
        {["screens-dev", "screens-dev-green"].includes(environmentName)
          ? environmentName
          : ""}
      </div>
      <div className="header__time">{currentTime}</div>
      <div className="header__realtime-indicator">
        <img
          className="header__realtime-indicator-icon"
          src="/images/live-data-small.svg"
        ></img>
        UPDATED LIVE EVERY MINUTE
      </div>
      <div className="header__stop-container">
        <div className="header__stop-container-route">
          <HeaderRouteIcon route={routeId} />
        </div>
        <div
          className={classWithModifier("header__stop-name", SIZES[stopSize])}
          ref={ref}
        >
          {stopName}
        </div>
      </div>
    </div>
  );
};

export default Header;
