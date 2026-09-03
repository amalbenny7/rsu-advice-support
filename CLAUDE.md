# Reading Students' Union — Advice & Support redesign

Redesign and re-development of <https://readingsu.co.uk/advice-&-support>.
Not a reskin: new information architecture, new page templates, new stylesheet,
and a content refresh run by the SU's own teams.

---

## 1. Where this came from

### Audit — 22 April 2026

Findings:

- The landing page felt dated and lacked a strong hero or clear hierarchy.
- "Get Advice" was not dominant enough for students needing rapid help.
- Browsing categories took priority over urgent action.
- Page / nested-set / accordion decisions had no consistent rule.
- Council Tax, Academic Misconduct and Damp and Disrepair showed unnecessary
  depth or confusing structure.
- Academic and Student Finance content was dense.
- Safety had a visual disconnect from the rest of the area.
- Live content included placeholders and stale facts, including old minimum
  wage figures.
- Little Learners sat beside core advice categories even though it functions
  more like a service or sub-brand.
- Energy Advice was too uneven to justify its position without a full review.

Direction agreed: group content into clear categories, remove outdated
material, reduce duplicate pages, create stronger landing pages, and use
subheading navigation where a separate page is unnecessary.

### Analytics — 30 June 2025 to 27 July 2026

"Searching for Accommodation" was the highest-traffic advice page. Housing
therefore leads the restructure.

Proposed (NOT yet ratified — see §9):

- Private renting and finding accommodation as the Housing spine.
- Combine damp, disrepair and repairs into one topic.
- Bring related Money, Cost of Living, Safety and Welfare content into clearer
  journeys.
- Keep International Students visible as a distinct need.
- Reduce Student Funding from seven pages to around four or five where the
  content permits.

### Content owners

| Area | Owner |
|---|---|
| Housing | Jane Taylor |
| Money and Cost of Living | Susie Mellor, Jessica Vine |
| Academic | Ryan Kirby, Rebecca Stephens |
| Energy Advice | Unassigned — full review required |

### Delivery workflow

Only live website content was initially available, so editable source documents
sometimes had to be recreated. Teams update the supplied Word documents,
highlight or colour every change, and return **one consolidated final version**
— not fragmented edits.

---

## 2. Platform constraints

- The site runs on an ExpressionEngine-style CMS (SUMS Digital). Pages are HTML
  **fragments**, not documents.
- **There is no `<!doctype>`, `<html>`, `<head>` or `<body>`.** The file starts
  at `{embed="global/.header" title="…"}` and ends at the footer embed. Writing
  a full HTML document is wrong for this platform.
- `<link>` tags for stylesheets go **inside the fragment**, straight after the
  header embed. That is how the house pages do it.
- **No build step.** No framework, no preprocessor, no bundler. Plain HTML + CSS.
- Bootstrap 5 and Bootstrap Icons are present on legacy pages. New work does not
  depend on either.
- Assets live on `https://assets-cdn.sums.digital/RD/…`.
- Because our markup shares the document with the global header/nav/footer
  embeds, **bare element selectors are forbidden** (see §5).

### The house pattern — follow this

The FeedbackLoop page (`/the-feedbackloop`) is the reference for how a modern
SU page is written. Its shape:

```
{embed="global/.header" title="…"}
<link rel="stylesheet" href="https://assets-cdn.sums.digital/RD/digital_development/…/css/…css">

<main class="feedbackloop-home">
  <header class="page-container hub-page-heading"><h1>…</h1></header>
  <section class="page-container hub-section">…</section>
</main>

{embed="global/.footer"}
```

What to take from it:

- One page-level class on `<main>`; `.page-container` on each section.
- The `<h1>` sits alone in a plain heading block. **No hero.** No tagline stack,
  no chip row, no stacked CTAs.
- Copy carries the page. Sections are text plus, at most, one visual.
- One accent-coloured button per section, with a `→`, and nothing else.
- Block/modifier class naming (`hub-section--reverse`, `button--cyan`).
- Almost no chrome. Where a card exists at all (`president-card`) it is an
  image plus a name, with no visible border or shadow.

### Design rules for this project

Written down because the first attempt broke all of them:

