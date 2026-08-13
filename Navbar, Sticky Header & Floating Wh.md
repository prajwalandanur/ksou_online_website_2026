Navbar, Sticky Header & Floating WhatsApp Updates

Make the following updates to the existing KSOU Online website without changing the established design system, typography, colours, spacing, animations, or overall UI/UX.

1. Add “Apply Now/Login” next to LMS Login

Add a second CTA button in the main navbar, positioned immediately next to the existing LMS Login button.

Button text:
Apply Now / Login →

Keep the same arrow style used in the LMS Login button.

Use a different complementary colour for this button instead of the existing light blue. It should still fit the KSOU Online visual identity and look premium.

Desktop

Increase the overall width of the navbar slightly so that:

Home | About Us | Programmes | Announcements | Contact Us | Prospectus | Academic Planner | Apply Now/Login | LMS Login

all fit comfortably without wrapping or creating cramped spacing.

Do not allow any navbar item to move onto a second line.

Mobile

Both buttons must remain visible:

Apply Now / Login
LMS Login

Reduce their width, height, font size, and horizontal padding appropriately for mobile so they fit comfortably alongside each other.

Do not hide either CTA on mobile.

2. Sticky Navbar Behaviour

The website currently has three horizontal layers:

Top utility bar containing language and phone numbers
Main navigation bar
Announcement/ticker bar

Keep all three visible when the user is at the top of the homepage.

However, once the user starts scrolling down, change the behaviour on both desktop and mobile.

Only the main navigation bar (second bar) should remain sticky.

The top utility bar and announcement ticker should scroll away naturally.

Sticky navbar requirements

When scrolling:

Main navbar should remain fixed/sticky at the very top
Top utility bar should disappear
Announcement ticker should disappear
Main navbar should occupy the topmost position
There must be no gap above it
There must be no thin line, white strip, transparent space, or visible opening above the navbar
The navbar should look physically attached to the top edge of the viewport

The current implementation has a small visible gap/line above the sticky navbar while scrolling. Remove this completely.

The transition should be smooth and stable without:

Flickering
Jumping
Layout shifts
Re-render flashes
Multiple navbar layers appearing/disappearing rapidly

Use a proper sticky/fixed-header implementation rather than repeatedly mounting/unmounting separate navbar components.

3. Improve Floating WhatsApp Button

Update the existing floating WhatsApp control.

Instead of having only a small circular WhatsApp icon floating near the right side, create a compact rectangular WhatsApp contact pill attached to the extreme right edge of the viewport.

Structure it like:

[ WhatsApp Icon ] [ Chat ]

The entire component should visually feel like one connected button.

Position
Fixed to the right edge
Vertically positioned around the middle-right portion of the screen
Always visible while scrolling
Attached flush to the right edge
No unnecessary gap between the button and viewport edge
Design

Use:

WhatsApp icon
Text: Chat
Rounded left corners
Right edge flush with the screen
Appropriate KSOU/WhatsApp green
Subtle shadow
Compact dimensions

The button should remain unobtrusive and should not cover important content.

On mobile, reduce its size appropriately while keeping both the WhatsApp icon and Chat visible.

Clicking anywhere on this control should open WhatsApp for:

+91 97407 40340

4. KSOU Logo / Title Should Return to Homepage Top

On the homepage, clicking the KSOU Online logo or title in the navbar should always take the user to the very beginning of the homepage.

If the user is currently halfway down the homepage and clicks:

KSOU Online logo/title

the page should smoothly scroll back to the beginning of the hero section.

Do not simply reload the page unnecessarily.

Use smooth scrolling where possible.

The expected behaviour is:

Scroll down → Click KSOU Online logo → Smoothly return to Hero section

If already at the top, clicking the logo should simply keep the user at the top without any noticeable movement.

Make sure this behaviour does not interfere with normal navigation when the logo is used from other internal pages.