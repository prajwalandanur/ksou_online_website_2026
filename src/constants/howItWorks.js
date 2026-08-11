import { Award, BookOpen, ClipboardCheck, MonitorPlay, PenLine } from 'lucide-react';

export const HOW_IT_WORKS_STEPS = [
  {
    id: 'apply',
    number: '01',
    title: 'Apply & Get Admitted',
    tagline: 'Start your journey online',
    description: 'Application, document submission, and admission confirmation.',
    detail:
      'Complete your online application, submit the required documents, and receive confirmation of your admission — all without visiting campus.',
    Icon: ClipboardCheck,
  },
  {
    id: 'lms',
    number: '02',
    title: 'Access Your LMS',
    tagline: 'Your classroom, anywhere',
    description: 'Log in to your KSOU Online LMS and start learning.',
    detail:
      'Sign in to your personal learning dashboard to find lectures, study material, assignments, and everything else your programme needs.',
    Icon: MonitorPlay,
  },
  {
    id: 'learn',
    number: '03',
    title: 'Learn & Engage',
    tagline: 'Learn at your pace',
    description: 'Access lectures, study materials, and assignments online.',
    detail:
      'Move through your coursework on your own schedule, with recorded lectures, reading material, and assignments available whenever you are.',
    Icon: BookOpen,
  },
  {
    id: 'exams',
    number: '04',
    title: 'Complete Examinations',
    tagline: "Show what you've learned",
    description: 'Appear for exams through the prescribed KSOU process.',
    detail:
      'Sit for your examinations as scheduled by the university, following the standard KSOU academic calendar and evaluation process.',
    Icon: PenLine,
  },
  {
    id: 'degree',
    number: '05',
    title: 'Earn Your Degree',
    tagline: 'Officially earned',
    description: 'Receive your officially recognized KSOU degree or certificate.',
    detail:
      "Once you've fulfilled your programme requirements, receive your officially recognized KSOU degree or certificate.",
    Icon: Award,
  },
];
