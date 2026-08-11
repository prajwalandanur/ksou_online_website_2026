KSOU Online Website – Section 3: Courses Offered
Continue Existing Project

Continue working on the existing KSOU Online website.

Do not modify any previously built sections.

Implement only the Courses Offered section while maintaining complete consistency with the established design system, architecture, typography, spacing, responsiveness, animations, and engineering standards.

Required Skills

Before implementation, use the following installed skills throughout development:

ui-ux-pro-max
react-expert
frontend-design

These skills should guide every design, engineering, accessibility, responsiveness, and UI decision.

Objective

The Courses Offered section is the primary discovery section of the website.

Its purpose is to help visitors quickly understand the programmes offered and encourage them to either:

Apply immediately.
Learn more about a specific course.

The design should remain premium, minimal, and conversion-focused while supporting strong SEO.

SEO Strategy

Do not use tabs or filters such as UG / PG.

Instead, create two independent sections.

This approach improves:

Crawlability
SEO
Mobile usability
Content visibility

The entire content should remain visible as users scroll.

Section Structure

Create two course categories.

Section 1
Title

Online Undergraduate Programmes

Display all UG courses here.

Section 2
Title

Online Postgraduate Programmes

Display all PG courses here.

Both sections should follow the same design language.

Course Data

The PDF previously provided contains the complete list of courses.

Use that PDF as the source for:

Course names
Course categories
Short descriptions

Do not invent course names.

The course detail pages will be implemented later.

For now, only create the homepage cards.

Card Layout

Each course should be displayed inside a premium card.

Card Structure:

Upper Half (Approx. 50%)

Large featured course image.

Maintain consistent aspect ratio.

Rounded top corners.

Image should dominate the upper portion of the card.

Lower Half

Below the image display:

Course Name

Large.

Bold.

Premium typography.

Short Description

One concise line describing the programme.

Use content from the provided course information.

Information Row

Create two equally sized information boxes.

Left

Duration

Right

Eligibility

These should be visually separated with subtle dividers.

Action Row

Create two equally sized buttons.

Left

Learn More

For now:

This button should be a placeholder.

Do not implement navigation yet.

Later, each course will redirect to its own dedicated SEO-optimized page.

Right

Apply Now

Use the primary Royal Blue button style.

Grid Layout

Desktop

Display multiple cards side by side using a responsive grid.

Spacing should remain generous.

Tablet

Automatically adjust the number of columns.

Mobile

Do not stack cards vertically.

Instead:

Create a premium horizontal carousel.

Requirements:

Swipe support
Previous and Next arrows
Auto-scroll every 5 seconds
Pause while user interacts
Resume autoplay afterward
Smooth animations
Premium transitions

The carousel should feel similar to modern product showcases found on premium SaaS websites.

Card Design

The cards should feel premium.

Use:

White background
Large border radius
Soft shadows
Thin borders
Spacious padding
Elegant hover animations
Consistent image sizes

Avoid clutter.

Typography

Continue using the global typography system.

Headings:

Canela (or Cormorant Garamond fallback)

Card Content:

Satoshi

Buttons:

Satoshi SemiBold

Maintain a strong visual hierarchy.

Future Routing

Each course will eventually have its own dedicated page.

For now:

The Learn More button should remain a placeholder.

Do not implement routing yet.

The routing and SEO-optimized course pages will be developed in a later section.

Responsiveness

Ensure perfect responsiveness across:

Desktop
Laptop
Tablet
Mobile

The mobile carousel should be smooth and intuitive.

Accessibility

Follow accessibility best practices.

Ensure:

Semantic HTML
Keyboard navigation
Proper button labels
ARIA attributes where required
High contrast
Responsive typography
Code Expectations

Write production-ready React code.

Ensure:

Modular components
Reusable card component
Reusable carousel component
Clean folder organization
Excellent performance
No duplicated code
Easy maintainability
Enterprise-grade quality
Deliverable

Implement only the Courses Offered section.

Do not begin the next section.

Development Workflow

After implementation:

Run the project locally using the Vite development server.
Verify there are no build errors or console warnings.
Test the course grids and mobile carousel on desktop, tablet, and mobile.
Validate spacing, typography, responsiveness, hover states, and animations.
Continue refining the section until it achieves the same premium quality as the rest of the KSOU Online website.

Do not stop after the first implementation. Continue iterating until the Courses Offered section feels polished, premium, highly usable, and production-ready.