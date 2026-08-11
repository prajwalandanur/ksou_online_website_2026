# KSOU Online Website - Global Development Guidelines

## Project Overview

We are building a premium, enterprise-grade website for **KSOU Online (Karnataka State Open University)**. This is a high-value, production-ready project intended for a government university and must be developed with the same level of quality, maintainability, and engineering standards expected in large-scale commercial applications.

The entire project should follow modern software engineering principles with an emphasis on **clean architecture, scalability, performance, maintainability, accessibility, SEO, and security**.

---

# Technical Requirements

This project must be developed using **React JS** and should follow modern React best practices.

## Tech Stack

- React JS
- Vite
- JavaScript (ES6+)
- Tailwind CSS
- React Router DOM
- Framer Motion (for animations, wherever required)
- Lucide React (for icons)
- Swiper.js (for sliders/carousels)
- React Hook Form (for forms)

---

# Project Structure

```text
src/
│
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── pages/
├── hooks/
├── services/
├── utils/
├── constants/
├── data/
├── routes/
├── styles/
├── context/
├── layouts/
└── App.jsx
```

---

# React Standards

- Use only functional components.
- Use React Hooks throughout the project.
- Keep components modular and reusable.
- Follow the Single Responsibility Principle.
- Avoid unnecessary prop drilling.
- Keep state local whenever possible.
- Avoid unnecessary global state.
- Separate UI, business logic, constants, and utilities.
- Reuse components instead of duplicating code.

---

# Code Quality

- Production-ready code only.
- Clean and readable structure.
- Proper folder organization.
- Consistent naming conventions.
- No duplicated code.
- No unused imports or variables.
- Well-structured components.
- Easy to maintain and extend.
- Use meaningful component, function, and variable names.
- Prefer composition over repetition.
- Keep files organized and easy to maintain.
- Avoid unnecessary complexity.
- Ensure every component is reusable wherever possible.

---

# Performance

- Lazy load pages wherever appropriate.
- Optimize images.
- Optimize rendering performance.
- Prevent unnecessary re-renders.
- Use memoization only when beneficial.
- Optimize images and assets.
- Ensure fast loading times and smooth interactions.
- Build with mobile performance as a priority.
- Maintain excellent Lighthouse scores.

---

# State Management

- Keep state localized whenever possible.
- Avoid unnecessary global state.
- Do not create global variables unless absolutely required.
- Use centralized configuration files for constants, routes, colors, navigation items, and reusable data.
- Ensure data flow remains predictable and easy to maintain.

---

# Security

Since this website belongs to a government university, follow industry-standard secure frontend development practices.

- Never expose sensitive information.
- Do not expose sensitive values in frontend code.
- Sanitize and validate all user inputs before submission.
- Avoid insecure coding patterns.
- Follow secure authentication integration patterns for future LMS connectivity.
- Follow general OWASP frontend best practices where applicable.
- Build components to integrate securely with backend APIs.
- Keep the application architecture clean to support secure backend integration.
- Write maintainable, robust, and production-ready code suitable for enterprise deployment.

---

# SEO & Accessibility

- Use semantic HTML.
- Maintain a proper heading hierarchy.
- Build an SEO-friendly page structure.
- Ensure accessibility through keyboard navigation, appropriate labels, sufficient color contrast, and responsive layouts.
- Leave room for SEO-optimized content based on the provided keyword strategy and checklist.

---

# Design System

The website should follow a consistent premium design system throughout.

- Background: White (#FFFFFF)
- Primary Text: Black (#111111)
- Primary Accent: Blue (#4169E1)
- Use generous whitespace.
- Rounded corners.
- Premium typography.
- Smooth animations.
- Consistent spacing.
- Mobile-first responsive design.
- Elegant, minimal, and trustworthy appearance inspired by the modern Online Manipal website while maintaining a unique identity for KSOU Online.

---

# Development Guidelines

Treat this as a production-grade application rather than a prototype.

Every section should:

- Be modular and independently maintainable.
- Be responsive across all devices.
- Follow the same design language.
- Be easy to extend in the future.
- Maintain consistency across the entire application.
- Prioritize code quality and long-term maintainability over quick implementation.
