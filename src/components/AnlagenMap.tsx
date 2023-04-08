//API & Data
import "leaflet/dist/leaflet.css"; //Leaflet Styles, required for the map components
import L from "leaflet"; //Leaflet global object, required for instantiating specific Leaflet objects
import { GeoJsonObject } from "geojson";
import { AnlageDetail } from "../lib/Types";
//Components
import { MapContainer, GeoJSON, TileLayer, Marker, Popup } from "react-leaflet";

interface Props {
  mapCenter: [number, number];
  borderGeoJson: GeoJsonObject;
  anlagen: AnlageDetail[];
  icon: string;
}

export default function AnlagenMap({
  mapCenter,
  borderGeoJson,
  anlagen,
  icon,
}: Props) {
  var markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 30],
  });

  return (
    <MapContainer
      center={mapCenter}
      //TODO Bounds der map auf Gebiet der Gemeinde beschränken?
      zoom={11}
      //TODO sinnvoll?
      minZoom={11}
      scrollWheelZoom={false}
      //TODO Größe & Styling
      style={{ height: "400px", width: "600px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {anlagen.map((anlage) => (
        <Marker
          icon={markerIcon}
          key={anlage.einheit_mastr_nummer}
          position={[anlage.breitengrad, anlage.laengengrad]}
        >
          <Popup>
            <p>{anlage.leistung} kWp Leistung</p>
            <p>Inbetriebnahme {anlage.inbetriebnahme}</p>
          </Popup>
        </Marker>
      ))}
      <GeoJSON data={borderGeoJson}></GeoJSON>
    </MapContainer>
  );
}
