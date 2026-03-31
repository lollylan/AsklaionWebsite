/* ──────────────────────────────────────────────────────────────────
   PROGRAMME KONFIGURATION  –  Asklaion
   Fügen Sie YouTube-Video-IDs ein, sobald Videos verfügbar sind.
   youtubeId: der Teil nach ?v= in der YouTube-URL, z.B. "dQw4w9WgXcQ"
   Lassen Sie youtubeId leer (""), wenn noch kein Video existiert.
   type: "install" = Programm zum Installieren, "webapp" = Web-App
────────────────────────────────────────────────────────────────── */
const PROGRAMS = [
  /* ── Installierbare Programme ─────────────────────────────────── */
  {
    id: "asklaion-medical-scribe",
    title: "Asklaion Medical Scribe",
    tag: "KI · Transkription",
    lang: "Python",
    langColor: "#38bdf8",
    type: "install",
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
    type: "install",
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
    type: "install",
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
    type: "install",
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
    type: "install",
    req: "low",
    desc: "Internes Kommunikationssystem für die Praxis, das wichtige Informationen sofort und zuverlässig an den korrekten Empfänger übermittelt.",
    github: "https://github.com/lollylan/ZentralesNachrichtenSystem",
    youtubeId: "GjMwRZKpHdc"
  },
  {
    id: "pieksplan",
    title: "PieksPlan",
    tag: "Impfplanung",
    lang: "Python",
    langColor: "#38bdf8",
    type: "install",
    req: "low",
    desc: "Planungstool für Impfungen für Pflegeheimbewohner incl. Tracking von Einverständniserklärungen.",
    github: "https://github.com/lollylan/PieksPlan",
    youtubeId: "lMmB1WmGEC8"
  },

  /* ── Web-Apps (direkt im Browser) ─────────────────────────────── */
  {
    id: "praxis-zeittracker",
    title: "Praxis Zeittracker",
    tag: "Organisation",
    lang: "Web App",
    langColor: "#facc15",
    type: "webapp",
    req: "webapp",
    desc: "Ein Online-Programm (keine Installation notwendig), mit dem man überwachen kann, für was man am Tag Zeit verbraucht, um seine Abläufe ggf. optimieren zu können.",
    github: "https://lollylan.github.io/praxiszeittracker/",
    youtubeId: "7vdkT1RtDgw"
  },
  {
    id: "praxis-defender",
    title: "PraxisDefender",
    tag: "Spiel · Tower Defense",
    lang: "Web App",
    langColor: "#ef4444",
    type: "webapp",
    req: "webapp",
    desc: "Tower-Defense-Spiel im Praxis-Setting: Verteidige deine Gemeinschaftspraxis mit Ärzten und MFAs gegen Viren-Wellen und sammle EBM-Punkte. Empfohlen für Tablet oder PC – auf dem Handy kann es zu Skalierungsproblemen kommen.",
    github: "",
    youtubeId: "",
    url: "https://lollylan.github.io/PraxisDefender/",
    thumbnail: "assets/Gemini_Generated_Image_kjaplukjaplukjap.png"
  },
  {
    id: "docmotion",
    title: "DocMotion",
    tag: "Fitness · Mikrobewegung",
    lang: "Web App",
    langColor: "#34d399",
    type: "webapp",
    req: "webapp",
    desc: "Dein täglicher Fitness-Push für Mikrobewegungen zwischen den Patienten. Kraft-, Dehn- und Cardioübungen mit Punkte-System und Streak-Tracking.",
    github: "",
    youtubeId: "",
    url: "https://lollylan.github.io/DocMotion/",
    thumbnail: "assets/docmotion-thumb.png"
  },
  {
    id: "praxisbingo",
    title: "Praxisbingo",
    tag: "Spiel · Bingo",
    lang: "Web App",
    langColor: "#facc15",
    type: "webapp",
    req: "webapp",
    desc: "Spielerische Bingo-Version für den Praxisalltag mit MFA- und Arzt-Modus. Wer kennt sie nicht, die typischen Situationen im Praxisalltag?",
    github: "",
    youtubeId: "",
    url: "https://lollylan.github.io/Praxisbingo/",
    thumbnail: "assets/praxisbingo-thumb.png"
  }
];
