/* ──────────────────────────────────────────────────────────────────
   PROGRAMME KONFIGURATION  –  Asklaion
   Fügen Sie YouTube-Video-IDs ein, sobald Videos verfügbar sind.
   youtubeId: der Teil nach ?v= in der YouTube-URL, z.B. "dQw4w9WgXcQ"
   Lassen Sie youtubeId leer (""), wenn noch kein Video existiert.
────────────────────────────────────────────────────────────────── */
const PROGRAMS = [
  {
    id: "asklaion-medical-scribe",
    title: "Asklaion Medical Scribe",
    tag: "KI · Transkription",
    lang: "Python",
    langColor: "#38bdf8",
    desc: "Transkriptionsassistent und Zusammenfasser für Arzt-Patienten-Gespräche sowie Diktate. Funktioniert vollständig lokal ohne Cloud-Anbindung – für maximalen Datenschutz nach DSGVO.",
    github: "https://github.com/lollylan/asklaion",
    youtubeId: ""
  },
  {
    id: "visicycle",
    title: "VisiCycle",
    tag: "Hausbesuche · Planung",
    lang: "Python",
    langColor: "#34d399",
    desc: "Intelligenter Hausbesuchsintervallplaner mit optimierter Mehrbehandler-Wegfindung. Funktioniert vollständig offline – lediglich bei der Patientenanlage erfolgt ein einmaliger anonymisierter Geodatenabruf.",
    github: "https://github.com/lollylan/VisiCycle",
    youtubeId: "Tkyc-IRuxGo"
  },
  {
    id: "happi-flow",
    title: "H Flow",
    tag: "Personalplanung",
    lang: "Python",
    langColor: "#fb923c",
    desc: "Mitarbeiter-Planer zur vereinfachten Schichtverteilung für MFAs, VERAHs, PCMs und Ärzte. Inkl. intelligentem Urlaubsplaner und AU-Manager – speziell für die Bedürfnisse von HÄPPI-Praxen entwickelt.",
    github: "https://github.com/lollylan/HAPPI-Flow",
    youtubeId: "h5QnQXdXWQY"
  },
  {
    id: "faxfinity",
    title: "FaxFinity",
    tag: "KI · Fax",
    lang: "Python",
    langColor: "#f472b6",
    desc: "Intelligente, automatisierte Umbenennung eingehender PDF-Faxe in aussagekräftige Dateinamen. Nutzt ausschließlich lokale Vision-Modelle – keine Cloud, keine Datenweitergabe.",
    github: "https://github.com/lollylan/FaxFinity",
    youtubeId: "wzT2LQfQG3s"
  },
  {
    id: "zns",
    title: "ZNS – Zentrales Nachrichtensystem",
    tag: "Kommunikation",
    lang: "In Entwicklung",
    langColor: "#a78bfa",
    desc: "Internes Kommunikationssystem für die Praxis, das wichtige Informationen sofort und zuverlässig an den korrekten Empfänger übermittelt.",
    github: "https://github.com/lollylan/ZentralesNachrichtenSystem",
    youtubeId: "GjMwRZKpHdc"
  }
];
