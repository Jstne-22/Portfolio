import type { EducationEntry } from '../types';

/**
 * Education timeline, newest first. Add coursework and activities as you go;
 * empty lists are simply not shown.
 */
export const educationEntries: EducationEntry[] = [
  {
    school: 'Christ the King College',
    location: 'Calbayog City',
    degree: 'Bachelor of Science in Computer Science',
    degreeShort: 'BS Computer Science',
    yearLevel: '3rd Year',
    period: '2024 – Present',
    coursework: [],
    activities: [],
  },
];
