Absolutely. Here is the **final consolidated prompt** including the footer changes, social links, prospectus functionality, floating WhatsApp/back-to-top buttons, and the Programs page requirements.

### Final Prompt

Update the existing **KSOU Online website** with the following changes. Preserve the existing design system, typography, colour palette, spacing, animations, responsive behaviour, and overall premium academic aesthetic unless a change below specifically requires modification.

---

## 1. Footer Contact Information

Update the existing footer by adding a dedicated **Get in Touch** column on the right side.

Do **not** use the uploaded reference image itself. Only use the information contained in it.

### Get in Touch

**Address**
Karnataka State Open University
Muktha Gangothri Campus, Mysuru, Karnataka 570006

**General Helpline**
+91 91411 81241
+91 97407 40340
+91 81231 75590

**Email**
[onlineprogramme@ksoumysuru.ac.in](mailto:onlineprogramme@ksoumysuru.ac.in)

Use appropriate Lucide icons:

* `MapPin` for address
* `Phone` for phone numbers
* `Mail` for email

Make every phone number clickable using `tel:` links and make the email clickable using `mailto:`.

### Desktop footer structure

Maintain a balanced structure similar to:

**KSOU Online / Socials | Company | Online Degrees | Resources | Get in Touch**

Do not make the footer excessively wide or crowded.

The contact information should be visually clean, compact, and easy to scan.

### Mobile

Stack the contact information naturally within the footer.

Make sure:

* No horizontal overflow
* No excessively long lines
* Phone numbers remain readable
* Address wraps naturally
* Footer does not become unnecessarily tall

---

# 2. Social Media Links

In the KSOU Online footer, **remove YouTube and LinkedIn completely**.

Keep **only Instagram and Facebook**.

