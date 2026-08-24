/**
 * Reference data for KSOU's own enquiry API (Talisma).
 *
 * ── Where these numbers come from ───────────────────────────────────────
 * `POST /ksouapi/api/enquiries` requires `programId` and `countryId` as
 * integers >= 1. It publishes **no** list endpoint for either — the OpenAPI
 * document at `/ksouapi/swagger/v1/swagger.json` exposes only the enquiry
 * POST, a candidate-image upload and three student lookups.
 *
 * So the IDs below were read, on 2026-08-24, out of the option values of
 * KSOU's own live enquiry form at
 *   https://onlineprogramme.ksoumysuru.ac.in/KSOU/Public/EnquiryForm
 * which is the front-end that already posts to this same API. They are
 * transcribed verbatim, including the university's own spellings and the
 * truncated "...CONG" at 47.
 *
 * **They are therefore observed, not documented.** If KSOU renumbers its
 * master data, this file goes stale silently — a lead would land in Talisma
 * against the wrong programme, which is worse than a lead that fails loudly.
 * Re-read that form before trusting these after any KSOU portal change.
 *
 * ⚠ Do not "tidy" the names. `program` and `country` are sent alongside the
 * IDs and should match what their own system stores.
 */

/**
 * The ten programmes KSOU's enquiry form offers, by their official ID.
 *
 * Note this is **ten**, where this website shows six course cards: KSOU
 * splits Master of Arts into its five disciplines (3-7) and the site
 * consolidates them into one MA card. `resolveKsouProgramme` below is where
 * that difference is reconciled.
 *
 * Note also that the brief's example payload guessed `programId: 2` for MA.
 * 2 is Bachelor Of Commerce. That guess is exactly why this was checked.
 */
export const KSOU_PROGRAMMES = [
  { id: 1, name: 'Bachelor Of Arts (History, Economics, Political Science)' },
  { id: 2, name: 'Bachelor Of Commerce' },
  { id: 3, name: 'Master Of Arts - Kannada' },
  { id: 4, name: 'Master Of Arts - English' },
  { id: 5, name: 'Master Of Arts - Hindi' },
  { id: 6, name: 'Master Of Arts - Sanskrit' },
  { id: 7, name: 'Master Of Arts – Economics' },
  { id: 8, name: 'Master Of Commerce' },
  { id: 9, name: 'Master Of Business Administration' },
  { id: 10, name: 'Master Of Science - Mathematics' },
];

const PROGRAMME_BY_ID = new Map(KSOU_PROGRAMMES.map((p) => [p.id, p]));

/**
 * This site's course ids (`constants/courses.js`) to KSOU programme ids.
 *
 * `ma` is deliberately absent: it has no single counterpart, because the
 * enquiry API wants a discipline. See `MA_PROGRAMME_IDS`.
 */
export const COURSE_TO_KSOU_PROGRAMME_ID = {
  ba: 1,
  bcom: 2,
  mcom: 8,
  mba: 9,
  'msc-mathematics': 10,
};

/**
 * The MA card's `specializations` (verbatim strings from `courses.js`) to the
 * five KSOU MA programme ids.
 *
 * Keyed by the specialization string rather than by index so reordering that
 * array cannot silently re-point every discipline at the wrong ID.
 */
export const MA_PROGRAMME_IDS = {
  Kannada: 3,
  English: 4,
  Hindi: 5,
  Sanskrit: 6,
  Economics: 7,
};

/** Course id whose enquiry option expands into one entry per discipline. */
export const SPLIT_COURSE_ID = 'ma';

/**
 * Resolves an enquiry-form programme selection to what the API needs.
 *
 * The form's option values are either a plain course id (`'mba'`) or, for the
 * five MA disciplines, `'ma:English'`. Returns `null` for anything unmapped
 * rather than falling back to a plausible ID — a wrong `programId` files a
 * real student against the wrong course, and the submission failing is the
 * safer outcome.
 *
 * @param {string} optionValue Value from the programme combobox.
 * @returns {{ id: number, name: string } | null}
 */
export function resolveKsouProgramme(optionValue) {
  if (!optionValue) return null;

  const [courseId, specialization] = String(optionValue).split(':');

  const id =
    courseId === SPLIT_COURSE_ID
      ? MA_PROGRAMME_IDS[specialization]
      : COURSE_TO_KSOU_PROGRAMME_ID[courseId];

  return PROGRAMME_BY_ID.get(id) ?? null;
}

