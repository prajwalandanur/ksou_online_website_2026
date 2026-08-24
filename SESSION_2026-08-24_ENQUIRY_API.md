# Session log — 2026-08-24

Two pieces of work: getting ten days of uncommitted work onto `main`, and
wiring the enquiry form to KSOU's real enquiry API (Talisma) per `apitest.md`.

`CLAUDE.md` is still the source of truth for how the site works. This file
records **what happened on this date and why**, including the things that were
checked and turned out to be wrong — those are the parts that are expensive to
rediscover.

---

## 1. Ten days of work were sitting uncommitted

The newest commit was `73fd43e` (2026-08-14). Everything built between the 18th
and the 21st — the enquiry popup, the Contact-page form, the About rebuild, the
Kannada About page, the LMS link change — was unstaged in the working tree: 31
modified/deleted tracked files and 27 untracked ones.

Verified clean before pushing: `npm run lint` clean, `npm run build` clean,
27/27 routes pre-rendered including the new `/kn/about`.

Split into four commits so the history stays reviewable:

| Commit | Scope |
|---|---|
| `765063e` | Enquiry popup + the same `EnquiryForm` on `/contact` (20 files, +2328) |
| `7a1d24d` | LMS Login → the university's real external LMS |
| `99eff41` | About rebuilt as leadership-centred, + `/kn/about` + the Kannada tracking fix |
| `cf7d5ac` | `CLAUDE.md` + `apitest.md` |

**Deliberately left untracked:** `Screenshot 2026-08-13 074752.png` — an unnamed
screenshot at the repo root, predating this work. Still on disk, nothing lost.

Three files straddled two logical changes (`ui.js`, `AppRoutes.jsx`,
`prerender.mjs`), so each went with its dominant change and the commit message
says so rather than pretending the split was clean.

---

## 2. Enquiry API integration

### The starting state was worse than "unfinished"

`services/enquiry.js` logged the lead to the console, returned success, and the
visitor was told a counsellor would call. Live on every route. Every enquiry
submitted since the popup shipped went nowhere.

### What the brief got wrong

`apitest.md` gives an example payload pairing `programId: 2` with `"MA"`, while
telling the implementer never to assume that 2 is correct.

**It is not. `2` is Bachelor Of Commerce.** Had that been trusted, every MA
enquiry would have been filed against B.Com in a real CRM.

`countryId: 77` for India, the brief's other example, *is* correct.

### Where the real IDs came from

The API publishes **no list endpoint** — its OpenAPI document at
`/ksouapi/swagger/v1/swagger.json` (publicly readable) exposes only the enquiry
POST, a candidate-image upload and three student lookups.

But KSOU's own live enquiry form at
`https://onlineprogramme.ksoumysuru.ac.in/KSOU/Public/EnquiryForm` already posts
to this same API, and every official ID sits in its dropdown option values.
Both tables were transcribed from there on 2026-08-24 into
`src/constants/ksouCrm.js`.

| Programme | ID |
|---|---|
| Bachelor Of Arts (History, Economics, Political Science) | 1 |
| Bachelor Of Commerce | 2 |
| Master Of Arts — Kannada / English / Hindi / Sanskrit / Economics | 3 / 4 / 5 / 6 / 7 |
| Master Of Commerce | 8 |
| Master Of Business Administration | 9 |
| Master Of Science - Mathematics | 10 |

Countries are a plain alphabetical 1–193, which is why India lands on 77.

**These are observed, not documented.** If KSOU renumbers its master data this
goes stale silently and leads land against the wrong programme. Re-read that
form after any KSOU portal change.

### Both IDs are mandatory, despite the schema saying otherwise

`SaveEnquiryRequest` lists only `studentName`, `mobileNo`, `emailId`, `country`
and `program` as required. `countryId` and `programId` look optional — they are
not. They are non-nullable ints carrying `Range(1, ...)`, so omitting one sends
`0` and fails validation:

```
400 {"errors":{"CountryId":["The field CountryId must be between 1 and 2147483647."],
                "ProgramId": ["The field ProgramId must be between 1 and 2147483647."]}}
```

**How that was tested without creating a lead:** send a payload that omits a
required *string* as well. Validation fails, nothing is stored, and the error
list still tells you what else was mandatory. Reuse this trick for any future
probing of that endpoint — a valid probe writes a real record into a real CRM.

### Three consequences that changed the site

**MA is one card here and five programmes there.** KSOU splits Master of Arts by
discipline (3–7). The enquiry option now expands into one per discipline, which
is what their own form does. Data, not a redesign — the combobox, its search and
its markup are untouched.

- The option *value* carries the English key (`ma:English`), matching
  `MA_PROGRAMME_IDS`.