- **No tile borders, no box shadows, no gradient heroes, no glow effects, no
  hover lift.** If it reads as a template, it is wrong.
- Cards are allowed, but a card here is a photograph, a colour rule and some
  type — never a bordered box on a tinted background. See `.advice-card`.
- Structure comes from imagery, hairline rules, whitespace and type scale.
- Colour appears as a marker, a rule or a button fill — never as a filled
  panel behind text.
- Do not add sections the brief did not ask for. No "how it works" steps, no
  trust badges, no accreditation strips, no sticky bars.
- Every element has to earn its place. This is an advice service, not a
  marketing page.
- **No underlines. Anywhere. Not at rest, not on hover.** Links are told apart
  by weight and colour: navigation links are deep blue semibold, links inside
  body copy take `--cerise-ink`. Do not reach for `text-decoration` as a hover
  state — use colour, border-colour or a background tint.

### What the legacy code revealed

`advice leagcy.txt` holds the current index, Housing and Academic pages. Every
category page re-renders the **entire eight-card grid** — Housing and Academic
are the same ~300 lines with a different `<h1>`. That duplication, not the
styling, is the real cause of the maintenance problem. New subpages use a
breadcrumb plus `.sibling-nav` instead.

The legacy pages also use stock Bootstrap utilities (`bg-info`, `bg-warning`,
`bg-secondary`), so the current site is not actually on brand.

---

## 3. Brand

Source: `READING_SU_BRAND_BOOK.pdf` (strategy only, no visual specs) and
`READING_SU_VISUAL_GUIDELINES.pdf` (palette p.7, typography p.9–11, organic
shapes p.20).

### Palette

| Name | Hex | Role |
|---|---|---|
| Deep blue | `#0d1d3b` | Primary |
| White | `#ffffff` | Primary |
| Cerise | `#ff1758` | Secondary |
| Afterglow yellow | `#ffb411` | Secondary |
| Spring green | `#2ed28b` | Secondary |
| Sea blue | `#1eb9dc` | Secondary |
| Light grey | `#ebebeb` | Secondary |

Five secondaries, six live categories — so colours repeat. Do not invent a
sixth secondary.

### Typography

- **Changa One** — display font, headings only. Ships **one weight**. Becomes
  illegible below ~18px, so `h5`/`h6` fall back to Kanit.
- **Kanit** — body copy. Weights 300/400/500/600/700.
- **Chantal Bold** — playful/handwritten. Not used in this build.
- **Calibri** — fallback when the design fonts are unavailable.

Both Changa One and Kanit are on Google Fonts.

### Contrast rules — non-negotiable

This is an AQS-accredited advice service; accessibility is not optional.

| Pairing | Ratio | Verdict |
|---|---|---|
| Deep blue on white | 16.7:1 | Body text |
| Yellow on deep blue | 9.4:1 | Good |
| Spring green on deep blue | 8.5:1 | Good |
| Sea blue on deep blue | 7.2:1 | Good |
| White on cerise | 3.8:1 | **Large text only** (≥24px or 18.66px bold) |
| White on yellow | 1.8:1 | **Never** |
| White on spring green | 2.0:1 | **Never** |
| White on sea blue | 2.3:1 | **Never** |
| Cerise on white | 3.8:1 | **Fails AA for body copy** |

Consequences, already encoded in the stylesheet:

- Only **deep blue** and **cerise** carry white text; cerise only at heading size.
- Yellow, spring green and sea blue **always** take deep blue text.
- `--cerise-ink: #e00046` (4.9:1) is the accessible cerise for text under 24px.
  `.red` uses it. Full-strength `--cerise` is for fills and rules only.
- Using `--accent` with `--accent-ink` makes this impossible to get wrong.

The legacy CSS put white text on sea blue — that fails today.

### Organic rectangle assets

```
https://assets-cdn.sums.digital/RD/website-assets/Images/website-images/ORGANIC-RECTANGLE-DEEPBLUE.webp
…/ORGANIC-RECTANGLE-AFTERGLOW.webp     (yellow)
…/ORGANIC-RECTANGLE-SPRING-GREEN.webp
…/ORGANIC-RECTANGLE-SEABLUE.webp
…/ORGANIC-RECTANGLE-CERISE.webp
```

There is no grey organic shape.

---

