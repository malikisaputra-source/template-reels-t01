// Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id
// Lisensi Nonkomersial Maliki Studio (kredit wajib, dilarang dijual) (lihat LICENSE): kredit wajib tetap ada, tidak untuk diperjualbelikan.
import React from "react";
import { Composition } from "remotion";
import { T01Sinematik, DURASI_T01 } from "./T01Sinematik";

export const Root: React.FC = () => (
  <Composition id="T01Sinematik" component={T01Sinematik} durationInFrames={DURASI_T01} fps={30} width={1080} height={1920} />
);
