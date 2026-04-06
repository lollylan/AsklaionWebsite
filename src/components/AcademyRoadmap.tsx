import { useState, useEffect } from 'react';

const base = import.meta.env.BASE_URL;

interface Course {
  title: string;
  slug: string;
  description: string;
  level: string;
  duration?: string;
  prerequisites: string[];
  lessonCount: number;
}

interface Props {
  courses: Course[];
}

const TIER_LABELS: Record<number, string> = {
  0: 'Ebene 1 – Grundlagen',
  1: 'Ebene 2 – Aufbau',
  2: 'Ebene 3 – Vertiefung',
  3: 'Ebene 4 – Spezialisierung',
};

function computeTiers(courses: Course[]): Map<string, number> {
  const tierMap = new Map<string, number>();
  const slugSet = new Set(courses.map(c => c.slug));

  for (const c of courses) {
    if (c.prerequisites.length === 0) {
      tierMap.set(c.slug, 0);
    }
  }

  let changed = true;
  while (changed) {
    changed = false;
    for (const c of courses) {
      if (tierMap.has(c.slug)) continue;
      const prereqTiers = c.prerequisites
        .filter(p => slugSet.has(p))
        .map(p => tierMap.get(p));
      if (prereqTiers.every(t => t !== undefined)) {
        tierMap.set(c.slug, Math.max(...(prereqTiers as number[])) + 1);
        changed = true;
      }
    }
  }

  return tierMap;
}

/** Read lesson completion from localStorage */
function readProgress(courses: Course[]): Map<string, number> {
  const progress = new Map<string, number>();
  for (const c of courses) {
    let done = 0;
    for (let i = 1; i <= c.lessonCount; i++) {
      if (localStorage.getItem(`academy_${c.slug}_lesson_${i}`) === 'completed') {
        done++;
      }
    }
    progress.set(c.slug, done);
  }
  return progress;
}

export default function AcademyRoadmap({ courses }: Props) {
  const [progress, setProgress] = useState<Map<string, number>>(new Map());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    setProgress(readProgress(courses));
  }, []);

  const resetAllProgress = () => {
    for (const c of courses) {
      for (let i = 1; i <= c.lessonCount; i++) {
        localStorage.removeItem(`academy_${c.slug}_lesson_${i}`);
      }
      localStorage.removeItem(`academy_course_${c.slug}`);
    }
    setProgress(readProgress(courses));
    setShowResetConfirm(false);
  };

  const getProgress = (slug: string) => progress.get(slug) ?? 0;
  const isCompleted = (course: Course) => getProgress(course.slug) >= course.lessonCount && course.lessonCount > 0;
  const getPercent = (course: Course) => course.lessonCount > 0 ? getProgress(course.slug) / course.lessonCount : 0;

  const hasAnyProgress = Array.from(progress.values()).some(v => v > 0);

  const tierMap = computeTiers(courses);
  const maxTier = Math.max(...Array.from(tierMap.values()), 0);

  const tiers: Course[][] = [];
  for (let t = 0; t <= maxTier; t++) {
    tiers.push(courses.filter(c => tierMap.get(c.slug) === t));
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Reset progress button */}
      {hasAnyProgress && (
        <div className="flex justify-end mb-6">
          {showResetConfirm ? (
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10">
              <span className="text-sm text-red-400">Gesamten Fortschritt zurücksetzen?</span>
              <button
                onClick={resetAllProgress}
                className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Ja, zurücksetzen
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1 text-xs font-medium rounded border border-dark-border text-text-muted hover:text-text-primary transition-colors"
              >
                Abbrechen
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-dark-border text-text-muted hover:text-red-400 hover:border-red-500/30 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Fortschritt zurücksetzen
            </button>
          )}
        </div>
      )}

      {tiers.map((tierCourses, tierIndex) => (
        <div key={tierIndex}>
          <div className="text-center mb-4">
            <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
              {TIER_LABELS[tierIndex] ?? `Ebene ${tierIndex + 1}`}
            </span>
          </div>

          <div className="flex justify-center gap-6 mb-4 flex-wrap">
            {tierCourses.map(course => (
              <CourseNode
                key={course.slug}
                course={course}
                completed={isCompleted(course)}
                progressPercent={getPercent(course)}
                completedLessons={getProgress(course.slug)}
              />
            ))}
          </div>

          {tierIndex < maxTier && (
            <div className="flex justify-center my-6">
              <div className="w-px h-8 bg-dark-border" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


function CourseNode({
  course,
  completed,
  progressPercent,
  completedLessons,
}: {
  course: Course;
  completed: boolean;
  progressPercent: number;
  completedLessons: number;
}) {
  const fillPercent = Math.round(progressPercent * 100);

  const cardClasses = [
    'relative w-56 p-5 rounded-xl border-2 transition-all overflow-hidden cursor-pointer',
    completed
      ? 'border-green-500 shadow-lg shadow-green-500/20'
      : 'bg-dark-card border-dark-border hover:border-academy-accent/50 hover:shadow-lg hover:shadow-academy-glow/10',
  ].join(' ');

  return (
    <a href={`${base}academy/${course.slug}`} className={cardClasses}>
      {/* Green fill background based on progress */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background: completed
            ? 'rgba(34, 197, 94, 0.15)'
            : `linear-gradient(to top, rgba(34, 197, 94, 0.12) ${fillPercent}%, transparent ${fillPercent}%)`,
        }}
      />

      {/* Content (above fill) */}
      <div className="relative z-10">
        {/* Green checkmark for completed */}
        {completed && (
          <div className="absolute -top-2 -right-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500 text-white text-sm font-bold shadow-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
        )}

        {/* Level badge */}
        <span className={`inline-block px-2 py-0.5 text-[10px] font-medium rounded mb-2 ${
          course.level === 'Anfänger'
            ? 'bg-badge-gering/20 text-badge-gering'
            : 'bg-badge-mittel/20 text-badge-mittel'
        }`}>
          {course.level}
        </span>

        {/* Title */}
        <h3 className={`font-bold text-sm mb-1 ${completed ? 'text-green-400' : 'text-text-primary'}`}>
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-text-muted leading-relaxed mb-2">
          {course.description}
        </p>

        {/* Duration + progress */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-text-muted">{course.lessonCount} {course.lessonCount === 1 ? 'Lektion' : 'Lektionen'}</span>
          {completedLessons > 0 && !completed && (
            <span className="text-[10px] text-green-400 font-medium">
              {completedLessons}/{course.lessonCount}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
