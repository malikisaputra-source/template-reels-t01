// Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id
// Lisensi MIT + syarat kredit-maliki (lihat LICENSE): kredit wajib tetap ada, tidak untuk diperjualbelikan.
// T01 v2 · Panggung Kutipan Sinematik — dibangun ulang mengikuti ritme reel acuan detik per detik (9 Nov 2026).
// Struktur: layar 9:16 di atas podium (bingkai tetap) + 6 adegan di dalam layar:
// 1 tokoh zoom + kata raksasa yang "ditembus" kamera · 2 tokoh geser kiri, teks kanan · 3 objek di atas pita lengkung
// 4 foto berbingkai + teks · 5 transisi blur → tokoh keluar dari bingkai · 6 foto potret + judul · 7 koran 3D + teks diketik.
// Gambar: lihat K.gambar di konten.ts (public/t01/).
import React from "react";
import { K } from "./konten";
import { SlotAudio } from "./SlotAudio";
import { AbsoluteFill, Easing, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { loadFont as muatSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as muatInter } from "@remotion/google-fonts/Inter";
import { loadFont as muatArchivo } from "@remotion/google-fonts/ArchivoBlack";

const SERIF = muatSerif().fontFamily;
const INTER = muatInter().fontFamily;
const ARCHIVO = muatArchivo().fontFamily;

export const DURASI_T01 = 400; // 13,3 dtk
const UNGU = K.warnaAksen;
const E = Easing.bezier(0.22, 1, 0.36, 1);
const k = (f: number, a: number, b: number, d: number[], ease = E) =>
  interpolate(f, [a, b], d, { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const g = (n: string) => staticFile(n);

// Kata muncul satu per satu (naik + blur hilang); kata `aksen` miring ungu.
const Baris: React.FC<{ teks: string; f: number; mulai: number; aksen?: string; size: number; style?: React.CSSProperties }> = ({ teks, f, mulai, aksen, size, style }) => (
  <div style={{ fontFamily: SERIF, fontSize: size, lineHeight: 1.05, color: "#161616", ...style }}>
    {teks.split(" ").map((w, i) => {
      const t = k(f, mulai + i * 3, mulai + i * 3 + 10, [0, 1]);
      const a = aksen && w.replace(/[.,]/g, "") === aksen;
      return (
        <span key={i} style={{ display: "inline-block", marginRight: "0.22em", opacity: t, transform: `translateY(${(1 - t) * 18}px)`, filter: `blur(${(1 - t) * 5}px)`, color: a ? UNGU : undefined, fontStyle: a ? "italic" : undefined }}>{w}</span>
      );
    })}
  </div>
);

// Layar dalam (720×1280 koordinat lokal), latar abu terang dengan vinyet.
const W = 720, H = 1280;

const Adegan1: React.FC<{ f: number }> = ({ f }) => {
  // 0–60: tokoh membesar dari bawah; kata kunci raksasa lalu kamera "masuk" ke kata.
  const s = k(f, 0, 40, [0.78, 1]);
  const zoomKata = k(f, 22, 58, [1, 7], Easing.bezier(0.7, 0, 0.9, 0.4));
  return (
    <AbsoluteFill>
      <Img src={g(K.gambar.tokoh)} style={{ position: "absolute", left: 40, bottom: 0, width: 640, transform: `scale(${s})`, transformOrigin: "50% 100%" }} />
      <div style={{ position: "absolute", top: 150, width: "100%", textAlign: "center" }}>
        <Baris teks={K.adegan1.atas} f={f} mulai={2} size={40} style={{ fontFamily: INTER, fontSize: 30, color: "#555" }} />
      </div>
      <div style={{ position: "absolute", top: 210, width: "100%", textAlign: "center", fontFamily: ARCHIVO, fontSize: 110, color: "#1b1b1b", opacity: k(f, 10, 18, [0, 1]), transform: `scale(${zoomKata})`, transformOrigin: "50% 60%", WebkitTextStroke: "2px #1b1b1b" }}>
        <span style={{ border: "4px solid #1b1b1b", padding: "0 16px" }}>{K.adegan1.kata}</span>
      </div>
    </AbsoluteFill>
  );
};

const Adegan2: React.FC<{ f: number }> = ({ f }) => {
  // 0–45: tokoh masuk dari kanan ke kiri, teks kanan; keluar geser ke kiri.
  const x = k(f, 0, 16, [260, 0]) + k(f, 34, 45, [0, -700], Easing.bezier(0.7, 0, 0.84, 0));
  return (
    <AbsoluteFill style={{ transform: `translateX(${x}px)` }}>
      <Img src={g(K.gambar.tokoh)} style={{ position: "absolute", left: -170, bottom: 0, width: 640 }} />
      <div style={{ position: "absolute", left: 400, top: 560, width: 300 }}>
        <Baris teks={K.adegan2.baris1} f={f} mulai={4} size={46} />
        <Baris teks={K.adegan2.baris2} f={f} mulai={12} aksen={K.adegan2.aksen} size={46} />
      </div>
    </AbsoluteFill>
  );
};

const Pita: React.FC<{ f: number; mulai: number }> = ({ f, mulai }) => (
  <svg width={W} height={H} style={{ position: "absolute" }}>
    <path d="M -40 760 Q 360 560 760 760 L 760 860 Q 360 660 -40 860 Z" fill="#d6d6d3" opacity={k(f, mulai, mulai + 14, [0, 1])} />
  </svg>
);

const Adegan3: React.FC<{ f: number }> = ({ f }) => {
  const turun = k(f, 0, 18, [-500, 0], Easing.bezier(0.2, 1.3, 0.4, 1));
  return (
    <AbsoluteFill>
      <Pita f={f} mulai={2} />
      <div style={{ position: "absolute", top: 230, width: "100%", textAlign: "center" }}>
        <Baris teks={K.adegan3.baris1} f={f} mulai={6} size={40} style={{ fontFamily: INTER, fontSize: 30 }} />
        <Baris teks={K.adegan3.baris2} f={f} mulai={20} aksen={K.adegan3.aksen} size={52} />
      </div>
      <Img src={g(K.gambar.objek)} style={{ position: "absolute", left: 160, top: 420, width: 400, transform: `translateY(${turun}px) rotate(${Math.sin(f / 9) * 2 * k(f, 18, 30, [1, 0.3])}deg)`, filter: "drop-shadow(0 30px 30px rgba(0,0,0,0.35))" }} />
    </AbsoluteFill>
  );
};

const Kartu: React.FC<{ src: string; x: number; y: number; w: number; h: number; t: number; rot?: number }> = ({ src, x, y, w, h, t, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, padding: 12, background: "#fff", boxShadow: "0 30px 50px rgba(0,0,0,0.35)", transform: `perspective(900px) rotateY(${(1 - t) * -35 + rot}deg) scale(${0.7 + t * 0.3})`, opacity: t }}>
    <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.1)" }} />
  </div>
);

const Adegan4: React.FC<{ f: number }> = ({ f }) => (
  <AbsoluteFill>
    <Pita f={f} mulai={0} />
    <div style={{ position: "absolute", top: 300, width: "100%", textAlign: "center" }}>
      <Baris teks={K.adegan4.baris1} f={f} mulai={4} size={36} style={{ fontFamily: INTER, fontSize: 28 }} />
      <Baris teks={K.adegan4.baris2} f={f} mulai={10} aksen={K.adegan4.aksen} size={64} />
    </div>
    <Kartu src={g(K.gambar.foto)} x={110} y={470} w={500} h={340} t={k(f, 2, 20, [0, 1])} />
    <div style={{ position: "absolute", top: 860, width: "100%", textAlign: "center", fontFamily: INTER, fontSize: 24, color: "#666", opacity: k(f, 22, 32, [0, 1]) }}>{K.adegan4.keterangan}</div>
  </AbsoluteFill>
);

const Adegan5: React.FC<{ f: number }> = ({ f }) => {
  // tokoh "keluar" dari bingkai kecil: bingkai di kiri atas, badan penuh muncul besar di depannya.
  const b = k(f, 0, 14, [12, 0]);
  return (
    <AbsoluteFill style={{ filter: `blur(${b}px)` }}>
      <Kartu src={g(K.gambar.foto)} x={150} y={220} w={260} h={200} t={k(f, 0, 12, [0, 1])} rot={-6} />
      <Img src={g(K.gambar.badan)} style={{ position: "absolute", left: 250, top: 260, height: 1020, transform: `translateX(${k(f, 6, 30, [-120, 0])}px) scale(${k(f, 6, 30, [0.6, 1])})`, transformOrigin: "30% 20%", filter: "grayscale(1) drop-shadow(0 20px 30px rgba(0,0,0,0.4))" }} />
      <div style={{ position: "absolute", left: 60, top: 560, width: 300 }}>
        <Baris teks={K.adegan5.baris1} f={f} mulai={14} size={36} style={{ fontFamily: INTER, fontSize: 28 }} />
        <Baris teks={K.adegan5.baris2} f={f} mulai={20} aksen={K.adegan5.aksen} size={60} style={{ fontFamily: ARCHIVO, fontSize: 48 }} />
      </div>
    </AbsoluteFill>
  );
};

const Adegan6: React.FC<{ f: number }> = ({ f }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", left: 200, top: 260, width: 320, height: 420, padding: 14, background: "#1a1a1a", boxShadow: "0 30px 60px rgba(0,0,0,0.4)", transform: `scale(${k(f, 0, 18, [1.25, 1])})`, opacity: k(f, 0, 8, [0, 1]) }}>
      <Img src={g(K.gambar.tokoh)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 15%", background: "#e8e8e6" }} />
    </div>
    <div style={{ position: "absolute", top: 760, width: "100%", textAlign: "center" }}>
      <Baris teks={K.adegan6.baris1} f={f} mulai={10} size={40} />
      <Baris teks={K.adegan6.baris2} f={f} mulai={20} size={84} style={{ fontFamily: INTER, fontWeight: 800, color: "#1b1b1b" }} />
    </div>
  </AbsoluteFill>
);

const Adegan7: React.FC<{ f: number }> = ({ f }) => {
  const kalimat = K.adegan7.kalimat;
  const n = Math.floor(k(f, 14, 90, [0, kalimat.length], Easing.linear));
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 70, right: 70, top: 200, fontFamily: INTER, fontSize: 26, color: "#333", minHeight: 80 }}>
        {kalimat.slice(0, n).split(K.adegan7.sorot).map((p, i, arr) => (
          <React.Fragment key={i}>{p}{i < arr.length - 1 && <span style={{ color: UNGU, fontFamily: SERIF, fontStyle: "italic", fontSize: 34 }}>{K.adegan7.sorot}</span>}</React.Fragment>
        ))}
        {n < kalimat.length && <span style={{ opacity: f % 14 < 7 ? 1 : 0 }}>|</span>}
      </div>
      <div style={{ position: "absolute", left: 140, top: 340, width: 440, transform: `perspective(1100px) rotateX(${k(f, 0, 22, [55, 12])}deg) rotateZ(${k(f, 0, 22, [-8, -2])}deg) translateY(${k(f, 0, 22, [300, 0])}px)`, boxShadow: "0 40px 60px rgba(0,0,0,0.35)" }}>
        <Img src={g(K.gambar.koran)} style={{ width: "100%", display: "block" }} />
      </div>
    </AbsoluteFill>
  );
};

