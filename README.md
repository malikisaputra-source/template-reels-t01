# T01 Panggung Kutipan Sinematik · Template Video Reels (Remotion)

Template video vertikal 9:16 (1080×1920, 30 fps, ±13 detik): layar 9:16 melayang di atas podium gelap, 7 adegan kutipan di dalamnya (kata raksasa ditembus kamera, tokoh geser, objek di pita lengkung, foto berbingkai, potret + julukan, koran 3D + kalimat diketik), dan ajakan komentar di podium.

Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id. Gratis dipakai dan diubah, kredit wajib tetap ada, tidak untuk diperjualbelikan.

## Cara pakai
1. Install [Node.js](https://nodejs.org) 18 ke atas.
2. Buka terminal di folder ini: `npm install`
3. Ubah teks, warna, gambar, dan audio di `src/konten.ts`. Gambar taruh di folder `public/` (contoh: `public/t01/`).
4. Pratinjau: `npm run studio`
5. Render: `npm run render` → hasil di `out/video.mp4`
6. Cek kode (opsional): `npm run cek`

## Isi `src/konten.ts`
- `warnaAksen`, `logo` (lencana atas)
- `cta`: `baris1`, `kata` (kata kunci komentar), `baris2`, `besar`
- `gambar`: `tokoh`, `badan`, `objek`, `foto`, `koran` (path di public/)
- `adegan1`–`adegan7`: teks tiap adegan; `aksen` = kata yang dibuat miring berwarna aksen
- `adegan7.kalimat` diketik, `adegan7.sorot` = bagian kalimat yang disorot
- `audio`: `musik` (backsound, diulang + fade) dan `suara` (voice over), keduanya `null` = tanpa suara. Taruh berkas mp3/wav di `public/` lalu isi namanya, misalnya `musik: "musik.mp3"`.

## Gambar pengganti (placeholder)
- `orang-potret.svg`, `orang-badan.svg`: siluet abu pengganti foto tokoh (ganti dengan PNG tokohmu, latar transparan lebih bagus).
- `foto-rapat.svg`: foto suasana (ganti dengan foto milikmu).
- `koran.svg`: halaman koran tiruan.
- `timbangan.png`: objek ilustrasi bawaan (boleh dipakai).

## Audio
Versi ini sengaja dikirim **tanpa** musik, SFX, dan suara asli kreator. Isi slot `audio` di `src/konten.ts` dengan musik berlisensi bebas (misalnya dari YouTube Audio Library atau Pixabay Music) dan rekaman suaramu sendiri. Kalau mau efek bunyi per adegan, tambahkan `<Sequence from={frame}><Audio src={staticFile("bunyi.mp3")} /></Sequence>` di komponen.

## Struktur folder
```
proyek/
├── public/
│   ├── t01/foto-rapat.svg
│   ├── t01/koran.svg
│   ├── t01/orang-badan.svg
│   ├── t01/orang-potret.svg
│   ├── t01/timbangan.png
├── src/
│   ├── index.ts          # titik masuk Remotion
│   ├── Root.tsx          # daftar komposisi: T01Sinematik (1080×1920, 30 fps)
│   ├── T01Sinematik.tsx  # animasi & tata letak
│   ├── SlotAudio.tsx     # slot musik + suara opsional
│   └── konten.ts         # ✏️ semua isi yang bisa diganti
├── package.json
├── remotion.config.ts
├── tsconfig.json
└── LICENSE
```

## Lisensi
Lisensi Nonkomersial Maliki Studio (kredit wajib, dilarang dijual) (lihat `LICENSE`): kredit "Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id" wajib tetap ada, dan template ini tidak boleh dijual ulang tanpa izin.