/**
 * The 193 countries KSOU's form offers, by their official ID — a plain
 * alphabetical 1-193, which is why India happens to be 77.
 *
 * Shorter than this site's own ISO list (245 regions from ICU): KSOU omits
 * dependencies and territories, and a handful of states. `resolveKsouCountry`
 * returns null for those, and `EnquiryForm` therefore only offers countries
 * that map — better than showing someone their country and then failing on
 * submit, and it is the same set KSOU's own form offers.
 */
export const KSOU_COUNTRIES = [
  { id: 1, name: 'AFGHANISTAN' },
  { id: 2, name: 'ALBANIA' },
  { id: 3, name: 'ALGERIA' },
  { id: 4, name: 'ANDORRA' },
  { id: 5, name: 'ANGOLA' },
  { id: 6, name: 'ANTIGUA AND BARBUDA' },
  { id: 7, name: 'ARGENTINA' },
  { id: 8, name: 'ARMENIA' },
  { id: 9, name: 'AUSTRALIA' },
  { id: 10, name: 'AUSTRIA' },
  { id: 11, name: 'AZERBAIJAN' },
  { id: 12, name: 'BAHAMAS' },
  { id: 13, name: 'BAHRAIN' },
  { id: 14, name: 'BANGLADESH' },
  { id: 15, name: 'BARBADOS' },
  { id: 16, name: 'BELARUS' },
  { id: 17, name: 'BELGIUM' },
  { id: 18, name: 'BELIZE' },
  { id: 19, name: 'BENIN' },
  { id: 20, name: 'BHUTAN' },
  { id: 21, name: 'BOLIVIA' },
  { id: 22, name: 'BOSNIA AND HERZEGOVINA' },
  { id: 23, name: 'BOTSWANA' },
  { id: 24, name: 'BRAZIL' },
  { id: 25, name: 'BRUNEI DARUSSALAM' },
  { id: 26, name: 'BULGARIA' },
  { id: 27, name: 'BURKINA FASO' },
  { id: 28, name: 'BURUNDI' },
  { id: 29, name: 'CABO VERDE' },
  { id: 30, name: 'CAMBODIA' },
  { id: 31, name: 'CAMEROON' },
  { id: 32, name: 'CANADA' },
  { id: 33, name: 'CENTRAL AFRICAN REPUBLIC' },
  { id: 34, name: 'CHAD' },
  { id: 35, name: 'CHILE' },
  { id: 36, name: 'CHINA' },
  { id: 37, name: 'COLOMBIA' },
  { id: 38, name: 'COMOROS' },
  { id: 39, name: 'CONGO' },
  { id: 40, name: 'COSTA RICA' },
  { id: 41, name: "CÔTE D'IVOIRE" },
  { id: 42, name: 'CROATIA' },
  { id: 43, name: 'CUBA' },
  { id: 44, name: 'CYPRUS' },
  { id: 45, name: 'CZECH REPUBLIC' },
  { id: 46, name: "DEMOCRATIC PEOPLE'S REPUBLIC OF KOREA (NORTH KOREA)" },
  // Truncated in KSOU's own option text. Left exactly as published.
  { id: 47, name: 'DEMOCRATIC REPUBLIC OF THE CONG' },
  { id: 48, name: 'DENMARK' },
  { id: 49, name: 'DJIBOUTI' },
  { id: 50, name: 'DOMINICA' },
  { id: 51, name: 'DOMINICAN REPUBLIC' },
  { id: 52, name: 'ECUADOR' },
  { id: 53, name: 'EGYPT' },
  { id: 54, name: 'EL SALVADOR' },
  { id: 55, name: 'EQUATORIAL GUINEA' },
  { id: 56, name: 'ERITREA' },
  { id: 57, name: 'ESTONIA' },
  { id: 58, name: 'ETHIOPIA' },
  { id: 59, name: 'FIJI' },
  { id: 60, name: 'FINLAND' },
  { id: 61, name: 'FRANCE' },
  { id: 62, name: 'GABON' },
  { id: 63, name: 'GAMBIA' },
  { id: 64, name: 'GEORGIA' },
  { id: 65, name: 'GERMANY' },
  { id: 66, name: 'GHANA' },
  { id: 67, name: 'GREECE' },
  { id: 68, name: 'GRENADA' },
  { id: 69, name: 'GUATEMALA' },
  { id: 70, name: 'GUINEA' },
  { id: 71, name: 'GUINEA-BISSAU' },
  { id: 72, name: 'GUYANA' },
  { id: 73, name: 'HAITI' },
  { id: 74, name: 'HONDURAS' },
  { id: 75, name: 'HUNGARY' },
  { id: 76, name: 'ICELAND' },
  { id: 77, name: 'INDIA' },
  { id: 78, name: 'INDONESIA' },
  { id: 79, name: 'IRAN' },
  { id: 80, name: 'IRAQ' },
  { id: 81, name: 'IRELAND' },
  { id: 82, name: 'ISRAEL' },
  { id: 83, name: 'ITALY' },
  { id: 84, name: 'JAMAICA' },
  { id: 85, name: 'JAPAN' },
  { id: 86, name: 'JORDAN' },
  { id: 87, name: 'KAZAKHSTAN' },
  { id: 88, name: 'KENYA' },
  { id: 89, name: 'KIRIBATI' },
  { id: 90, name: 'KUWAIT' },
  { id: 91, name: 'KYRGYZSTAN' },
  { id: 92, name: "LAO PEOPLE'S DEMOCRATIC REPUBLIC (LAOS)" },
  { id: 93, name: 'LATVIA' },
  { id: 94, name: 'LEBANON' },
  { id: 95, name: 'LESOTHO' },
  { id: 96, name: 'LIBERIA' },
  { id: 97, name: 'LIBYA' },
  { id: 98, name: 'LIECHTENSTEIN' },
  { id: 99, name: 'LITHUANIA' },
  { id: 100, name: 'LUXEMBOURG' },
  { id: 101, name: 'MACEDONIA' },
  { id: 102, name: 'MADAGASCAR' },
  { id: 103, name: 'MALAWI' },
  { id: 104, name: 'MALAYSIA' },
  { id: 105, name: 'MALDIVES' },
  { id: 106, name: 'MALI' },
  { id: 107, name: 'MALTA' },
  { id: 108, name: 'MARSHALL ISLANDS' },
  { id: 109, name: 'MAURITANIA' },
  { id: 110, name: 'MAURITIUS' },
  { id: 111, name: 'MEXICO' },
  { id: 112, name: 'MICRONESIA (FEDERATED STATES OF)' },
  { id: 113, name: 'MONACO' },
  { id: 114, name: 'MONGOLIA' },
  { id: 115, name: 'MONTENEGRO' },
  { id: 116, name: 'MOROCCO' },
  { id: 117, name: 'MOZAMBIQUE' },
  { id: 118, name: 'MYANMAR' },
  { id: 119, name: 'NAMIBIA' },
  { id: 120, name: 'NAURU' },
  { id: 121, name: 'NEPAL' },
  { id: 122, name: 'NETHERLANDS' },
  { id: 123, name: 'NEW ZEALAND' },
  { id: 124, name: 'NICARAGUA' },
  { id: 125, name: 'NIGER' },
  { id: 126, name: 'NIGERIA' },
  { id: 127, name: 'NORWAY' },
  { id: 128, name: 'OMAN' },
  { id: 129, name: 'PAKISTAN' },
  { id: 130, name: 'PALAU' },
  { id: 131, name: 'PANAMA' },
  { id: 132, name: 'PAPUA NEW GUINEA' },
  { id: 133, name: 'PARAGUAY' },
  { id: 134, name: 'PERU' },
  { id: 135, name: 'PHILIPPINES' },
  { id: 136, name: 'POLAND' },
  { id: 137, name: 'PORTUGAL' },
  { id: 138, name: 'QATAR' },
  { id: 139, name: 'REPUBLIC OF KOREA (SOUTH KOREA)' },
  { id: 140, name: 'REPUBLIC OF MOLDOVA' },
  { id: 141, name: 'ROMANIA' },
  { id: 142, name: 'RUSSIAN FEDERATION' },
  { id: 143, name: 'RWANDA' },
  { id: 144, name: 'SAINT KITTS AND NEVIS' },
  { id: 145, name: 'SAINT LUCIA' },
  { id: 146, name: 'SAINT VINCENT AND THE GRENADINES' },
  { id: 147, name: 'SAMOA' },
  { id: 148, name: 'SAN MARINO' },
  { id: 149, name: 'SAO TOME AND PRINCIPE' },
  { id: 150, name: 'SAUDI ARABIA' },
  { id: 151, name: 'SENEGAL' },
  { id: 152, name: 'SERBIA' },
  { id: 153, name: 'SEYCHELLES' },
  { id: 154, name: 'SIERRA LEONE' },
  { id: 155, name: 'SINGAPORE' },
  { id: 156, name: 'SLOVAKIA' },
  { id: 157, name: 'SLOVENIA' },
  { id: 158, name: 'SOLOMON ISLANDS' },
  { id: 159, name: 'SOMALIA' },
  { id: 160, name: 'SOUTH AFRICA' },
  { id: 161, name: 'SOUTH SUDAN' },
  { id: 162, name: 'SPAIN' },
  { id: 163, name: 'SRI LANKA' },
  { id: 164, name: 'SUDAN' },
  { id: 165, name: 'SURINAME' },
  { id: 166, name: 'SWAZILAND' },
  { id: 167, name: 'SWEDEN' },
  { id: 168, name: 'SWITZERLAND' },
  { id: 169, name: 'SYRIAN ARAB REPUBLIC' },
  { id: 170, name: 'TAJIKISTAN' },
  { id: 171, name: 'THAILAND' },
  { id: 172, name: 'TIMOR-LESTE' },
  { id: 173, name: 'TOGO' },
  { id: 174, name: 'TONGA' },
  { id: 175, name: 'TRINIDAD AND TOBAGO' },
  { id: 176, name: 'TUNISIA' },
  { id: 177, name: 'TURKEY' },
  { id: 178, name: 'TURKMENISTAN' },
  { id: 179, name: 'TUVALU' },
  { id: 180, name: 'UGANDA' },
  { id: 181, name: 'UKRAINE' },
  { id: 182, name: 'UNITED ARAB EMIRATES' },
  { id: 183, name: 'UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND' },
  { id: 184, name: 'UNITED REPUBLIC OF TANZANIA' },
  { id: 185, name: 'UNITED STATES OF AMERICA' },
  { id: 186, name: 'URUGUAY' },
  { id: 187, name: 'UZBEKISTAN' },
  { id: 188, name: 'VANUATU' },
  { id: 189, name: 'VENEZUELA' },
  { id: 190, name: 'VIETNAM' },
  { id: 191, name: 'YEMEN' },
  { id: 192, name: 'ZAMBIA' },
  { id: 193, name: 'ZIMBABWE' },
];

