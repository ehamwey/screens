import React from "react";

import { PagedSection, Section } from "Components/solari/section";

const SectionList = ({
  sections,
  showSectionHeaders,
  currentTimeString,
}): JSX.Element => {
  return (
    <div className="section-list">
      {sections.map((section) => {
        if (section.paging && section.paging.is_enabled === true) {
          return (
            <PagedSection
              {...section}
              numRows={section.paging.visible_rows}
              showSectionHeaders={showSectionHeaders}
              currentTimeString={currentTimeString}
              key={section.name}
            />
          );
        } else {
          return (
            <Section
              {...section}
              numRows={section.departures.length}
              showSectionHeaders={showSectionHeaders}
              currentTimeString={currentTimeString}
              key={section.name}
            />
          );
        }
      })}
    </div>
  );
};

export default SectionList;