Instagram: [KSOU Online Instagram](https://www.instagram.com/ksou_online?igsh=ZDNlZDc0MzIxNw%3D%3D&utm_source=chatgpt.com)

Facebook: [KSOU Facebook](https://www.facebook.com/karnatakastateopenuniversitymysuru?utm_source=chatgpt.com)

Use only the appropriate Instagram and Facebook icons.

Do not display:

* YouTube
* LinkedIn
* Any other social platforms

The icons should be clickable and open the respective official profiles.

---

# 3. Floating WhatsApp Button

Add a **persistent floating WhatsApp button** throughout the entire website.

This includes:

* Main landing page
* About Us
* Programs page
* Contact Us
* Every individual course page
* All other internal pages

### Position

Place it on the:

**Right side of the viewport, around the middle-right area**

It should be:

* Fixed to the viewport
* Always visible while scrolling
* Floating above the page content
* Responsive on desktop and mobile
* Never positioned so close to the edge that it gets clipped

Use a clean WhatsApp icon with a subtle branded treatment.

### WhatsApp destination

Use:

**+91 97407 40340**

The WhatsApp button should open a WhatsApp conversation with this number.

Do not make the button excessively large.

On mobile, reduce its size while keeping it easily tappable.

---

# 4. Floating Back-to-Top Button

Add another persistent floating button throughout the website.

Its purpose is to take the user directly back to the **beginning of the current page**.

For example:

If the user is on:

**MBA Course Page**

and scrolls to the bottom, clicking the button should take them to the **top/hero section of the MBA page**, not to the homepage.

Similarly:

* About Us → back to top of About Us
* Programs → back to top of Programs
* B.Com → back to top of B.Com
* M.Com → back to top of M.Com
* M.Sc Mathematics → back to top of M.Sc Mathematics
* etc.

### Behaviour

* Fixed to the viewport
* Positioned near the lower-right area
* Use a simple upward arrow such as `ArrowUp`
* Smooth scroll animation
* Only show it after the user has scrolled a reasonable distance
* Hide it again when the user reaches the top

### Important

Do not allow the WhatsApp button and Back-to-Top button to overlap.

Maintain a clean vertical arrangement between both floating controls.

---

# 5. Prospectus Functionality Across All Course Pages

On **every individual course page**, there is a **View Prospectus / View Prospect** option.

Update this functionality so that clicking the button opens the **same prospectus document already provided for the website/project**.

Do not create a fake prospectus or placeholder PDF.

Use the actual prospectus document available in the project.

The behaviour should be:

**View Prospectus → Open the actual prospectus document**

Prefer opening it in a clean new browser tab so the user does not lose their position on the course page.

Make sure this functionality works consistently across **all course pages**.

If the same prospectus applies to multiple courses, use the same document accordingly.

---

# 6. Programs Navigation

When a user clicks:

**Programmes**

in the main navbar, redirect them to a dedicated:

### **Programs / Programmes Page**

Do not leave this as a simple anchor that only scrolls somewhere on the homepage.

Create a proper Programs page.

---

# 7. Programs Page Content

The Programs page should contain the **same course/programme information already displayed on the main landing page**.

Do not create a completely different course database or redesign the programme information from scratch.

Reuse the existing programme data and course cards.

The Programs page should include:

### Undergraduate Programmes

Display all undergraduate programmes currently available on the landing page.

### Postgraduate Programmes

Display all postgraduate programmes currently available on the landing page.

Use the same:

* Course names
* Course images
* Duration
* Eligibility
* Fees
* Existing programme information
* Buttons
* Course links
* Brochure links
* Previous QP links
* Learn More / Apply Now functionality

Keep the information synchronized with the landing page so that there is **one source of truth** for programme data.

---

# 8. Course Card Behaviour on Programs Page

Maintain the existing course-card behaviour.

The **entire card should be clickable** and should take the user to the corresponding detailed course page.

However, exclude interactive buttons that have their own destinations.

For example:

### Clicking:

* Image → Course page
* Course title → Course page
* Course information area → Course page
* Empty/card area → Course page

### But clicking:

* Download Brochure → Brochure
* Previous QPs → Previous QPs document
* View Prospectus → Prospectus
* Apply Now → Application
* Any other dedicated CTA → Its respective destination

must **not trigger the card's course-page navigation**.

Prevent event propagation for these buttons.

---

# 9. Programs Page Design

The Programs page should visually belong to the existing KSOU Online website.

Maintain:

* Existing KSOU blue
* Deep navy typography
* Metallic-gold accents
* Existing heading typography
* Existing card styling
* Existing border-radius system
* Existing shadows
* Existing animations
* Existing responsive behaviour

Create a clear hierarchy:

### Hero / Page Introduction

**Explore KSOU Online Programmes**

Short supporting text explaining that students can explore undergraduate and postgraduate online programmes.

Then:

### Undergraduate Programmes

Course cards

Then:

### Postgraduate Programmes

Course cards

Use appropriate spacing between categories but avoid excessive whitespace.

---

# 10. Responsive Design

Everything above must work properly on:

* Desktop
* Laptop
* Tablet
* Mobile

Pay particular attention to mobile.

The floating WhatsApp and Back-to-Top buttons must remain accessible without covering:

* Course CTAs
* Navigation
* Important text
* Forms
* Footer content

The Programs page should become a clean single-column or appropriate responsive grid on smaller screens.

---

# 11. Global Consistency

These changes should be implemented **globally**, not individually on only one page.

The following should therefore behave consistently everywhere:

**WhatsApp floating button**
→ All pages

**Back-to-top button**
→ All pages

**Footer contact information**
→ All pages

**Instagram + Facebook only**
→ All footer instances

**Prospectus functionality**
→ All course pages

**Programs navigation**
→ Main navbar across the website

Do not create different versions of these components for different pages unless required for responsive behaviour.

---

### Final objective

The finished website should feel like **one cohesive KSOU Online platform**, where users can easily:

**Discover programmes → Open a course → View the prospectus → Apply → Contact KSOU → Return to the top**

while keeping the existing premium design language and avoiding unnecessary UI additions.
