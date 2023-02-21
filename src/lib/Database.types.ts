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
      anlagen_bestand: {
        Row: {
          anzahl_anlagen: number;
          bruttoleistung: number;
          gemeinde_schluessel: number;
          monat: string;
          zubau_anzahl: number;
          zubau_leistung: number;
        };
        Insert: {
          anzahl_anlagen?: number;
          bruttoleistung?: number;
          gemeinde_schluessel?: number;
          monat: string;
          zubau_anzahl?: number;
          zubau_leistung?: number;
        };
        Update: {
          anzahl_anlagen?: number;
          bruttoleistung?: number;
          gemeinde_schluessel?: number;
          monat?: string;
          zubau_anzahl?: number;
          zubau_leistung?: number;
        };
      };
      gemeinde: {
        Row: {
          anzahl_anlagen: number;
          bruttoleistung: number;
          einwohner: number;
          einwohner_stand: string | null;
          name: string;
          schluessel: number;
          stand: string | null;
        };
        Insert: {
          anzahl_anlagen?: number;
          bruttoleistung?: number;
          einwohner?: number;
          einwohner_stand?: string | null;
          name: string;
          schluessel?: number;
          stand?: string | null;
        };
        Update: {
          anzahl_anlagen?: number;
          bruttoleistung?: number;
          einwohner?: number;
          einwohner_stand?: string | null;
          name?: string;
          schluessel?: number;
          stand?: string | null;
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
