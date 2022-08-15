import { supabase } from "../lib/SupabaseClient";
import { useState, useEffect } from 'react'
import Gemeinde from "../model/Gemeinde";
import AusbauMonat from "../model/AusbauMonat";

function PagePv() {
    const [gemeinde, setGemeinde] = useState({} as Gemeinde)
    const [ausbauData, setAusbauData] = useState([] as AusbauMonat[])
   
    useEffect(() => {
        fetchGemeindeData()
        fetchAusbauData()
    }, [])

    const fetchGemeindeData = async () => {
        let { data, error } = await supabase
            .from<Gemeinde>('gemeinde')
            .select('*')
            .eq("schluessel", import.meta.env.VITE_MASTR_CITY_KEY)

        if(data) {
            setGemeinde(data[0])
        }
    }

    const fetchAusbauData = async () => {
        let { data, error } = await supabase
            .from<AusbauMonat>('ausbaumonat')
            .select('*')
            .eq('gemeinde_schluessel', import.meta.env.VITE_MASTR_CITY_KEY)
            .order("monat", { ascending: true})

        if(data) {
            setAusbauData(data)
        }
    }

    return (
        <div>
            <h1>Photovoltaik</h1>
            <div>
                <h2>General Data</h2>
                <p>Gemeinde: {gemeinde.name}</p>
                <p>Bruttoleistung: {gemeinde.bruttoleistung}</p>
                <p>Anzahl Anlagen: {gemeinde.anzahl_anlagen}</p>
                <p>kWp/Einwohner: {gemeinde.bruttoleistung/gemeinde.einwohner}</p>
            </div>
            <div>
                <h2>Ausbau Historie</h2>
                <table>
                    <tr>
                        <th>Monat</th>
                        <th>Anzahl Anlagen</th>
                        <th>Bruttoleistung</th>
                    </tr>
                    {ausbauData.map((data) => (
                        <tr>
                            <td>{data.monat}</td>
                            <td>{data.anzahl_anlagen}</td>
                            <td>{data.bruttoleistung}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default PagePv;