const ADEGAN: { dari: number; lama: number; C: React.FC<{ f: number }> }[] = [
  { dari: 0, lama: 60, C: Adegan1 },
  { dari: 60, lama: 45, C: Adegan2 },
  { dari: 105, lama: 60, C: Adegan3 },
  { dari: 165, lama: 50, C: Adegan4 },
  { dari: 215, lama: 40, C: Adegan5 },
  { dari: 255, lama: 45, C: Adegan6 },
  { dari: 300, lama: 100, C: Adegan7 },
];

const LayarDalam: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "relative", width: W, height: H, overflow: "hidden", background: "radial-gradient(90% 70% at 50% 45%, #f7f7f5, #dcdcd8)" }}>
      {ADEGAN.map(({ dari, lama, C }, i) => (
        <Sequence key={i} from={dari} durationInFrames={lama} layout="none">
          <AbsoluteFill style={{ opacity: k(f, dari, dari + 4, [0, 1]) }}>
            <C f={f - dari} />
          </AbsoluteFill>
        </Sequence>
      ))}
    </div>
  );
};

export const T01Sinematik: React.FC = () => {
  const cta = K.cta.kata;
  const f = useCurrentFrame();
  const melayang = Math.sin(f / 30) * 4;
  return (
    <AbsoluteFill style={{ background: "radial-gradient(110% 80% at 50% 15%, #f1f1ef, #b7b7b2)", overflow: "hidden" }}>
      {/* bayangan daun bergoyang dari jendela */}
      <AbsoluteFill style={{ background: "repeating-linear-gradient(118deg, rgba(0,0,0,0.07) 0 34px, transparent 34px 150px)", transform: `translateX(${Math.sin(f / 50) * 20}px)`, filter: "blur(6px)" }} />
      {/* podium */}
      <div style={{ position: "absolute", left: 110, right: 110, bottom: 180, height: 330, background: "linear-gradient(#2c2c2c, #0e0e0e)", borderRadius: 18, transform: "perspective(1000px) rotateX(28deg)", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
        <div style={{ position: "absolute", bottom: 26, left: 40, right: 40, height: 70, backgroundImage: "repeating-linear-gradient(90deg, #3b3b3b 0 30px, #222 30px 34px, #8a6a2a 34px 60px, #222 60px 64px)", opacity: 0.5, borderRadius: 6 }} />
      </div>
      {/* layar 9:16 */}
      <div style={{ position: "absolute", left: 180, top: 170, width: W, height: H, borderRadius: 34, overflow: "hidden", boxShadow: "0 50px 100px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.08)", transform: `translateY(${melayang}px) scale(${interpolate(f, [0, 20], [0.94, 1], { extrapolateRight: "clamp", easing: E })})` }}>
        <LayarDalam />
      </div>
      {/* lencana atas */}
      <div style={{ position: "absolute", top: 90, left: 510, width: 60, height: 60, borderRadius: 14, background: "#1d1b4b", color: "#b9b4ff", fontFamily: ARCHIVO, fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>{K.logo}</div>
      {/* CTA di podium */}
      <div style={{ position: "absolute", left: 100, right: 100, bottom: 300, textAlign: "center", color: "#fff", textShadow: "0 4px 14px rgba(0,0,0,0.7)" }}>
        <div style={{ fontFamily: ARCHIVO, fontSize: 52 }}>{K.cta.baris1} <span style={{ color: "#a78bfa", fontFamily: SERIF, fontStyle: "italic", fontSize: 64 }}>"{cta}"</span> {K.cta.baris2}</div>
        <div style={{ fontFamily: ARCHIVO, fontSize: 96, lineHeight: 1 }}>{K.cta.besar}</div>
      </div>
    <SlotAudio audio={K.audio} />
    </AbsoluteFill>
  );
};
