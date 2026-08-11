Build the next section immediately below the Courses Offered section of the KSOU Online website.

This section should communicate the key advantages of choosing KSOU Online in a premium, modern, minimal, trustworthy way. It should not feel like a generic feature grid or traditional university website.

Before implementation, continue using the installed skills:

ui-ux-pro-max
react-expert
frontend-design

Follow their recommendations for UI/UX, React architecture, responsiveness, animation, accessibility, component structure, and production quality.

1. Section Title

Use:

Why Choose KSOU Online?
2. Section Subtitle

Use:

A flexible, recognized degree designed around your ambitions.

Keep the subtitle relatively light and elegant. It should not compete visually with the main heading.

3. Overall Section Concept

Do not create a conventional 3-column or 6-card grid.

Instead, create a continuous infinite horizontal scrolling feature section.

The feature items should continuously move:

RIGHT → LEFT

The movement should feel smooth, premium, and subtle.

The section should give the impression of a continuously moving strip of KSOU Online advantages.

4. Feature Items

Create the following six feature items, in this order:

01 — Government University

Icon: Landmark

Short supporting text:

A degree from Karnataka State Open University, a government university with an established academic legacy.

02 — UGC Recognized

Icon: BadgeCheck

Short supporting text:

Choose recognized online degree programmes designed for academic and professional growth.

03 — Study Alongside Work

Icon: BriefcaseBusiness

Short supporting text:

Build your qualifications without putting your professional commitments on hold.

04 — Flexible Learning

Icon: Clock3

Short supporting text:

Learn at your own pace with an online learning experience designed around your schedule.

05 — Digital Learning

Icon: MonitorPlay

Short supporting text:

Access your learning experience digitally through a modern online learning environment.

06 — Career Growth

Icon: TrendingUp

Short supporting text:

Develop knowledge and qualifications that support your academic and professional goals.

5. Card Design

Each feature should be presented as a premium horizontal feature card.

Do not make the cards excessively large.

The cards should have:

White background
Very subtle border
Soft shadow
Rounded corners
Generous internal spacing
Blue icon accents
Black/dark typography
Very subtle grey secondary text
Clean visual hierarchy

Primary blue:

#4169E1

Background:

#FFFFFF

Primary text:

#111111

Avoid excessive use of blue.

The blue should mainly appear in:

Icons
Small accents
Number labels
Hover states
6. Icon Design

Use Lucide React for these icons.

Do not download random icons from the internet.

Use:

Landmark
BadgeCheck
BriefcaseBusiness
Clock3
MonitorPlay
TrendingUp

Icons should have a consistent size and stroke weight.

Keep them elegant and minimal.

7. Infinite Horizontal Animation

This is the most important part of the section.

Create a true infinite horizontal marquee.

The cards should continuously travel:

RIGHT → LEFT → RIGHT → LEFT

Actually, the primary direction should remain:

RIGHT → LEFT

The track must loop seamlessly.

There should be no visible jump, reset, blank space, or sudden repositioning when the animation reaches the end.

Duplicate the feature set internally if required to create a seamless loop.

The user should feel like the content is continuously moving forever.

8. Animation Speed

Do not make the cards move quickly.

The animation should feel:

Smooth
Slow
Elegant
Premium
Continuous

Target approximately 20–30 seconds for one complete cycle.

Do not make each card individually appear every few seconds.

This is a continuous marquee, not an autoplay carousel.

9. Interaction
Desktop

The marquee should continuously move automatically.

On hover:

Slightly slow down or pause the movement.
Allow the user to comfortably read the cards.
Mobile

Maintain the horizontal row.

Do NOT stack the cards vertically.

Do NOT turn the section into:

Card
Card
Card
Card

Instead, maintain the horizontal scrolling experience.

Allow touch interaction so users can also swipe/drag the feature track manually.

10. Mobile Behaviour

This is extremely important.

On mobile:

Cards remain horizontal.
Cards should not become a vertical grid.
Only a portion of the next card may be visible to indicate horizontal movement.
The continuous marquee should remain active.
Text must remain readable.
Cards should resize appropriately.
No horizontal page overflow should occur outside the section.
The animation must remain smooth on mobile devices.

The section should feel intentionally designed for mobile rather than being a desktop layout squeezed onto a phone.

11. Visual Variation

Do not make every card look completely identical.

Maintain one consistent design system, but introduce subtle variations such as:

Different small accent treatments
Number labels
Slightly different icon positioning
Small decorative lines
Subtle blue/gold details

Do not overdesign them.

The cards should still clearly belong to the same component family.

12. Blue + Metallic Gold Accent

The primary accent remains:

Royal Blue — #4169E1

Introduce metallic gold sparingly as a secondary premium accent.

Use gold only for very subtle details such as:

Small decorative line
Tiny accent dot
Number indicator
Hover detail

Do not turn the cards gold.

The overall website should still primarily feel white + black + KSOU blue.

13. Section Layout

The overall structure should be:

WHY CHOOSE KSOU ONLINE?

A flexible, recognized degree designed around your ambitions.

──────────────────────────────────────────────

←  Feature Card  →  Feature Card  →  Feature Card  →  Feature Card  →

              Continuous Right-to-Left Movement

──────────────────────────────────────────────

Give the section enough vertical breathing room.

Do not make it excessively tall.

The heading/subtitle should remain visually separated from the moving feature track.

14. Typography

Use the same premium typography system already established throughout the website.

The main heading should be:

Sharp
Bold
Premium
High contrast
Modern editorial style

The supporting subtitle should be lighter and more restrained.

Feature titles should be bold but smaller than the section heading.

Feature descriptions should be comfortable to read without making the cards text-heavy.

Do not introduce a completely different font family just for this section.

15. Responsive Design

Ensure the section works properly at:

Large desktop
Desktop
Tablet
Mobile
Small mobile

Desktop should show multiple feature cards simultaneously.

Mobile should show approximately one full card plus part of the next card, creating a visual indication that the section continues horizontally.

Never allow the marquee to create unwanted horizontal scrolling on the entire webpage.

16. Accessibility

Follow accessibility best practices.

Ensure:

Semantic HTML
Accessible icon treatment
Proper text contrast
Keyboard accessibility where applicable
Reduced-motion support

If the user has prefers-reduced-motion enabled, provide an appropriate non-moving/static presentation rather than forcing continuous animation.

17. React Implementation Requirements

Create this as a reusable, modular React section.

Do not put everything into one large component.

Keep:

Feature data
Icons
Animation logic
UI structure

properly separated where appropriate.

The feature content should be data-driven so that additional benefits can be added later without rewriting the component.

Avoid unnecessary global state.

Do not create unnecessary global variables.

Do not duplicate the feature markup manually when a reusable data structure can handle it.

18. Important Design Constraint

This section should not compete with the Courses Offered section above it.

The Courses section is conversion-focused.

This section is trust and value-focused.

Therefore, keep this section visually lighter.

The user should scroll from:

Courses Offered

↓

Why Choose KSOU Online?

↓

Immediately understand why KSOU Online is worth considering without being overwhelmed by text.

19. Final Quality Check

After implementation:

Run the Vite development server locally.
Check the section on desktop.
Check tablet responsiveness.
Check multiple mobile widths.
Verify the marquee loops seamlessly.
Verify there is no page-level horizontal overflow.
Verify hover interaction.
Verify touch/swipe behaviour.
Verify reduced-motion behaviour.
Check typography, spacing, alignment, and visual hierarchy.
Fix any console errors or warnings.
Ensure the implementation matches the existing KSOU Online design system.

Do not proceed to the next website section. Only implement and refine this “Why Choose KSOU Online?” section.