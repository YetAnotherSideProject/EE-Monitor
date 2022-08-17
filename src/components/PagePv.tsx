import { useState, useEffect } from 'react';
import { Block, Box, Container, Heading, Level, Table } from "react-bulma-components";

import { supabase } from "../lib/SupabaseClient";
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
        <Container>
            <Heading>Photovoltaik in {gemeinde.name}</Heading>
            <Block>
                <Level>
                    <Level.Side align="left">
                        <Level.Item>
                            <Box>
                                <Heading spaced>{gemeinde.bruttoleistung} kWp</Heading>
                                <Heading subtitle>Installierte Leistung</Heading>
                            </Box>
                        </Level.Item>
                        <Level.Item>
                            <Box>
                                <Heading spaced>{gemeinde.anzahl_anlagen}</Heading>
                                <Heading subtitle>Anlagen</Heading>
                            </Box>
                        </Level.Item>
                        <Level.Item>
                            <Box>
                                <Heading spaced>{gemeinde.bruttoleistung/gemeinde.einwohner} kWp</Heading>
                                <Heading subtitle>Leistung/Einwohner</Heading>
                            </Box>
                        </Level.Item>
                    </Level.Side>
                </Level>
            </Block>
            <Block>
                <Heading subtitle>Ausbau Historie</Heading>
                <Table bordered>
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
                </Table>
            </Block>
        </Container>
    )
}

export default PagePv;