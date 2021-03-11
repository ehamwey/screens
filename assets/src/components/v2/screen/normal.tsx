import React from "react";

import Widget, { WidgetData } from "Components/v2/widget";

interface Props {
  header: WidgetData;
  main_content: WidgetData;
  flex_zone: WidgetData;
  footer: WidgetData;
}

const Normal: React.ComponentType<Props> = ({
  header,
  main_content: mainContent,
  flex_zone: flexZone,
  footer,
}) => {
  return (
    <div className="screen-normal">
      <div className="screen-normal__header">
        <Widget data={header} />
      </div>
      <div className="screen-normal__main-content">
        <Widget data={mainContent} />
      </div>
      <div className="screen-normal__flex-zone">
        <Widget data={flexZone} />
      </div>
      <div className="screen-normal__footer">
        <Widget data={footer} />
      </div>
    </div>
  );
};

export default Normal;