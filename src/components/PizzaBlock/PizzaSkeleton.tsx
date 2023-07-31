import React from "react";
import ContentLoader from "react-content-loader";

const PizzaSkeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={462}
    viewBox="0 0 280 462"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="138" cy="150" r="3" />
    <rect x="0" y="263" rx="10" ry="10" width="280" height="25" />
    <rect x="2" y="296" rx="0" ry="0" width="280" height="87" />
    <rect x="8" y="405" rx="0" ry="0" width="89" height="27" />
    <circle cx="138" cy="131" r="115" />
    <rect x="122" y="395" rx="0" ry="0" width="150" height="45" />
  </ContentLoader>
);

export default PizzaSkeleton;
