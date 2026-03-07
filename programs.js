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
    req: "high",
    desc: "Transkriptionsassistent und Zusammenfasser für Arzt-Patienten-Gespräche sowie Diktate. Funktioniert vollständig lokal ohne Cloud-Anbindung – für maximalen Datenschutz nach DSGVO.",
    github: "https://github.com/lollylan/asklaion",
    youtubeId: "0bLsjLKP3us"
  },
  {
    id: "visicycle",
    title: "VisiCycle",
    tag: "Hausbesuche · Planung",
    lang: "Python",
    langColor: "#34d399",
    req: "low",
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
    req: "low",
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
    req: "medium",
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
    req: "low",
    desc: "Internes Kommunikationssystem für die Praxis, das wichtige Informationen sofort und zuverlässig an den korrekten Empfänger übermittelt.",
    github: "https://github.com/lollylan/ZentralesNachrichtenSystem",
    youtubeId: "GjMwRZKpHdc"
  },
  {
    id: "praxis-zeittracker",
    title: "Praxis Zeittracker",
    tag: "Organisation",
    lang: "Web App",
    langColor: "#facc15",
    req: "low",
    desc: "Ein Online-Programm (keine Installation notwendig), mit dem man überwachen kann, für was man am Tag Zeit verbraucht, um seine Abläufe ggf. optimieren zu können.",
    github: "https://lollylan.github.io/praxiszeittracker/",
    youtubeId: "7vdkT1RtDgw"
  },
  {
    id: "pieksplan",
    title: "PieksPlan",
    tag: "Impfplanung",
    lang: "Python",
    langColor: "#38bdf8",
    req: "low",
    desc: "Planungstool für Impfungen für Pflegeheimbewohner incl. Tracking von Einverständniserklärungen.",
    github: "https://github.com/lollylan/PieksPlan",
    youtubeId: "lMmB1WmGEC8"
  }
];
