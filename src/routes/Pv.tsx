// React
import { ReactNode } from "react";
import { useLoaderData } from "react-router-dom";
// Chakra UI Styling
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Td,
  Th,
  Tr,
  TableContainer,
  Thead,
  useColorModeValue,
  Tbody,
  VStack,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
// Recharts
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// API
import { supabase } from "../lib/SupabaseClient";
// Model
import Gemeinde from "../model/Gemeinde";
import AusbauMonat from "../model/AusbauMonat";

export default function Pv() {
  const { gemeinde, ausbauData } = useLoaderData() as {
    gemeinde: Gemeinde;
    ausbauData: AusbauMonat[];
  };

  return (
    <Box pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Heading>Photovoltaik in {gemeinde.name}</Heading>
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 5, lg: 8 }}
        pt={5}
      >
        <StatsCard
          title={"Installierte Leistung"}
          stat={gemeinde.bruttoleistung + " kWp"}
          icon={<CalendarIcon boxSize={50} />}
        />
        <StatsCard
          title={"Anlagen"}
          stat={gemeinde.anzahl_anlagen?.toString()}
          icon={<CalendarIcon boxSize={50} />}
        />
        <StatsCard
          title={"Leistung/Einwohner"}
          stat={
            (gemeinde.bruttoleistung / gemeinde.einwohner).toPrecision(3) +
            " kWp"
          }
          icon={<CalendarIcon boxSize={50} />}
        />
      </SimpleGrid>
      <VStack pt={5} placeItems="center">
        <Heading as="h2" size="lg">
          Ausbau Historie
        </Heading>
        <ResponsiveContainer width={"100%"} height={400}>
          <ComposedChart
            width={500}
            height={250}
            data={ausbauData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="monat" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bruttoleistung" barSize={50} fill="#413ea0" />
            <Line type="monotone" dataKey="anzahl_anlagen" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>

        <TableContainer pt={5}>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Monat</Th>
                <Th>Anzahl Anlagen</Th>
                <Th>Leistung</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ausbauData.map((data) => (
                <Tr>
                  <Td>{data.monat}</Td>
                  <Td textAlign="center">{data.anzahl_anlagen}</Td>
                  <Td isNumeric>{data.bruttoleistung}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Box>
  );
}

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"}>{title}</StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export async function pvLoader() {
  const gemeindeRequest = supabase
    .from<Gemeinde>("gemeinde")
    .select("*")
    .eq("schluessel", import.meta.env.VITE_MASTR_CITY_KEY)
    .single();
  const ausbauRequest = supabase
    .from<AusbauMonat>("ausbaumonat")
    .select("*")
    .eq("gemeinde_schluessel", import.meta.env.VITE_MASTR_CITY_KEY)
    .order("monat", { ascending: true });

  let [
    { data: gemeinde, error: errorGemeinde },
    { data: ausbauData, error: errorAusbau },
  ] = await Promise.all([gemeindeRequest, ausbauRequest]);

  return { gemeinde, ausbauData };
}