## 4. Files

```
advice/
├── CLAUDE.md                        this file
├── index.html                       Advice & Support landing page
├── housing.html                     category page
├── searching-for-accommodation.html Housing topic
├── private-rental.html              Housing topic
├── disrepair.html                   Housing topic
├── leaving-your-tenancy.html        Housing topic
├── renters-rights.html              Housing topic
├── money.html                       category page
├── academic.html                    category page
├── safety.html                      category page, single page
├── css/global.css                   the global stylesheet
├── js/advice.js                     Get Advice bar + directory filter
├── advice leagcy.txt                current live markup, for reference
├── READING_SU_BRAND_BOOK.pdf
└── READING_SU_VISUAL_GUIDELINES.pdf
```

Category pages carry a banner image under the `<h1>`; **Housing subpages do
not** — only the landing page for an area gets one.

---

## 5. Stylesheet architecture

`css/global.css` — one file, no build step.

### The scoping rule

Tokens live on `:root`. **Everything visual is scoped under `.advice`**, which
sits on `<main>`. Nothing styles the document outside it, so the SU global
header, nav and footer embeds are never touched.

```html
<main class="advice advice-home">        <!-- landing page -->
<main class="advice theme-green">        <!-- category / topic page -->
```

### Themes

Named by **colour, not category**, so the IA can change without a CSS edit:

`.theme-deepblue` · `.theme-cerise` · `.theme-yellow` · `.theme-green` ·
`.theme-seablue` · `.theme-grey`

Each sets `--accent`, `--accent-ink`, `--accent-soft`, `--accent-organic`.
That is the only per-page CSS hook. `.theme-grey` is the holding state for an
area awaiting its content review (Energy).

The same colours exist as `.is-deepblue` … `.is-grey` for setting an accent on
a single element — used by the category list.

### Key tokens

- `--measure: 68ch` — the reading measure. The most important value in the file
  for content running to thousands of words per page.
- `--leading-body: 1.65`, `--leading-tight: 1.12` (Changa One is heavy).
- Type scale `--step--1` … `--step-4`; space scale `--sp-1` … `--sp-8`.
- `--radius: 10px` matches existing SU components; `--radius-organic:
  10px 0 10px 0` is the `.blueT` / table-header motif.

### Components

Deliberately few:

| Class | Purpose |
|---|---|
| `.page-container` | Section width and gutters |
| `.advice-heading` + `.advice-intro` | Plain page heading block |
| `.title` | Optional organic-rectangle heading, stretches to its text |
| `.button` (+ `--yellow`, `--deepblue`) | The only button |
| `.advice-quick` / `.quick-panel` | Deep blue quick-links panel, links in a reflowing grid |
| `.get-advice-bar` | Persistent Get Advice, fixed to the viewport foot |
| `.advice-cta` | Closing Get Advice block |
| `.advice-cards` / `.advice-card` | Category cards: image, 4px accent rule, name, one line. No border, background or shadow |
| `.advice-section` | A body section |
| `.acc-group` / `.acc` / `.acc__body` | Native `<details>` accordion, zero JS |
| `.chapter-links` | "On this page" |
| `.callout` (+ `--urgent`/`--action`/`--info`/`--good`) | Left-rule note |
| `.contact-list` / `.contact` | Directory rows: `.contact__name` then `.contact__detail`. Hairlines, no box |
| `.table-wrap` + table styles | Wide tables scroll inside their wrapper |
| `.directory` / `.dir-item` / `.dir-field` | A filterable provider list. Use it instead of a table when the row has more than three columns of prose &mdash; a five-column table can only be read sideways on a phone. Search field is revealed by `advice.js`, so it degrades to the plain full list |
| `.breadcrumb`, `.sibling-nav` | Subpage navigation |
| `.page-meta` | "Last reviewed" |
| `.prose`, `.note`, `.sr-only` | Text helpers |

Legacy house utilities are kept and contrast-corrected: `.yellow`, `.green`,
`.blue`, `.deepblue`, `.red`, `.bold`, `.blueT`, `.yellowTable`, `.greenTable`,
`.blueTable`, `.g-no-under`, `.links`, `.hide`.

### Fixes applied to the original house CSS

Do not reintroduce these:

