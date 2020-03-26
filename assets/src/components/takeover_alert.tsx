import React from "react";

const TakeoverAlert = ({ mode }): JSX.Element => {
  const stripePath = (
    <path
      d="M28.5,-0.5 L11.5,-0.5 L11.5,1776.5 L28.5,1776.5 L28.5,-0.5 Z"
      stroke="#000000"
      fill="#000000"
    ></path>
  );

  const busIcon = (
    <g transform="translate(456.000000, 128.000000) scale(2)">
      <path d="M63.6480098,0.000902503618 C98.9874445,-0.184847449 127.009811,28.3258008 127.977635,63.6586531 C128.916397,97.9310025 100.182693,127.078166 64.3324188,127.999074 C28.9926265,128.187163 0.190854488,99.687443 0.000925514254,64.3422337 C-0.187134038,28.9970242 28.3082177,0.190837094 63.6480098,0.000902503618 Z M64.0285533,16 C55.8887756,16.1563202 47.8325519,17.6228158 40.1897649,20.3394378 C35.5919622,22.3223491 32.4625491,24.2867385 31.5160471,29.2252304 L28,56.5951756 L28,94.4594161 L34.1722092,94.4594161 L34.1722092,101.053774 C34.1806152,103.762728 36.4466731,105.956543 39.2440827,105.963954 C42.0413226,105.955962 44.3068833,103.762037 44.3151363,101.053245 L44.3151363,94.4588866 L83.8693005,94.4588866 L83.8693005,101.053245 C83.8559368,102.816213 84.8195144,104.450829 86.3939526,105.33607 C87.9683904,106.22131 89.9120445,106.22131 91.4864822,105.33607 C93.0609205,104.450829 94.0244981,102.816213 94.0111344,101.053245 L94.0111344,94.4588866 L100,94.4588866 L99.9991805,56.5951756 L96.5017133,29.2260242 C95.6134115,24.2875323 92.4842716,22.3604515 87.8285423,20.3394378 C80.1996491,17.6212142 72.1558934,16.154601 64.0285533,16 Z M39.223871,72.2907189 C42.205811,72.2851742 44.6278437,74.6214969 44.6337517,77.509149 C44.6374339,78.8962963 44.0714404,80.22795 43.0604722,81.2106743 C42.049504,82.1933981 40.6765272,82.746545 39.2440827,82.7482352 C36.2621421,82.7534813 33.8403594,80.4169156 33.8347687,77.529263 C33.8291973,74.6416109 36.241931,72.2962828 39.223871,72.2907189 Z M88.9376286,72.2907196 C91.9169058,72.2888218 94.3347757,74.6240799 94.3406974,77.509149 C94.3443757,78.8998756 93.7754601,80.2346667 92.7598772,81.2179876 C91.7442949,82.2013091 90.3658341,82.7520334 88.9296979,82.7482654 C85.9512455,82.7425267 83.5397358,80.401109 83.5416957,77.5160351 C83.5436598,74.6309617 85.9583514,72.2926214 88.9376286,72.2907196 Z M88.2343031,31.8451326 C89.6578432,31.8309029 90.8797286,32.8235342 91.1126089,34.1835672 L94.0089487,55.7907921 C94.047749,56.0388067 94.047749,56.2910661 94.0089487,56.5390807 L94.0089487,56.6885792 C94.012507,57.4319268 93.707925,58.1455754 93.1634636,58.6695882 C92.6190021,59.1936011 91.8801915,59.4841565 91.1126089,59.4763007 L37.1568054,59.4763007 C36.3878623,59.4425485 35.6643533,59.1139357 35.1460445,58.5628662 C34.6277358,58.0117968 34.3572632,57.2836015 34.394353,56.5390807 C34.3558251,56.291046 34.3558251,56.0388263 34.394353,55.7907921 L37.2906928,34.1835672 C37.5323808,32.8212456 38.7597011,31.830407 40.1870325,31.8451326 L88.2343031,31.8451326 Z M78.9616442,22.9216678 C80.2206532,22.9216678 81.2412821,23.9100246 81.2412821,25.1292245 C81.2412821,26.3484244 80.2206532,27.3367811 78.9616442,27.3367811 L49.2113167,27.3367811 C47.9523074,27.3367811 46.9316787,26.3484244 46.9316787,25.1292245 C46.9316787,23.9100246 47.9523074,22.9216678 49.2113167,22.9216678 L78.9616442,22.9216678 Z"></path>
    </g>
  );

  const subwayIcon = (
    <g transform="translate(456.000000, 128.000000)">
      <path d="M127.29602,0.00180500723 C197.974889,-0.369694898 254.019622,56.6516016 255.95527,127.317306 C257.832794,195.862005 200.365387,254.156332 128.664838,255.998149 C57.985253,256.374326 0.381708975,199.374886 0.00185102851,128.684467 C-0.374268076,57.9940484 56.6164354,0.381674188 127.29602,0.00180500723 Z M94.1386063,33.7745665 L93.6995013,33.7773254 C79.381965,33.9830757 67.6972358,45.4917972 67.3794972,59.9118827 L67.3794972,59.9118827 L67.3794972,156.740366 L67.385257,157.138297 C67.6520345,169.323027 76.1942715,179.784984 88.1201472,182.458399 L88.1201472,182.458399 L56.8905064,229.331863 L75.0237086,229.331863 L97.364347,196.561664 L158.993235,196.561664 L181.333873,229.331863 L199.111345,229.331863 L167.763305,182.458399 L168.150993,182.368476 C180.002944,179.526668 188.418134,168.961989 188.504488,156.740366 L188.504488,156.740366 L188.504488,59.9710818 L188.492191,59.5312658 C187.970117,45.0475373 175.968574,33.5827174 161.423084,33.7789226 L161.423084,33.7789226 L94.5793005,33.7789226 L94.1386063,33.7745665 Z M85.42716,148.063327 C88.816818,144.673541 93.9146942,143.659428 98.3436162,145.493876 C102.772538,147.328324 105.660287,151.650063 105.660287,156.443837 C105.660287,162.989362 100.35421,168.29564 93.8086394,168.295935 C89.0148312,168.295935 84.6929322,165.408616 82.8582718,160.979808 C81.0236113,156.551 82.0375019,151.453114 85.42716,148.063327 Z M161.719348,144.47349 C168.286214,144.47349 173.6143,149.788255 173.63073,156.355054 C173.647084,162.921852 168.345598,168.263151 161.778815,168.295935 L161.778815,168.295935 L161.659882,168.295935 L161.357713,168.290667 C154.931235,168.098513 149.791864,162.820824 149.807967,156.355054 C149.824397,149.788255 155.152483,144.47349 161.719348,144.47349 Z M160.898574,60.7870562 C164.41899,60.7029376 167.82657,62.0669596 170.318646,64.5699379 C172.896656,67.1592257 174.251527,70.7228982 174.044859,74.3708761 L174.044859,74.3708761 L174.044859,91.7930273 L174.057659,92.1974067 C174.061926,92.467072 174.057659,92.7368953 174.044859,93.0068766 C173.883996,96.4292187 172.370137,99.6474741 169.83634,101.95361 C167.302543,104.259747 163.95638,105.464841 160.534024,105.303768 L160.534024,105.303768 L95.3494283,105.303768 L94.944888,105.316567 C94.6750628,105.320834 94.4050795,105.316567 94.1355704,105.303768 C90.7132042,105.142905 87.4949261,103.629058 85.1887736,101.095278 C82.8826211,98.5614989 81.6775179,95.2153594 81.8385926,91.7930273 L81.8385926,91.7930273 L81.8385926,74.3708761 L81.8230512,74.0063732 C81.7229066,70.4861915 83.0718242,67.0723192 85.5640528,64.5691882 C88.1422203,61.9797424 91.7003686,60.6095346 95.3494283,60.8009366 L95.3494283,60.8009366 L160.534024,60.8009366 Z M141.334162,39.5271057 C143.73064,39.5567549 145.684065,41.4581247 145.778397,43.852912 L145.778397,43.852912 L145.778397,51.556802 L145.775197,51.7375994 L145.761995,51.9464606 C145.55854,54.2976842 143.539165,56.0961871 141.156564,56.0010052 L141.156564,56.0010052 L114.90502,55.941806 L114.669893,55.9387716 C113.575933,55.8957033 112.533057,55.4498567 111.744674,54.6822969 C110.899978,53.8599114 110.416649,52.7356051 110.401053,51.556802 L110.401053,51.556802 L110.401053,43.852912 L110.414372,43.6409449 C110.614102,41.3245821 112.556647,39.5252698 114.90502,39.5271057 L114.90502,39.5271057 Z M118.105886,15.9994433 C113.949183,15.9992469 110.579241,19.368529 110.57865,23.5252024 C110.577519,25.5222666 111.370208,27.4378927 112.782156,28.8502307 C114.194104,30.2625686 116.109518,31.0557946 118.104997,31.0530948 L118.104997,31.0530948 L118.106597,31.0530948 L118.350181,31.0491935 C122.394134,30.9200496 125.632602,27.6010835 125.632409,23.5259135 C125.632213,19.3692401 122.262589,15.9996396 118.105886,15.9994433 Z M138.074986,16.0015765 C133.918595,16.0015765 130.549174,19.3709736 130.549174,23.5273357 C130.549174,25.5233345 131.341883,27.437623 132.753277,28.8490072 C134.164671,30.2603915 136.078973,31.0530948 138.074986,31.0530948 C142.231377,31.0530948 145.600798,27.6836977 145.600798,23.5273357 C145.600798,19.3709736 142.231377,16.0015765 138.074986,16.0015765 Z"></path>
    </g>
  );

  // Hatched params
  const start = 2736.524756;
  const d = 56.605915;
  const n = 38;
  const rectWidth = 20;

  return (
    <div className="takeover-alert">
      <svg
        width="1168px"
        height="1080px"
        viewBox="0 0 1168 1080"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" strokeWidth="1" fill="#FFFFFF" fillRule="evenodd">
          {/* Solid black background */}
          <path
            d="M0,0 L1132,0 C1151.88225,0 1168,16.117749 1168,36 L1168,1044 C1168,1063.88225 1151.88225,1080 1132,1080 L0,1080 L0,1080 L0,0 Z"
            fill="#000000"
          ></path>

          {/* Header Text */}
          <g transform="translate(0.000000, 512.000000)" fill="#FFFFFF">
            <text
              fontFamily="neue-haas-grotesk-text"
              fontSize="112"
              fontWeight="bold"
              letterSpacing="1"
            >
              <tspan x="208" y="169">
                Service change
              </tspan>
            </text>
            <g transform="translate(40.000000, 56.000000)">
              <path d="M67.1491379,0.846167388 C68.1033266,1.39793178 68.8958993,2.1906827 69.4475396,3.14508598 L136.154023,118.555222 C137.893533,121.564781 136.864503,125.414979 133.855621,127.15488 C132.898213,127.708506 131.81185,128 130.70596,128 L-2.70700692,128 C-6.18253103,128 -9,125.181897 -9,121.705592 C-9,120.599452 -8.70857172,119.512845 -8.15507022,118.555222 L58.551413,3.14508598 C60.2909231,0.135527038 64.1402556,-0.893733873 67.1491379,0.846167388 Z M71.3666606,98.0894977 L56.7666728,98.0894977 C55.823246,98.0894977 55.0584475,98.8542962 55.0584475,99.797723 L55.0584475,99.797723 L55.0584475,114.397711 C55.0584475,115.341138 55.823246,116.105936 56.7666728,116.105936 L56.7666728,116.105936 L71.3666606,116.105936 C72.3100873,116.105936 73.0748858,115.341138 73.0748858,114.397711 L73.0748858,114.397711 L73.0748858,99.797723 C73.0748858,98.8542962 72.3100873,98.0894977 71.3666606,98.0894977 L71.3666606,98.0894977 Z M73.2583899,40.0365297 L54.8216394,40.0373615 L54.7683873,40.0398563 C53.8267978,40.0987057 53.1111955,40.9097216 53.1700448,41.8513111 L53.1700448,41.8513111 L55.9592564,86.4786962 C56.0155248,87.3789906 56.762104,88.0803653 57.664155,88.0803653 L57.664155,88.0803653 L70.4691783,88.0803653 C71.3712293,88.0803653 72.1178085,87.3789906 72.1740769,86.4786962 L72.1740769,86.4786962 L74.9632885,41.8513111 C74.9655057,41.8158357 74.9666151,41.7802996 74.9666151,41.7447549 C74.9666151,40.8013282 74.2018166,40.0365297 73.2583899,40.0365297 L73.2583899,40.0365297 Z"></path>
            </g>
          </g>

          {/* Body Text */}
          <text fontFamily="Inter" fontSize="56" fill="#FFFFFF">
            <tspan x="208" y="806">
              We’re running less service to help{" "}
            </tspan>
            <tspan x="208" y="878">
              slow the spread of COVID-19.
            </tspan>
          </text>
          <text fontFamily="Inter" fontSize="56" fill="#FFFFFF">
            <tspan x="208" y="1006">
              More:{" "}
            </tspan>
            <tspan x="374.886364" y="1006" fontFamily="Inter" fontWeight="bold">
              mbta.com/coronavirus
            </tspan>
          </text>

          {/* Hatched background */}
          <g>
            <mask id="mask" fill="#FFFFFF">
              <rect x="0" y="0" width="1168" height="512"></rect>
            </mask>
            <rect fill="#FFFFFF" x="0" y="0" width="1168" height="512"></rect>
            <g mask="url(#mask)" strokeLinejoin="round">
              <g transform="translate(-1090.000000, -243.000000)">
                {[...Array(n)].map((_, i) => (
                  <g
                    transform={`translate(${start -
                      d * i}, 643.000000) rotate(45.000000) translate(${-(
                      start -
                      d * i
                    )}, -643.000000) translate(${start -
                      d * i -
                      rectWidth}, -245.000000)`}
                    key={i}
                  >
                    {stripePath}
                  </g>
                ))}
              </g>
            </g>

            {/* Mode */}
            <circle
              stroke="#FFFFFF"
              strokeWidth="32"
              fill="#FFFFFF"
              cx="584"
              cy="256"
              r="144"
            ></circle>
            <g fill="#000000">{mode === "bus" ? busIcon : subwayIcon}</g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default TakeoverAlert;
