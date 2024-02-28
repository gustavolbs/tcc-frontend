import L from "leaflet";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import "leaflet.heat/dist/leaflet-heat.js";
import { Issue } from "../../interfaces/issue";

export const HeatMap = ({
  issues,
  visible,
}: {
  issues: Issue[];
  visible: boolean;
}) => {
  const map = useMap();
  const heatLayerRef = useRef<any | null>(null);

  useEffect(() => {
    const positions = issues?.map((issue) => [
      issue.latitude,
      issue.longitude,
      10,
    ]);

    if (map && positions?.length) {
      if (heatLayerRef.current) {
        heatLayerRef.current.remove();
      }

      heatLayerRef.current = (L as any).heatLayer(positions).addTo(map);
    }

    return () => {
      if (heatLayerRef.current) {
        heatLayerRef.current.remove();
      }
    };
  }, [map, issues, visible]);

  return !visible ? null : <></>;
};
