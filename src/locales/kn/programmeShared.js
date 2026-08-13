/**
 * ⚠ MACHINE-DRAFTED KANNADA — AWAITING NATIVE REVIEW.
 * See src/locales/kn/index.js for the glossary and the review checklist.
 *
 * Mirrors PROGRAMME_SHARED in src/constants/programmes/shared.js. This is
 * institution-level content that every programme page repeats verbatim —
 * recognition, career support, the university story — so a slip here shows on
 * all six Kannada programme pages at once.
 *
 * Recognition descriptions restate KSOU's actual credentials (UGC ODL & OL
 * Regulations 2020, AICTE approval, the NAAC A+ GPA and its validity dates,
 * the 1996 founding). Treat these as claims, not marketing copy: the English
 * side is sourced from the prospectus and official material, and the Kannada
 * must not soften, strengthen or date-shift any of it.
 *
 * `logo`, `alt`, `Icon` and `year` are inherited from English and absent here.
 */
export const KN_PROGRAMME_SHARED = {
  recognition: [
    {
      label: 'ಯುಜಿಸಿ ಮಾನ್ಯತೆ',
      description:
        'KSOU ನ ಆನ್‌ಲೈನ್ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಯುಜಿಸಿ ODL & OL ನಿಯಮಾವಳಿ, 2020ರ ಅಡಿಯಲ್ಲಿ ಮಾನ್ಯತೆ ಪಡೆದವು ಎಂದು ಪ್ರಾಸ್ಪೆಕ್ಟಸ್‌ನಲ್ಲಿ ತಿಳಿಸಲಾಗಿದೆ.',
    },
    {
      label: 'AICTE ಅನುಮೋದಿತ',
      description: 'AICTE — ಅಖಿಲ ಭಾರತ ತಾಂತ್ರಿಕ ಶಿಕ್ಷಣ ಪರಿಷತ್ತಿನಿಂದ ಅನುಮೋದಿತ.',
    },
    {
      label: 'NAAC A+',
      description:
        'ಏಳು-ಅಂಕಗಳ ಮಾಪನದಲ್ಲಿ 3.31 GPA ಯೊಂದಿಗೆ KSOU ಗೆ NAAC A+ ಮಾನ್ಯತೆ ದೊರೆತಿದ್ದು, ಇದು ಮೇ 19, 2023 ರಿಂದ ಐದು ವರ್ಷಗಳ ಅವಧಿಗೆ ಮಾನ್ಯವಾಗಿದೆ.',
    },
    {
      label: 'ಸರ್ಕಾರಿ ವಿಶ್ವವಿದ್ಯಾಲಯ',
      description:
        'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಮುಕ್ತ ವಿಶ್ವವಿದ್ಯಾಲಯವು 1996ರಲ್ಲಿ ಸ್ಥಾಪನೆಯಾದ ಸಾರ್ವಜನಿಕ ವಿಶ್ವವಿದ್ಯಾಲಯವಾಗಿದ್ದು, ಹಿಂದಿನ ಪತ್ರೋಪದೇಶ ಕೋರ್ಸ್‌ಗಳು ಮತ್ತು ನಿರಂತರ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯಲ್ಲಿ ಇದರ ಬೇರುಗಳಿವೆ.',
    },
  ],

  careerSupport: [
    {
      title: 'ರೆಸ್ಯೂಮ್',
      description: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಅನ್ನು ವೃತ್ತಿಪರವಾಗಿ ಮಂಡಿಸಲು ನೆರವಾಗುವ ಸ್ಮಾರ್ಟ್ ರೆಸ್ಯೂಮ್ ರಚನೆ ಬೆಂಬಲ.',
    },
    {
      title: 'ಕೌಶಲ್ಯಗಳು',
      description: 'ನಿಮ್ಮ ಸಿದ್ಧತೆಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುವ ಸಾಮರ್ಥ್ಯ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಕೌಶಲ್ಯ-ಕೊರತೆಯ ಒಳನೋಟಗಳು.',
    },
    {
      title: 'ಸಂದರ್ಶನ',
      description: 'ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಸಿದ್ಧರಾಗಲು ನೆರವಾಗುವ ಅಣಕು ಸಂದರ್ಶನಗಳು ಮತ್ತು ಫೋಟೊಮೆಟ್ರಿಕ್ ಪ್ರೊಫೈಲಿಂಗ್.',
    },
    {
      title: 'ಅವಕಾಶಗಳು',
      description: 'ನೈಜ-ಸಮಯದ ಉದ್ಯೋಗ ಲಭ್ಯತೆ ಮತ್ತು AI ಆಧಾರಿತ ವೃತ್ತಿ ಶಿಫಾರಸುಗಳು.',
    },
    {
      title: 'ಉದ್ಯೋಗ ಹೊಂದಾಣಿಕೆ',
      description: 'ಹೊಂದಾಣಿಕೆ ಶೇಕಡಾವಾರು ಸಹಿತ AI ನೆರವಿನ ಉದ್ಯೋಗ ಹೊಂದಾಣಿಕೆ.',
    },
  ],

  degreeTags: ['ಪರಿಶೀಲಿತ', 'ಮಾನ್ಯತೆ ಪಡೆದ', 'ಅಧಿಕೃತ'],

  // Quoted verbatim from the prospectus in English; rendered here as a faithful
  // translation rather than a reworded tagline, for the same reason the English
  // side uses the documented wording.
  universityVision:
    'ಬಹುಶಿಸ್ತೀಯ, ಪ್ರಸ್ತುತ, ಸುಲಭ ಲಭ್ಯ ಮತ್ತು ಕೈಗೆಟುಕುವ ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ರಮಗಳ ಮೂಲಕ ಕಲಿಯುವವರ ಪರಿವರ್ತನೆಗೆ ಒತ್ತು ನೀಡಿ ಗುಣಮಟ್ಟದ ಉನ್ನತ ಶಿಕ್ಷಣವನ್ನು ಒದಗಿಸುವ ಮೂಲಕ ಭಾರತದ ಅಗ್ರ ಐದು ಮುಕ್ತ ವಿಶ್ವವಿದ್ಯಾಲಯಗಳಲ್ಲಿ ಒಂದಾಗುವುದು.',

  universityMilestones: [
    {
      title: 'ವಿಶ್ವವಿದ್ಯಾಲಯ ಸ್ಥಾಪನೆ',
      description:
        'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಮುಕ್ತ ವಿಶ್ವವಿದ್ಯಾಲಯವು ಸಾರ್ವಜನಿಕ ವಿಶ್ವವಿದ್ಯಾಲಯವಾಗಿ ಸ್ಥಾಪನೆಯಾಯಿತು; ಹಿಂದಿನ ಪತ್ರೋಪದೇಶ ಕೋರ್ಸ್‌ಗಳು ಮತ್ತು ನಿರಂತರ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯಲ್ಲಿ ಇದರ ಬೇರುಗಳಿವೆ.',
    },
    {
      title: 'ಯುಜಿಸಿ ಮಾನ್ಯತೆಯ ಆನ್‌ಲೈನ್ ಕಲಿಕೆ',
      description:
        'KSOU ನ ಆನ್‌ಲೈನ್ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಯುಜಿಸಿ ODL & OL ನಿಯಮಾವಳಿ, 2020ರ ಅಡಿಯಲ್ಲಿ ಮಾನ್ಯತೆ ಪಡೆದವು ಎಂದು ಮಂಡಿಸಲಾಗಿದೆ.',
    },
    {
      title: 'NAAC A+ ಮಾನ್ಯತೆ',
      description:
        'ಏಳು-ಅಂಕಗಳ ಮಾಪನದಲ್ಲಿ 3.31 GPA ಯೊಂದಿಗೆ KSOU ಗೆ NAAC ನಿಂದ A+ ಶ್ರೇಣಿಯ ಮಾನ್ಯತೆ ದೊರೆತಿದ್ದು, ಇದು ಮೇ 19, 2023 ರಿಂದ ಐದು ವರ್ಷಗಳ ಅವಧಿಗೆ ಮಾನ್ಯವಾಗಿದೆ.',
    },
  ],

  examFeeLabels: {
    '1 paper': '1 ಪತ್ರಿಕೆ',
    '2 papers': '2 ಪತ್ರಿಕೆಗಳು',
    '3 papers': '3 ಪತ್ರಿಕೆಗಳು',
    '4 or more papers / full fee': '4 ಅಥವಾ ಹೆಚ್ಚು ಪತ್ರಿಕೆಗಳು / ಪೂರ್ಣ ಶುಲ್ಕ',
  },
};