/**
 * Folds a country name to a comparison key.
 *
 * KSOU's names and ICU's names describe the same places in different words,
 * so a literal match finds barely half of them: ICU writes "Antigua &
 * Barbuda" and "St. Kitts & Nevis", KSOU writes "ANTIGUA AND BARBUDA" and
 * "SAINT KITTS AND NEVIS"; ICU writes "Myanmar (Burma)", KSOU "MYANMAR".
 *
 * Dropping case, diacritics, punctuation, any parenthetical, and the filler
 * words closes most of that gap mechanically. What it cannot close — a
 * different name for the same country — is listed in `ISO_TO_KSOU_NAME`.
 */
function foldCountryName(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^A-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => (word === 'ST' ? 'SAINT' : word))
    .filter((word) => word !== 'AND' && word !== 'THE' && word !== 'OF')
    .join(' ');
}

/**
 * ISO code to KSOU's spelling, for the countries the fold above cannot
 * reconcile — a genuinely different name, not a formatting difference.
 *
 * Several are names KSOU has not updated (Swaziland became Eswatini in 2018,
 * Macedonia became North Macedonia in 2019, Turkey became Türkiye at the UN
 * in 2022). We match them anyway: the goal is to hand their CRM the ID it
 * expects, not to correct its master data.
 */
