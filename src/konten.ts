// Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id
// Lisensi MIT + syarat kredit-maliki (lihat LICENSE): kredit wajib tetap ada, tidak untuk diperjualbelikan.
// ✏️ UBAH DI SINI: semua teks, warna, gambar (taruh di public/), dan audio opsional.
// Lama tiap adegan diatur di komponen (frame, 30 fps).
export const K = {
  warnaAksen: "#8b5cf6",
  logo: "MM",
  cta: { baris1: "Komentar", kata: "BOS", baris2: "gratis", besar: "File Proyek" },
  gambar: { tokoh: "t01/orang-potret.svg", badan: "t01/orang-badan.svg", objek: "t01/timbangan.png", foto: "t01/foto-rapat.svg", koran: "t01/koran.svg" },
  adegan1: { atas: "Dia tidak pernah", kata: "marah" },
  adegan2: { baris1: "Tapi satu kantor", baris2: "langsung diam.", aksen: "diam" },
  adegan3: { baris1: "Kesetiaan adalah", baris2: "satu-satunya mata uangnya", aksen: "mata" },
  adegan4: { baris1: "Keluarga bukan", baris2: "kelemahannya", aksen: "kelemahannya", keterangan: "Keluarga · Kantor · Kepercayaan" },
  adegan5: { baris1: "Itu adalah", baris2: "kerajaannya.", aksen: "kerajaannya" },
  adegan6: { baris1: "Mereka memanggilnya", baris2: "Sang Bos" },
  adegan7: { kalimat: "Sejarah tidak mengingat suaranya. Sejarah mengingat Pak Darma.", sorot: "Pak Darma" },
  // 🔊 Audio opsional. Taruh berkas di public/ lalu isi namanya, contoh: musik: "musik.mp3".
  // Paket ini sengaja TANPA musik/SFX/suara bawaan: pakai musik berlisensi bebas atau rekaman suaramu sendiri.
  audio: {
    musik: null as string | null, // backsound, diulang otomatis + fade masuk/keluar
    volumeMusik: 0.16,
    suara: null as string | null, // voice over / narasi milikmu (mp3/wav)
    volumeSuara: 1,
  },
};
