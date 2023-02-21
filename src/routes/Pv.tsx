// API & Data
import { supabase } from "../lib/SupabaseClient";
import { Gemeinde, AnlagenBestand } from "../lib/Types";
import { useLoaderData } from "react-router-dom";

// Components
import Stat from "../components/Stat";
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

export default function Pv() {
  const { gemeinde, bestandData } = useLoaderData() as {
    gemeinde: Gemeinde;
    bestandData: AnlagenBestand[];
  };

  const currentBestand = bestandData.at(bestandData.length - 1);
  const lastYear = bestandData.slice(-12);

  return (
    <div className="pvContainer">
      {/* Header */}
      <h1>Photovoltaik in {gemeinde.name}</h1>

      {/* Top General Stats */}
      {currentBestand !== undefined ? (
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
      ) : (
        <></>
      )}

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
          name="Leistungszubau"
          dataKey="zubau_leistung"
          yAxisId="left"
          fill="#413ea0"
        />
        <Line
          name="Anlagenzubau"
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
    </div>
  );
}

export async function pvLoader() {
  const gemeindeRequest = supabase
    .from("gemeinde")
    .select("*")
    .eq("schluessel", import.meta.env.VITE_MASTR_CITY_KEY)
    .single();
  const bestandRequest = supabase
    .from("anlagen_bestand")
    .select("*")
    .eq("gemeinde_schluessel", import.meta.env.VITE_MASTR_CITY_KEY)
    .order("monat", { ascending: true });

  // TODO korrektes Handling inkl. Error
  let [
    { data: gemeinde, error: errorGemeinde },
    { data: bestandData, error: errorAusbau },
  ] = await Promise.all([gemeindeRequest, bestandRequest]);

  return { gemeinde, bestandData };
}
