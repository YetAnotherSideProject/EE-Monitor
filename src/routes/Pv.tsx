//API & Data
import { useLoaderData } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { GeoJsonObject } from "geojson";
import { supabase } from "../lib/SupabaseClient";
import { Gemeinde, AnlageDetail, PvBestandMonat } from "../lib/Types";
//Components
import Stat from "../components/Stat";
import AnlagenMap from "../components/AnlagenMap";
import {
  Area,
  Bar,
  Brush,
  CartesianGrid,
  ComposedChart,
  Label,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
//Assets
import pvIconUrl from "../assets/pvCell.png";

//Children von App, wird im Outlet gerendert, bekommt Gemeinde Objekt über Router Outlet Context
export default function Pv() {
  const gemeinde = useOutletContext() as Gemeinde;
  const { bestandData, grosseAnlagen } = useLoaderData() as {
    bestandData: PvBestandMonat[];
    grosseAnlagen: AnlageDetail[];
  };

  // Letzter Monat
  const currentBestand = bestandData.at(-1);
  // Letzte 12 Monate
  const lastYear = bestandData.slice(-12);

  // Todo Error & alle Fälle abfangen
  if (currentBestand === undefined) {
    return <h1>Aktuell keine Daten :/</h1>;
  }

  //YearMonth in DB persistiert als Integer YYYYMM, für Verwendung als Date konvertieren --> Jahr und Monat extrahieren
  let date = new Date(currentBestand.monat / 100, currentBestand.monat % 100);
  //Da Date Konstruktor Month indizes 0-11 nimmt und ohne Tag Angabe den 1. nimmt einen Tag davor, also End of Month des korrekten Monats nehmen
  //JS Parameter weirdness setDate(0), neue Temporal JS API macht es hoffentlich besser
  date.setDate(0);

  return (
    <div className="pvContainer">
      {/* Header */}
      <h1>
        Photovoltaik in {gemeinde.name} zum {date.toLocaleDateString()}
      </h1>

      {/* Top General Stats */}
      <div className="stats">
        <Stat
          value={currentBestand.bruttoleistung.toFixed(0)}
          label="kWp installierte Leistung"
        ></Stat>
        <Stat value={currentBestand.anzahl_anlagen} label="Anlagen"></Stat>
        <Stat
          value={(
            currentBestand.bruttoleistung / gemeinde.einwohner
          ).toPrecision(3)}
          label="kWp Leistung/Einwohner"
        ></Stat>
      </div>

      {/* Ausbau letzte 12 Monate*/}
      <h2>Zubau in den letzten Monaten</h2>
      <ComposedChart data={lastYear} width={800} height={300}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="monat" />
        <YAxis yAxisId="left" orientation="left">
          <Label value="kWp" angle={-90} position="insideLeft" />
        </YAxis>
        <YAxis yAxisId="right" orientation="right">
          <Label value="Anlagen" angle={+90} position="insideRight" />
        </YAxis>
        <Bar
          name="Leistung"
          dataKey="zubau_leistung"
          yAxisId="left"
          fill="#413ea0"
        />
        <Line
          name="Anlagen"
          dataKey="zubau_anzahl"
          yAxisId="right"
          type="monotone"
          stroke="#ff7300"
        />
        <Legend verticalAlign="top" />
        <Tooltip />
      </ComposedChart>

      {/* Historische Entwicklung */}
      <h2>Historische Bestandsentwicklung</h2>
      <ComposedChart
        data={bestandData}
        width={800}
        height={300}
        margin={{ left: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monat" />
        <YAxis yAxisId="left" orientation="left">
          <Label value="kWp" angle={-90} position="insideLeft" offset={-5} />
        </YAxis>
        <YAxis yAxisId="right" orientation="right">
          <Label value="Anlagen" angle={+90} position="insideRight" />
        </YAxis>
        <Area
          name="Installierte Leistung"
          dataKey="bruttoleistung"
          yAxisId="left"
          type="monotone"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Line
          name="Anlagen"
          dataKey="anzahl_anlagen"
          yAxisId="right"
          type="natural"
          dot={false}
          stroke="#ff7300"
        />
        <Brush dataKey="monat" height={30} />
        <Tooltip />
        <Legend verticalAlign="top" />
      </ComposedChart>

      <h2>Große Anlagen</h2>
      <AnlagenMap
        mapCenter={[gemeinde.centerlat, gemeinde.centerlng]}
        borderGeoJson={gemeinde.borderpolygon as unknown as GeoJsonObject}
        anlagen={grosseAnlagen}
        icon={pvIconUrl}
      />
    </div>
  );
}

//TODO auslagern in /lib als Teil des API Clients?
export async function pvLoader() {
  const bestandRequest = supabase
    .from("pv_bestand_monat")
    .select("*")
    .eq("gemeindeschluessel", import.meta.env.VITE_MASTR_CITY_KEY)
    .order("monat", { ascending: true });
  const grosseAnlagenRequest = supabase
    .from("anlage_detail")
    .select("*")
    .eq("gemeindeschluessel", import.meta.env.VITE_MASTR_CITY_KEY)
    .eq("energietraeger", "SOLARE_STRAHLUNGSENERGIE")
    .order("leistung", { ascending: true });

  // TODO korrektes Handling inkl. Error
  let [
    { data: bestandData, error: errorAusbau },
    { data: grosseAnlagen, error: errorGrosseAnlagen },
  ] = await Promise.all([bestandRequest, grosseAnlagenRequest]);

  return { bestandData, grosseAnlagen };
}
