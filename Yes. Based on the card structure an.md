Yes. Based on the card structure and the fee information you provided, I would change the card hierarchy so the **price becomes a prominent piece of information**, while the two document download actions sit between the course information and the primary CTAs.

Use the following as the **update prompt for Claude Code**:

---

# KSOU Online – Course Card Refinement

Continue working on the existing **Courses Offered** section.

**Do not rebuild the Courses Offered section from scratch.**
Modify the existing course card component and apply the following changes consistently to **every UG and PG course card**.

Maintain the existing KSOU Online design system, premium visual language, responsive behaviour, carousel functionality, typography, spacing, and component architecture.

---

## 1. Remove the Current Information Box

The current card contains:

* Duration
* Eligibility

inside a large two-column information box.

**Remove this existing combined Duration + Eligibility box.**

The card should become more compact and conversion-focused.

---

# 2. Course Card Structure

The final card should follow this hierarchy:

```text
┌─────────────────────────────┐
│                             │
│       COURSE IMAGE          │
│                             │
├─────────────────────────────┤
│                             │
│ Course Name                 │
│                             │
│ Short Course Description    │
│                             │
│ Duration / Course Info      │
│                             │
│ Course Fee                  │
│                             │
├─────────────────────────────┤
│  Download Brochure          │
│  Previous QPs Download      │
├─────────────────────────────┤
│  Learn More   |  Apply Now  │
└─────────────────────────────┘
```

The spacing between each layer should be intentional and premium.

Do not make the card feel crowded.

---

# 3. Course Title

Keep the course title prominent.

Example:

**Master of Commerce**

Use the established premium display typography.

The course title should be immediately understandable on mobile as well as desktop.

---

# 4. Course Description

Keep a **short one-line or maximum two-line description** below the course title.

Do not introduce long paragraphs.

The description should communicate the primary value or academic focus of the course.

Example:

> Deepen your expertise in commerce, finance, and business policy.

Maintain consistent description lengths across cards wherever possible.

---

# 5. Course Information

Replace the previous large Duration + Eligibility box with a more compact information area.

Display the relevant course duration.

Example:

**Duration**
4 Semesters

Keep this visually clean and compact.

Do not allow the information area to dominate the card.

---

# 6. Course Fee

Add the **course fee directly below the duration/course information and above the document download buttons**.

The fee should be clearly visible.

Use the appropriate fee for each individual programme.

The following fee values should be reflected in the course cards:

### B.A.

* Semester I: ₹10,000
* Semester II: ₹10,000
* Semester III: ₹10,000

### B.Com

* Semester I: ₹12,000
* Semester II: ₹12,000
* Semester III: ₹12,000

### M.A.

* Semester I: ₹15,000
* Semester II: ₹15,000

### M.Com

* Semester I: ₹20,000
* Semester II: ₹20,000

### M.B.A.

* Semester I: ₹40,000
* Semester II: ₹40,000

### M.Sc. Mathematics

* Semester I: ₹40,000
* Semester II: ₹40,000

Do not display unnecessary fee-table details inside the homepage card.

The homepage card should communicate the fee simply and clearly.

For example:

**Course Fee**
₹20,000 / Semester

Use the appropriate value for each course.

---

# 7. Two New Download Buttons

Add **two new buttons** between the course information/fee area and the existing Learn More / Apply Now buttons.

The buttons should be:

### Button 1

**Download Brochure**

Include an appropriate download/brochure icon.

---

### Button 2

**Previous QPs Download**

Use an appropriate download/document icon.

These buttons should allow users to understand that they can access programme information and previous question papers.

For now, these can use placeholder links/actions where the actual files are not yet connected.

---

# 8. Button Design

The two new download buttons must use the **same visual design language as the existing Learn More and Apply Now buttons**.

However, they should remain secondary actions.

Recommended hierarchy:

### Download Brochure

Secondary / outlined button.

### Previous QPs Download

Secondary / outlined button.

### Learn More

Secondary / outlined button.

### Apply Now

Primary blue button.

The Apply Now button should remain the strongest CTA inside the card.

---

# 9. Button Layout

On desktop, maintain a clean two-column layout where appropriate.

For example:

```text
┌─────────────────────────────────────     ┐
│ Brochure (download icon) Previous QPs(Download icon) │
│                                                      │
│ Learn More   					        Apply Now       │
└─────────────────────────────┘
```

Do not allow buttons to become cramped.

All buttons should have consistent:

* Height
* Border radius
* Typography
* Padding
* Icon alignment
* Hover animation

---

# 10. Mobile Behaviour

The card must remain comfortable to use on mobile.

Do not allow the four buttons to become extremely narrow.

Maintain clear touch targets.

The course card should work naturally inside the existing horizontal mobile carousel.

Users should be able to:

* Swipe between courses
* Tap Download Brochure
* Tap Previous QPs Download
* Tap Learn More
* Tap Apply Now

without accidental clicks.

---

# 11. Visual Hierarchy

The card should now have the following priority:

**1. Course Image**

↓

**2. Course Name**

↓

**3. Short Description**

↓

**4. Duration**

↓

**5. Course Fee**

↓

**6. Download Brochure / Previous QPs**

↓

**7. Learn More / Apply Now**

The **Apply Now** CTA should remain the most visually prominent interactive element.

---

# 12. Keep Existing Carousel Behaviour

Do not remove or change the existing course carousel functionality.

Desktop:

* Multiple cards displayed side by side.

Mobile:

* Horizontal swipeable cards.
* Previous / next navigation.
* Automatic scrolling approximately every 5 seconds.
* Pause when the user interacts.
* Resume afterwards.

The card modifications must work seamlessly within the existing carousel.

---

# 13. Maintain Premium Appearance

The current card should feel more like a **premium university programme card**, rather than a generic SaaS/product card.

Maintain:

* White card background
* Soft border
* Subtle shadow
* Premium rounded corners
* Generous whitespace
* High-quality course imagery
* Blue `#4169E1` as the primary CTA colour
* Black `#111111` primary text
* Muted secondary text
* Subtle hover animations

Avoid excessive borders, colours, icons, or decorative elements.

The card should feel clean even with the additional two buttons.

---

# 14. Important Implementation Requirement

Make these changes at the **reusable course-card component level**.

Do not manually modify individual cards one by one.

All course cards must inherit the same structure while receiving their own:

* Course name
* Image
* Description
* Duration
* Fee
* Course-specific data

This ensures the component remains scalable when additional KSOU programmes are added later.

---

# 15. Final Validation

After implementing the changes:

1. Run the Vite development server.
2. Check the Courses Offered section locally.
3. Verify every course card uses the new structure.
4. Verify the correct fee appears for each programme.
5. Check desktop layout.
6. Check tablet layout.
7. Check mobile carousel behaviour.
8. Check that all four buttons are properly aligned.
9. Check that the card does not become excessively tall or visually cluttered.
10. Fix any overflow, spacing, typography, or responsiveness issues.
11. Ensure there are no console errors or unnecessary warnings.

Do not modify any other website section.

The goal is to make the **Courses Offered cards cleaner, more informative, more conversion-focused, and significantly more premium** while preserving the existing KSOU Online design system.
