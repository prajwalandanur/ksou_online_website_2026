/**
 * ⚠ MACHINE-DRAFTED KANNADA — AWAITING NATIVE REVIEW.
 *
 * Mirrors UG_COURSES / PG_COURSES in src/constants/courses.js positionally.
 * `fee` is deliberately absent: ₹ amounts are numerals in both languages, so
 * they inherit from English and can never drift between the two files. Image
 * imports, icons, `detailPath` and `questionPapers` likewise inherit.
 *
 * Degree names carry the Kannada name with the English abbreviation in
 * brackets — the abbreviation is what appears on the certificate and what
 * students search for, so it must survive translation.
 */
export const KN_UG_COURSES = [
  {
    name: 'ಕಲಾ ಪದವಿ (BA)',
    description:
      'KSOU ಆನ್‌ಲೈನ್ BA — ಇತಿಹಾಸ, ಅರ್ಥಶಾಸ್ತ್ರ ಮತ್ತು ರಾಜ್ಯಶಾಸ್ತ್ರ ಒಳಗೊಂಡ ಯುಜಿಸಿ ಮಾನ್ಯತೆ ಪಡೆದ ಕಲಾ ಪದವಿ.',
    duration: '3 ವರ್ಷಗಳು',
    eligibility: '10+2 / ಪಿಯುಸಿ ಅಥವಾ ತತ್ಸಮಾನ',
  },
  {
    name: 'ವಾಣಿಜ್ಯ ಪದವಿ (B.Com)',
    description:
      'KSOU ಆನ್‌ಲೈನ್ B.Com — ಲೆಕ್ಕಶಾಸ್ತ್ರ, ಹಣಕಾಸು ಮತ್ತು ವ್ಯವಹಾರ ಕಾನೂನು ಒಳಗೊಂಡ ಯುಜಿಸಿ ಮಾನ್ಯತೆ ಪಡೆದ ವಾಣಿಜ್ಯ ಪದವಿ.',
    duration: '3 ವರ್ಷಗಳು',
    eligibility: '10+2 / ಪಿಯುಸಿ ಅಥವಾ ತತ್ಸಮಾನ',
  },
];

export const KN_PG_COURSES = [
  {
    name: 'ಸ್ನಾತಕೋತ್ತರ ವಾಣಿಜ್ಯ ಪದವಿ (M.Com)',
    description:
      'KSOU ಆನ್‌ಲೈನ್ M.Com — ವಾಣಿಜ್ಯ, ಹಣಕಾಸು ಮತ್ತು ವ್ಯವಹಾರ ನೀತಿಯಲ್ಲಿ ಯುಜಿಸಿ ಮಾನ್ಯತೆ ಪಡೆದ ಸ್ನಾತಕೋತ್ತರ ಪದವಿ.',
    duration: '4 ಸೆಮಿಸ್ಟರ್‌ಗಳು',
    eligibility: 'B.Com / BBM / BBA ಪದವೀಧರರು',
  },
  {
    name: 'ಸ್ನಾತಕೋತ್ತರ ಕಲಾ ಪದವಿ (MA)',
    description:
      'KSOU ಆನ್‌ಲೈನ್ MA — ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ, ಸಂಸ್ಕೃತ ಅಥವಾ ಅರ್ಥಶಾಸ್ತ್ರದಲ್ಲಿ ಯುಜಿಸಿ ಮಾನ್ಯತೆ ಪಡೆದ ಸ್ನಾತಕೋತ್ತರ ಕಲಾ ಪದವಿ.',
    specializations: ['ಕನ್ನಡ', 'ಇಂಗ್ಲಿಷ್', 'ಹಿಂದಿ', 'ಸಂಸ್ಕೃತ', 'ಅರ್ಥಶಾಸ್ತ್ರ'],
    duration: '4 ಸೆಮಿಸ್ಟರ್‌ಗಳು',
    eligibility: 'ಪದವಿ (ವಿಷಯವಾರು ಅರ್ಹತೆ ವಿಶೇಷತೆಗೆ ಅನುಗುಣವಾಗಿ ಬದಲಾಗುತ್ತದೆ)',
  },
  {
    name: 'ವ್ಯವಹಾರ ಆಡಳಿತ ಸ್ನಾತಕೋತ್ತರ ಪದವಿ (MBA)',
    description:
      'KSOU ಆನ್‌ಲೈನ್ MBA — ನಾಯಕತ್ವ ಮತ್ತು ನಿರ್ವಹಣಾ ಹುದ್ದೆಗಳಿಗಾಗಿ ಯುಜಿಸಿ ಮಾನ್ಯತೆ ಪಡೆದ, AICTE ಅನುಮೋದಿತ ಆನ್‌ಲೈನ್ MBA.',
    duration: '4 ಸೆಮಿಸ್ಟರ್‌ಗಳು',
    eligibility: 'ಯಾವುದೇ ವಿಭಾಗದ ಪದವಿ',
  },
  {
    name: 'ಗಣಿತ ಸ್ನಾತಕೋತ್ತರ ಪದವಿ (M.Sc)',
    description:
      'KSOU ಆನ್‌ಲೈನ್ M.Sc ಗಣಿತ — ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಮತ್ತು ಸಂಶೋಧನಾ ವೃತ್ತಿಗಳಿಗಾಗಿ ಯುಜಿಸಿ ಮಾನ್ಯತೆ ಪಡೆದ ಸ್ನಾತಕೋತ್ತರ ಪದವಿ.',
    duration: '4 ಸೆಮಿಸ್ಟರ್‌ಗಳು',
    eligibility: 'ಮಾನ್ಯತೆ ಪಡೆದ ವಿಶ್ವವಿದ್ಯಾಲಯದಿಂದ ಪದವಿ',
  },
];
