# Program page refinement — October 1, 2026

Launchpad remains the visual reference. Launch Station reuses its program buttons, fact labels, heading hierarchy, spacing, image borders, and secondary “Also available” link. Launch Station retains its split hero, community photos, and short, open layout; facts precede its hero photo on mobile.

## Confirmed content

The owner confirmed during this refinement:

- Launch Station lasts 90 days, has no costs, and takes no equity.
- The next ikigai Launchpad batch has not been announced. There is no current deadline.

The expired September 11, 2026 deadline and Fall 2026 invitation have been replaced in current program copy and the FAQ. The dated “applications open” social image has been replaced with existing Launchpad photography. Historical blog posts are unchanged.

## Contact and tracking

Residency CTAs use the existing general contact address from `siteContent.contact.general`, `it@886studios.com`, with the subject “Launch Station residency inquiry.” This address is already published on the site's contact page; no new inbox or form was invented. Both desktop and mobile navigation use the residency action only on Launch Station.

The existing Tally accelerator application URL and its `application_started` event placements are preserved. Residency actions retain `program_interest`; navigation retains its placement identifiers and uses the residency event and label. Local production analytics remain disabled by the existing environment guard.

## Details still requiring confirmation before publication

No residency funding amount, admissions sequence, shared mentor access, or admission relationship with Launchpad has been confirmed. The page makes no claims about these details. Neither program is presented as a prerequisite for the other.

## Verification

- Both pages inspected on desktop and mobile; overflow checked at 320, 390, 768, and 1440 pixels.
- Residency facts appear before the large photo on mobile.
- Reciprocal links traversed using the keyboard; inquiry addresses and subject checked in rendered desktop, mobile, hero, and closing CTAs.
- Mobile menu opens with Enter, closes with Escape, and returns focus; program links and buttons show visible focus.
- Launchpad's wordmark, hero composition, facts panel, photography, section sequence, benefits, testimonials, and FAQ retained. Hidden testimonial backs now use `inert` so their profile links cannot receive focus until revealed.
- Astro type check, 41 existing tests, production build, SEO, and security checks passed.
- Impeccable's detector reported only existing homepage gradient-text and background-grid styles outside this refinement.

## Follow-up visual alignment

Launch Station's mobile primary buttons now span the content width. Both reciprocal program thumbnails remain square and top-aligned below 640px, and their actions consistently read “Explore Launch Station” / “Explore ikigai Launchpad.” The action moves below the description on mobile and can wrap at narrow widths.

Verified both pages at 320, 390, 600, and 1440px: square mobile thumbnails, full-width residency buttons, correct link destinations, and no horizontal overflow. Astro check passed with no errors or warnings.
