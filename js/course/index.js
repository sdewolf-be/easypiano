// Cursus complet : 14 chapitres qui suivent le livre « Alfred's Basic Adult All‑in‑One Course, niveau 1 ».
import c01 from './c01-introduction.js';
import c02 from './c02-position-do.js';
import c03 from './c03-grande-portee.js';
import c04 from './c04-intervalles.js';
import c05 from './c05-accords.js';
import c06 from './c06-position-sol.js';
import c07 from './c07-do-milieu.js';
import c08 from './c08-elargir.js';
import c09 from './c09-do-majeur.js';
import c10 from './c10-sol-majeur.js';
import c11 from './c11-fa-majeur.js';
import c12 from './c12-la-mineur.js';
import c13 from './c13-re-mineur.js';
import c14 from './c14-revision.js';

export const COURSE = [c01, c02, c03, c04, c05, c06, c07, c08, c09, c10, c11, c12, c13, c14];

// Liste à plat des leçons, avec leur chapitre et leur numéro global.
export const LESSON_LIST = [];
COURSE.forEach((ch, ci) => {
  ch.index = ci;
  ch.lessons.forEach((l, li) => {
    l.chapter = ch;
    l.indexInChapter = li;
    l.number = LESSON_LIST.length + 1;
    LESSON_LIST.push(l);
  });
});

export function findLesson(id) { return LESSON_LIST.find(l => l.id === id) || null; }

// Progression d'une leçon : { done: n, total: m }
export function lessonProgress(lesson, progress) {
  const p = (progress && progress[lesson.id]) || {};
  const total = lesson.exercises.length;
  let done = 0;
  for (let i = 0; i < total; i++) if (p[i] && p[i].done) done++;
  return { done, total, complete: total > 0 && done === total };
}

export function chapterProgress(chapter, progress) {
  let done = 0;
  for (const l of chapter.lessons) if (lessonProgress(l, progress).complete) done++;
  return { done, total: chapter.lessons.length, complete: done === chapter.lessons.length };
}

// Premier exercice non terminé du cursus (pour « Continuer »), ou null si tout est fait.
export function nextExercise(progress) {
  for (const l of LESSON_LIST) {
    const p = (progress && progress[l.id]) || {};
    for (let i = 0; i < l.exercises.length; i++) if (!(p[i] && p[i].done)) return { lesson: l, index: i, exercise: l.exercises[i] };
  }
  return null;
}

// Exercice suivant dans l'ordre du cursus (null à la toute fin).
export function followingExercise(lesson, index) {
  if (index + 1 < lesson.exercises.length) return { lesson, index: index + 1, exercise: lesson.exercises[index + 1] };
  const next = LESSON_LIST[lesson.number]; // number est 1‑based → leçon suivante
  if (next && next.exercises.length) return { lesson: next, index: 0, exercise: next.exercises[0] };
  return null;
}