const ISO_TO_KSOU_NAME = {
  BN: 'BRUNEI DARUSSALAM',
  CD: 'DEMOCRATIC REPUBLIC OF THE CONG',
  CG: 'CONGO',
  CV: 'CABO VERDE',
  CZ: 'CZECH REPUBLIC',
  GB: 'UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND',
  KP: "DEMOCRATIC PEOPLE'S REPUBLIC OF KOREA (NORTH KOREA)",
  KR: 'REPUBLIC OF KOREA (SOUTH KOREA)',
  LA: "LAO PEOPLE'S DEMOCRATIC REPUBLIC (LAOS)",
  MD: 'REPUBLIC OF MOLDOVA',
  MK: 'MACEDONIA',
  RU: 'RUSSIAN FEDERATION',
  SY: 'SYRIAN ARAB REPUBLIC',
  SZ: 'SWAZILAND',
  TR: 'TURKEY',
  TZ: 'UNITED REPUBLIC OF TANZANIA',
  US: 'UNITED STATES OF AMERICA',
};

const KSOU_COUNTRY_BY_FOLDED = new Map(
  KSOU_COUNTRIES.map((country) => [foldCountryName(country.name), country]),
);

/**
 * Resolves one of this site's ISO country entries to KSOU's id and spelling.
 *
 * @param {{ code: string, name: string }} country Entry from `COUNTRIES`.
 * @returns {{ id: number, name: string } | null} `null` when KSOU's list has
 *   no counterpart — dependencies and territories, mostly, plus a few states
 *   its list omits. Callers must not invent an ID for these.
 */
export function resolveKsouCountry(country) {
  if (!country) return null;

  const override = ISO_TO_KSOU_NAME[country.code];
  const key = foldCountryName(override ?? country.name);

  return KSOU_COUNTRY_BY_FOLDED.get(key) ?? null;
}
