import { Database } from "./Database.types";

/*
Lokale Types basierend auf den Database Types.
Keine Ahnung, ob das so sinnvoll ist, aber so bleiben die supabase/backend Verbindungen zusammen und nirgendswo in der Business Logik
*/
export type Gemeinde = Database["public"]["Tables"]["gemeinde"]["Row"];
export type AnlagenBestand =
  Database["public"]["Tables"]["anlagen_bestand"]["Row"];