| Was | Now | Why |
|---|---|---|
| Bare `header{}`, `footer{}`, `button:hover{}` | Scoped to `.advice` | Repainted the real site nav and footer |
| `text-align: center` on `body` | Left-aligned | Fatal for long-form advice copy |
| `.title` `background-size: contain` + `max-width: 300px` | `100% 100%`, fluid | Clipped long titles |
| `.g-no-under { text-decoration: none; !important; }` | `none !important` | Stray semicolon voided the declaration |
| `transform: scale(103%)` | Removed | Percentage args to `scale()` are recent |
| `.red` = full cerise | `--cerise-ink` | 3.8:1 fails AA |
| White text on `.blue`/`.green`/`.yellow` | Deep blue ink | Contrast |
| No focus styles | `:focus-visible` rings | AQS |
| No print styles | Accordions force open, URLs print, organics drop out | Advisers print these pages |

Also added: `.sr-only`, `prefers-reduced-motion`, `forced-colors`,
`scroll-margin-top` on `:target`.

### `!important` policy

Retained on **link colour only**, plus a few `text-decoration: none` cases, to
win against CMS theme rules that target links by id. Do not spread it further.

---

## 6. What is built

### `index.html` — the landing page

A fragment, three blocks, nothing else:

1. **Heading** — `<h1>`, a three-sentence intro saying what the service is, and
   one yellow "Get advice →" button. No hero, no chips, no tagline stack.
2. **What we can help with** — the six categories as portrait image cards,
   **all equal weight**. Each is a single link: legacy photo in a 3:4 rounded
   frame, a 4px rule in the category colour, the name in Changa One with an
   arrow, and a sentence describing what the area covers.
   **No border, no background, no shadow, no hover lift, and no underline
   anywhere** — the photo, the colour rule and the type carry it. On hover the
   accent rule draws out from a short marker to the full width of the card, a
   14% wash of the category colour comes over the photo, and the arrow nudges.
   `:focus-visible` mirrors all three, so keyboard users get the same feedback.
   Energy takes the muted slate rather than light grey, which is invisible as
   a 4px rule.
   3 columns above 60rem, 2 above 40rem, 1 below.

   The card selectors are written as `.advice .advice-cards`, not
   `.advice-cards`. Without the prefix, `.advice ul` (0,1,1) outranks it and
   reimposes `padding-left: 1.3em` and `max-width: 68ch`, which shrinks the
   grid and pushes it off the page's left margin. If the grid ever looks
   inset again, that is why.
3. **About the Advice Service** — the confidentiality and memberships copy in
   the same container and on the same left margin as everything else, closing
   with the 999 line as a plain note. It is deliberately not a tinted band and
   not centred: it reads as part of the page, not a separate panel.
4. **Talk to an adviser** — the closing Get Advice block.

Two extra pieces sit around those:

- **`.quick-panel`** — a deep blue panel of direct links under the heading, for
  the pages students go to without browsing. Noticeable at rest rather than on
  hover. Links sit in a grid that reflows 3 → 2 → 1 column, so the number of
  links is free; nothing scrolls sideways. Currently ten placeholders for the
  teams to re-point.
- **`.get-advice-bar`** — Get Advice is the service's one action, so it is
  fixed to the foot of the viewport rather than being a single CTA in the
  flow. It is a slim bar, not a floating widget. `.advice-home` carries a 5rem
  `padding-bottom` to clear it. A ~10-line IntersectionObserver in the page
  hides the bar while the closing block is on screen so the same button is
  never shown twice; with no JS the bar simply stays visible.

All copy is from the current live page. The only new writing is the six
one-line category descriptions — **these need owner sign-off**.

No phone numbers, opening hours or addresses were invented. The audit flagged
placeholders on live pages; the only contact route is the real Get Advice form.

### Category → colour mapping (matches the live site)

| Category | Class | Image (legacy CDN) | Link |
|---|---|---|---|
| Housing | `is-deepblue` | `Housing.png` | `/advice-&-support/housing` * |
| Money | `is-green` | `Money.png` | `/advice-&-support/money` * |
| Academic | `is-seablue` | `Academic.png` | `/advice-&-support/academic` * |
| Cost of Living | `is-yellow` | `Cost_of_Living.png` | `/advice-&-support/cost-of-living` |
| Safety | `is-cerise` | `Safety2.png` | `/advice-&-support/safety` |
| Energy Advice | `is-grey` | `Energy_Thumbnail.png` † | `/advice-&-support/energy` |

