# ikigai Launchpad Design QA

## Source and implementation evidence

- Source capture: `.artifacts/design-qa/source-programs-desktop-viewport.png`
- Implementation capture: `.artifacts/design-qa/implementation-programs-desktop-v2.png`
- Same-input comparison: `.artifacts/design-qa/comparison-source-implementation-desktop.png`
- Extended page contact sheet: `.artifacts/design-qa/implementation-section-contact-sheet.png`
- Mobile hero: `.artifacts/design-qa/implementation-programs-mobile-v1.png`
- Mobile application: `.artifacts/design-qa/implementation-programs-mobile-apply-v4.png`
- Mobile navigation: `.artifacts/design-qa/implementation-mobile-menu-v1.png`
- Revised “What we look for” flow: `.artifacts/design-qa/revised-what-we-look-for-mobile.png`
- Revised FAQ-to-Launch Station flow: `.artifacts/design-qa/revised-faq-launch-station-mobile.png`
- Compact desktop: `.artifacts/design-qa/implementation-programs-tablet-900-top-v2.png`
- Tablet: `.artifacts/design-qa/implementation-programs-tablet-1024-v1.png`
- Expanded FAQ with keyboard focus: `.artifacts/design-qa/implementation-faq-open-desktop-v2.png`

## Viewport and state coverage

- Desktop: 1440 × 900, hero, benefits, application process, FAQ, and Launch Station.
- Tablet/compact desktop: 1024 × 900 and 900 × 900, including the longer navigation label.
- Mobile: 390 × 844, hero, application process, FAQ, Launch Station, and the open menu drawer.
- Interactive states: menu open/close, native FAQ disclosure expanded, FAQ summary keyboard focus, and Apply CTA targets.
- The implementation preserves the source page's dark editorial hierarchy, typography, photography, restrained purple accents, borders, and spacing while adding the approved content architecture.

## Focused comparison

The source and implementation hero captures use the same 1440 × 900 viewport and appear together in `comparison-source-implementation-desktop.png`. The primary visual language remains consistent: oversized launchpad title, concise supporting copy, purple primary action, right-aligned offer facts, and full-width program photography. Intentional differences are limited to approved offer precision, the application status line, the renamed navigation item, and more useful fact labels.

The extended-page contact sheet verifies the initial benefits, fit, beyond-the-batch, application, FAQ, and Launch Station treatment. The two revised mobile captures supersede its fit/beyond and proof-link portions: those editorial image slots and the “Go deeper” section were removed in the follow-up pass.

## Findings and iteration history

1. Initial FAQ expansion showed the answer too close to the focused summary outline (P2). Added 10px top padding to the answer region and recaptured the expanded/focused state. Resolved.
2. Compact desktop navigation was checked at 900px. The full navigation, `ikigai Launchpad` label, and Apply button fit without collision or horizontal overflow. Resolved without code changes.
3. The first mobile application capture occurred before its reveal paint completed. Recaptured after the section reached its visible state. Resolved.
4. Follow-up revision removed program-page hover treatments, the “Go deeper” section, and the additional fit/beyond image slots. “Founder fit” became “What we look for.” Verified the new FAQ-to-Launch Station transition and text-only section flow.
5. No broken program images, clipped text, horizontal overflow, console warnings, or console errors were found in the final pass.

## Functional and accessibility checks

- One H1 and a logical H1/H2/H3 heading hierarchy.
- Eight native, keyboard-operable `<details>` disclosures.
- Visible focus styling on the FAQ summary.
- Descriptive alternatives on every program image.
- All Apply links resolve to the existing Tally form.
- The Interview Guidebook, contact, Tally application, and Launch Station links remain present.
- Canonical URL, title, description, breadcrumb, `Service`, and `Offer` JSON-LD validate in the rendered page.
- Desktop, tablet, compact desktop, and mobile document widths match their viewports.

Final result: passed

## Testimonial card revision — July 13, 2026

### Evidence

- Source visual truth: `.artifacts/design-qa/source-testimonial-cards-reference.png`
- Desktop implementation: `.artifacts/design-qa/implementation-testimonial-cards-desktop.png`
- Mobile implementation: `.artifacts/design-qa/implementation-testimonial-cards-mobile.png`
- Same-input desktop comparison: `.artifacts/design-qa/comparison-testimonial-cards-desktop.png`
- Desktop viewport/state: 1440 × 1000, testimonial section centered, four complete quotes visible.
- Mobile viewport/state: 390 × 844, testimonial section, vertically stacked complete quote cards.

### Focused comparison

The comparison isolates the testimonial section because the supplied reference is a component-level layout target rather than a full 886 page. The implementation preserves the reference's essential structure—independent light cards, a distinct person header, a divider, and the quote below—while intentionally retaining 886's dark page background, Geist typography, purple metadata, and restrained radius. Profile photos are intentionally omitted until the user supplies the founder images.

### Required fidelity surfaces

- Fonts and typography: Existing Geist and Geist Mono families retained; hierarchy matches the reference with founder name first, company metadata second, and the full quote below.
- Spacing and layout rhythm: Cards are visibly separated by consistent gaps. Desktop uses four columns for the four available quotes; compact desktop uses two columns; mobile stacks one card per row without clipped text or empty carousel space.
- Colors and visual tokens: The requested off-white card background is retained. Purple metadata and borders connect the cards to the existing 886 palette.
- Image quality and asset fidelity: No invented avatars or placeholder graphics were used. The card header is ready for supplied profile photos in a later pass.
- Copy and content: All four founder quotes and attributions remain complete and unchanged.

### Findings and comparison history

1. Initial mobile implementation used a horizontal rail whose height was controlled by the longest quote, leaving excessive empty space on shorter cards (P2). Replaced the rail with naturally sized stacked cards on mobile. Post-fix browser evidence shows complete quotes, separate cards, and no unused card area.
2. The first implementation joined all testimonials inside one shared light field (P1 relative to the revised reference). Replaced it with four independent cards separated by visible gutters.
3. Browser console pass found no warnings or errors. Desktop, compact desktop, and mobile layouts have no clipped testimonial text or horizontal overflow.

### Remaining acceptable difference

- Founder profile photos are absent because the user said they will supply them later. This is expected, not a QA blocker.

Final result: passed
