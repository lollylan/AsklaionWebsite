import { useState } from 'react';

const base = import.meta.env.BASE_URL;

interface Program {
  name: string;
  slug: string;
  category: 'install' | 'webapp';
  tags: string[];
  anforderung: 'GERING' | 'MITTEL' | 'HOCH' | 'WEBAPP';
  description: string;
  academy_course_slug: string | null;
  screenshot: string;
}

interface Props {
  programs: Program[];
}

const BADGE_COLORS: Record<string, string> = {
  GERING: 'bg-badge-gering/20 text-badge-gering',
  MITTEL: 'bg-badge-mittel/20 text-badge-mittel',
  HOCH: 'bg-badge-hoch/20 text-badge-hoch',
  WEBAPP: 'bg-badge-webapp/20 text-badge-webapp',
};

const ALL_TAGS = ['Alle', 'KI', 'Planung', 'Kommunikation', 'Spiel', 'Fitness', 'Organisation', 'Transkription', 'Fax', 'Hausbesuche', 'Personalplanung', 'Impfplanung', 'Bingo', 'Tower Defense', 'Mikrobewegung'];

export default function ForgeGrid({ programs }: Props) {
  const [activeTag, setActiveTag] = useState('Alle');

  // Get only tags that exist in programs
  const usedTags = new Set(programs.flatMap(p => p.tags));
  const availableTags = ALL_TAGS.filter(t => t === 'Alle' || usedTags.has(t));

  const filtered = activeTag === 'Alle'
    ? programs
    : programs.filter(p => p.tags.includes(activeTag));

  const installPrograms = filtered.filter(p => p.category === 'install');
  const webappPrograms = filtered.filter(p => p.category === 'webapp');

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        {availableTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              activeTag === tag
                ? 'bg-forge-accent text-forge-bg'
                : 'bg-dark-card text-text-secondary hover:text-text-primary hover:bg-dark-border'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Install Programs */}
      {installPrograms.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text-primary mb-6">
            Programme zum Installieren
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {installPrograms.map(program => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </section>
      )}

      {/* Web Apps */}
      {webappPrograms.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-text-primary mb-6">
            Web-Apps — direkt im Browser
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webappPrograms.map(program => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-12">
          Keine Programme mit dem Tag &ldquo;{activeTag}&rdquo; gefunden.
        </p>
      )}
    </div>
  );
}

function ProgramCard({ program }: { program: Program }) {
  return (
    <a
      href={`${base}forge/${program.slug}`}
      className="group block bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-forge-accent/50 transition-all hover:shadow-lg hover:shadow-forge-glow/10"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-forge-bg/50 flex items-center justify-center border-b border-dark-border overflow-hidden">
        {program.screenshot ? (
          <img src={`${base}${program.screenshot.replace(/^\//, '')}`} alt={program.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm font-medium text-text-muted opacity-40 uppercase tracking-wider">
            {program.category === 'webapp' ? 'Web-App' : 'Desktop'}
          </span>
        )}
      </div>

      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {program.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 text-[10px] font-medium rounded bg-dark-border/50 text-text-muted">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-bold text-text-primary group-hover:text-forge-accent transition-colors mb-2">
          {program.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-3">
          {program.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${BADGE_COLORS[program.anforderung]}`}>
            {program.anforderung}
          </span>
          <span className="text-xs text-text-muted group-hover:text-forge-accent transition-colors">
            Mehr erfahren &rarr;
          </span>
        </div>

        {/* Academy CTA */}
        {program.academy_course_slug && (
          <div className="mt-3 pt-3 border-t border-dark-border">
            <span className="text-xs text-academy-accent">
              In der Akademie anpassen lernen &rarr;
            </span>
          </div>
        )}
      </div>
    </a>
  );
}
