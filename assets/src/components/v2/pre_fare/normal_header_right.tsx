import React from "react";

import DefaultNormalHeader from "Components/v2/normal_header";

const NormalHeaderRight = ({ icon, text, time }) => {
  return (
    <DefaultNormalHeader
      icon={icon}
      text={text}
      time={time}
      showUpdated={false}
      maxHeight={208}
    />
  );
};

export default NormalHeaderRight;