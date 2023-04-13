//API & Data
import { useLoaderData } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { GeoJsonObject } from "geojson";
import { supabase } from "../lib/SupabaseClient";
import { Gemeinde, AnlageDetail } from "../lib/Types";
//Components
import Stat from "../components/Stat";
import AnlagenMap from "../components/AnlagenMap";
//Assets
import biomassIconUrl from "../assets/biomass.png";

export default function Biomass() {
  const gemeinde = useOutletContext() as Gemeinde;
  const anlagen = useLoaderData() as AnlageDetail[];

  const leistung = anlagen.reduce((sum, anlage) => sum + anlage.leistung, 0);

  return (
    <div className="biomassContainer">
      {/* Header */}
      <h1>Biomasse in {gemeinde.name}</h1>

      {/* Top General Stats */}
      <div className="stats">
        <Stat
          value={leistung.toFixed(0)}
          label="kWp installierte Leistung"
        ></Stat>
        <Stat value={anlagen.length} label="Anlagen"></Stat>
      </div>

      <h2>Anlagenstandorte</h2>
      <AnlagenMap //TODO Mehrere Biomasse Generatoren an einem Ort müssen gruppiert dargestellt werden, aktuell werden welche verdeckt
        mapCenter={[gemeinde.centerlat, gemeinde.centerlng]}
        borderGeoJson={gemeinde.borderpolygon as unknown as GeoJsonObject}
        anlagen={anlagen}
        icon={biomassIconUrl}
      />
    </div>
  );
}

//TODO auslagern in /lib als Teil des API Clients?
export async function biomassLoader() {
  //TODO korrektes Error Handling
  let { data: anlagen, error: errorAnlagen } = await supabase
    .from("anlage_detail")
    .select("*")
    .eq("gemeindeschluessel", import.meta.env.VITE_MASTR_CITY_KEY)
    .eq("energietraeger", "BIOMASSE");

  return anlagen;
}