\* These category pages **do not exist yet**. Everything else is live.
† Energy sits under `RD/web-image-2025-26/`; the rest under
`RD/website-assets/Images/website-images/`.

**Little Learners has been removed** from the advice area — it is a service,
not advice. **Welfare has also been removed** — the welfare directory is no
longer part of this area, so the card and the Safety sibling-nav link to
`/welfare-directory` are gone. The other six are retained pending the content
work (see §9).

---

## 7. Conventions for new pages

### Two page types

- **Category page** (e.g. Housing) — a hub: intro, then the topics it contains.
- **Topic page** (e.g. Damp) — long-form advice content.

Both share the stylesheet and the same skeleton:
heading → "on this page" → sections → `.page-meta`. No hero.

### The page-vs-accordion rule (proposed, not yet ratified)

> It gets its own page if a student would search for it by name, or an adviser
> needs to paste the URL into an email. Otherwise it is an accordion on its
> parent page.

This is the rule the audit was missing, and why Council Tax and Academic
Misconduct drifted. Get it agreed before the rollout.

### Other conventions

- Accordions are native `<details>` — **no JS, and no open/close animation**.
  This was tried and reverted: animating the panel height puts the text on a
  composited layer (grayscale antialiasing — the "blurry text" report), and it
  makes the page depend on the CSS and JS being deployed in lockstep, which on
  this CMS they are not. Instant open is correct here. Do not reintroduce it.
  Keyboard accessible and findable by in-page search. A `#section` link will **not** auto-open a closed panel;
  that needs ~15 lines of JS, and the CSS is already prepared for it
  (`:target` has `scroll-margin-top`).
- Wide tables always go inside `<div class="table-wrap">`.
- Add `.page-meta` with a "Last reviewed" date to every page, and keep volatile
  figures (minimum wage, LHA rates) in as few places as possible. This is the
  defence against the stale-content finding.
- Never re-render the full category grid on a subpage. Use `.breadcrumb` +
  `.sibling-nav`.
- Follow the design rules in §2. Reach for a hairline and whitespace before a
  box.

---

## 8. Previewing and verifying

`index.html` is a CMS fragment, so it will not render on its own — it has no
`<head>`. Do not add a wrapper to it.

**Never create `preview-*.html` files, or any other wrapped copy, inside this
folder.** Every file here is hand-uploaded to the CMS, so a duplicate is not a
harmless scratch file — it is a second copy of a page that can drift from the
real one and get uploaded by mistake. If a rendered preview is genuinely
needed, build the wrapper in the session scratchpad directory, outside the
repo, and delete it afterwards.

For the same reason, nothing else transient belongs in this folder: no browser
profile directories (`_ap`, `_mp`), no screenshots, no automation leftovers.

There is no dev server:

```bash
python -m http.server 8792
```

---

## 9. Open decisions

1. **Where the stylesheet is hosted.** If the global header embed is editable,
   delete the `@import` at the top of the CSS and add `<link>` tags for the
   stylesheet and the fonts — it removes a render-blocking request chain. If
   only page bodies are editable, the `@import` stays.
2. **Sign-off on the six category descriptions** on the landing page, from
   each content owner.
3. **The page-vs-accordion rule** (§7) needs agreeing before rollout.
4. **The IA itself is still open.** Little Learners and Welfare have both been
   dropped from the advice area, which settles the audit's Safety + Welfare
   merge. The Money + Cost of Living merge and a full Energy review are still
   undecided, so the remaining six categories stand until the content work says
   otherwise.
5. **Redirects** for every URL that moves at cut-over.
6. Deep-linking JS for accordions, if wanted.

---

## 10. Working preferences

- **Do not over-engineer.** The CSS starts minimal and grows only when a real
  page demands it. Each content area has a different data length and range;
  the stylesheet evolves as those ranges show up, rather than being guessed at
  in advance.
- Do not decide content or IA unilaterally — those belong to the audit process
  and the named owners.
- Prefer one shared component over a per-page variant.