- The *label* comes from the localised `specializations` array — which on `/kn`
  holds Kannada strings — **paired by position**. The order of that array in
  `constants/courses.js` and `locales/kn/courses.js` is now load-bearing;
  reordering one locale mislabels a discipline.
- `/programmes/ma` no longer preselects. The page covers all five, so there is
  no single correct answer to fill in.

**The country field offers KSOU's 193, not our 245 ISO regions.** Audited: all
193 map with no collisions. The 52 that drop out are dependencies, territories
and limited-recognition states (Taiwan, Hong Kong, Palestine, Kosovo, Vatican,
Réunion...). Offering a country and then failing on submit is worse than not
offering it, and this is the same set KSOU's own form presents. Display names
and search aliases stay ours; only the set is theirs.

`ISO_TO_KSOU_NAME` covers the ~17 genuine name differences (Eswatini/Swaziland,
Türkiye/Turkey, North Macedonia/Macedonia, the two Koreas, DR Congo, Czechia,
Laos, Moldova, Tanzania, Russia, Syria, Brunei, Cabo Verde, UK, USA). The rest
reconcile mechanically in `foldCountryName`. KSOU's entry 47 is published
truncated as `DEMOCRATIC REPUBLIC OF THE CONG` and is stored exactly that way.

**The browser cannot call the API at all.** Verified from the deployed Vercel
origin: the cross-origin POST fails outright with `TypeError: Failed to fetch`,
because the host sits behind Cloudflare and sends no `Access-Control-Allow-Origin`
for this site. Nothing to fix on our side — CORS is the other server's decision.

So `api/enquiry.js` (new, Vercel serverless function) forwards the lead
server-to-server. It whitelists the eleven schema fields, coerces and range-checks
both IDs, and keeps our own `meta` (page, source, language) out of their CRM.
It holds no credentials — the endpoint is unauthenticated — so there is nothing
in it to leak.

**`vercel.json` grew a negative lookahead**: `/((?!api/).*)`. Without it the SPA
catch-all would serve `index.html` for `/api/enquiry`, turning a failed enquiry
into a 200 of HTML — the worst available outcome.

### UTM attribution

New `src/services/utm.js`, captured once in `MainLayout` on the landing URL.
This has to happen at arrival: a visitor lands on `/?utm_source=...`, browses,
and by the time they open the form React Router has replaced the URL several
times and the parameters are gone.

First-touch wins, sessionStorage (attribution belongs to the visit, not to a
click a week ago), and absent campaigns send `""` — never `"test"`.

### Verified end to end against the real form

Playwright against the live dev build, intercepting the proxy call:

```json
{ "studentName": "Test User", "mobileNo": "9999999999",
  "emailId": "test@test.com", "city": "Bangalore",
  "countryId": 77, "country": "INDIA",
  "programId": 4, "program": "Master Of Arts - English",
  "utmSource": "google", "utmMedium": "cpc", "utmCampaign": "ksou-july-2026" }
```

Also confirmed: MA expands to all five disciplines; searching "maths" still
finds M.Sc Mathematics; "Taiwan" correctly returns no option; UAE resolves to
182; MBA to 9; UTMs survived a landing-page → `/contact` navigation; a
no-campaign submission sends three empty strings; zero console errors.

Commits: `06c8bec` (integration), `291565c` (CLAUDE.md).

---

## 3. Still open

**Cloudflare vs. the proxy — untested.** Cloudflare 403s plain `curl`, and a
Vercel function's outbound request looks much the same. Whether it is admitted
can only be settled by a deploy. As of the end of this session the Vercel build
was still running, so **the one controlled test lead specified in `apitest.md`
(`Test User / 9999999999 / test@test.com`) has not been sent.**

If Cloudflare does block it, the fix is not code — it is asking KSOU to
allowlist Vercel's egress, or to send an `Access-Control-Allow-Origin` header so
the proxy can be dropped entirely.

**Nobody on this side can see Talisma.** A 200 proves the API accepted the lead,
not that it arrived correctly. Ask KSOU to confirm the test lead landed and that
`programId` / `countryId` read correctly against it before trusting the mapping
in production.

**Vercel Deployment Protection (SSO) is on** for `ksou-online-website-2026-qmolackhn.vercel.app`
— an unauthenticated request 302s to `vercel.com/sso-api`, and the responses
carry `X-Robots-Tag: noindex`. Worth confirming that is intended, because it
also means crawlers cannot see the site.

**Unrelated and still outstanding** (carried over, see `CLAUDE.md` §7):
Kannada review of both the enquiry strings and the new About page — both are
Claude-drafted, live on indexable URLs, and unreviewed by a Kannada speaker. The
About page names a real serving public official and states his career history,
so it belongs at the top of that queue.
