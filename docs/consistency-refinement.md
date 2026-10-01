# Consistency refinement — October 1, 2026

Implemented on `feature/new-information-architecture` following the whole-site critique. Delivery is limited to this feature branch; a production merge or deployment remains outside the requested scope.

## Confirmed decisions

- Manifesto and Rising Star retain placeholder copy and remain in navigation. Their shared layout identifies them as draft pages; their existing `noindex` setting remains.
- Keep “Apply Now” and the existing Tally form. Explain that next-batch dates are unannounced and there is no current deadline. Do not imply a waitlist, change application policy, or promise a response date.
- The existing uncommitted world-map work and its illustrative-data disclosure remain intact.

## Changes

- Desktop navigation reserves each side column’s intrinsic content width, preventing the residency CTA from overlapping Contact at smaller desktop widths while retaining centered navigation when space permits.
- Portfolio is available under Community; the About overview is available under About us. Standalone resource guides retain Resources context, and team biographies do not incorrectly activate Overview.
- Blog uses one section name. Its heading is plain text; a separate, explicit link opens ikigai Insights on Substack.
- One BackLink component supplies wording, arrow, 44px target, focus treatment, and spacing for all 65 resource, portfolio, team, and blog detail pages. Portfolio now accounts for the header height like other detail pages.
- Resource and biography prose use the same 17px reading role as blog articles. Static resource cards render as noninteractive text blocks; linked cards retain a bordered surface, directional icon, and keyboard focus treatment.
- Application timing uses a shared source for the application section, FAQ, contact note, and navigation description. The mobile menu displays the timing beside Apply Now.
- The Events subscription action appears immediately after upcoming events, before the archive.

## Validation

- All 41 existing tests passed.
- Astro checked 109 files with zero errors, warnings, or hints.
- Local production build generated 87 HTML pages; SEO and security checks passed.
- Built-page checks confirmed all 65 return-link destinations, resource active states, team/overview distinction, retained draft copy, Blog naming, and Events action order.
- Native Chrome screenshots confirmed the Launch Station header at 881, 900, and 1024px. Desktop checks at 1440px covered Blog, resource quotes, Contact, and Manifesto. Mobile checks at 390px covered Blog, Contact, resource quotes, Events, Portfolio, and Team profiles. The mobile menu exposes the added links and timing note; Escape restores focus to its trigger.
- Browser inspection stopped when the user switched Chrome to another task. The final portfolio top-spacing correction was checked in source and built output; it has not received a follow-up screenshot. No external forms were submitted.

Approved placeholder pages and illustrative map data still need final content before a production release. Other editorial observations from the critique, including missing biographies and ambiguous historic copy, were not replaced with invented content.
