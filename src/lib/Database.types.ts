export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      anlage_detail: {
        Row: {
          breitengrad: number;
          einheit_mastr_nummer: string;
          energietraeger: string | null;
          gemeindeschluessel: string;
          inbetriebnahme: string;
          laengengrad: number;
          leistung: number;
        };
        Insert: {
          breitengrad: number;
          einheit_mastr_nummer: string;
          energietraeger?: string | null;
          gemeindeschluessel: string;
          inbetriebnahme: string;
          laengengrad: number;
          leistung: number;
        };
        Update: {
          breitengrad?: number;
          einheit_mastr_nummer?: string;
          energietraeger?: string | null;
          gemeindeschluessel?: string;
          inbetriebnahme?: string;
          laengengrad?: number;
          leistung?: number;
        };
      };
      gemeinde: {
        Row: {
          borderpolygon: Json;
          centerlat: number;
          centerlng: number;
          einwohner: number;
          name: string;
          schluessel: string;
        };
        Insert: {
          borderpolygon: Json;
          centerlat: number;
          centerlng: number;
          einwohner: number;
          name: string;
          schluessel: string;
        };
        Update: {
          borderpolygon?: Json;
          centerlat?: number;
          centerlng?: number;
          einwohner?: number;
          name?: string;
          schluessel?: string;
        };
      };
      pv_bestand_monat: {
        Row: {
          anzahl_anlagen: number;
          bruttoleistung: number;
          gemeindeschluessel: string;
          monat: number;
          zubau_anzahl: number;
          zubau_leistung: number;
        };
        Insert: {
          anzahl_anlagen: number;
          bruttoleistung: number;
          gemeindeschluessel: string;
          monat: number;
          zubau_anzahl: number;
          zubau_leistung: number;
        };
        Update: {
          anzahl_anlagen?: number;
          bruttoleistung?: number;
          gemeindeschluessel?: string;
          monat?: number;
          zubau_anzahl?: number;
          zubau_leistung?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
