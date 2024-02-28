import { LatLngExpression } from "leaflet";
import React from "react";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { findCategoryName } from "../../helpers/issue-categories";
import marker from "../../assets/marker.svg";
import shadowUrl from "../../assets/marker-shadow.png";

interface ColoredMarkerProps {
  position: LatLngExpression;
  type: keyof typeof colors;
  id: number;
}
const colors = {
  ["streetLighting"]: 45,
  ["unpavedRoad"]: 90,
  ["graffiti"]: 135,
  ["pothole"]: 180,
  ["fallenTree"]: 245,
  ["abandonedCar"]: 335,
};

export const ColoredMarker: React.FC<ColoredMarkerProps> = ({
  position,
  type,
  id,
}) => {
  const selectedColor = colors[type] ?? 0;

  const customIcon = L.icon({
    iconUrl: marker,
    shadowUrl,
    iconRetinaUrl: marker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
    className: `hue-rotate-${selectedColor}deg`,
  });

  L.Marker.prototype.options.icon = customIcon;

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        {findCategoryName(type)} #{id}
      </Popup>
    </Marker>
  );
};
