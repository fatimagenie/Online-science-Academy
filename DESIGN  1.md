---
name: Online Science Academy
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#43474f'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3a5f94'
  primary: '#001e40'
  on-primary: '#ffffff'
  primary-container: '#003366'
  on-primary-container: '#799dd6'
  inverse-primary: '#a7c8ff'
  secondary: '#705d00'
  on-secondary: '#ffffff'
  secondary-container: '#fcd400'
  on-secondary-container: '#6e5c00'
  tertiary: '#1b1f20'
  on-tertiary: '#ffffff'
  tertiary-container: '#303436'
  on-tertiary-container: '#999c9e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1f477b'
  secondary-fixed: '#ffe16d'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  button:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-gap: 80px
---

## Brand & Style
The design system is engineered to project a balance of institutional authority and modern educational energy. The target audience includes students seeking academic improvement and parents looking for reliable, high-quality tutoring. 

The aesthetic blends **Corporate Modern** structure with **High-Contrast Bold** accents. It utilizes expansive white space to ensure clarity of information, punctuated by dense blocks of deep navy to establish trust. The "vibrant" aspect is achieved through strategic use of bright yellow, which acts as a visual catalyst for action and highlights. The emotional response is intended to be one of "confident momentum"—the feeling that academic success is both structured and exciting.

## Colors
The palette is built on a high-contrast foundation to ensure maximum legibility and professional impact.

- **Primary (#003366):** A deep, scholarly navy used for headers, navigation backgrounds, and primary brand moments. It conveys stability and depth.
- **Secondary/Accent (#FFD700):** A bright, energetic yellow reserved exclusively for high-priority calls to action (CTAs), progress indicators, and critical highlights.
- **Surface/Neutral:** Pure White (#FFFFFF) is the primary canvas for content blocks to maintain a clean "academic" feel. Tertiary Gray (#F8FAFC) is used for subtle section backgrounds to provide soft visual separation.
- **Text:** Deep charcoal (#1E293B) is used for body copy to provide better readability than pure black, while Primary Navy is used for headings.

## Typography
This design system employs a dual-font strategy to optimize for both impact and sustained reading.

**Montserrat** is used for all headings and interactive triggers (buttons). Its geometric, bold nature provides the "marketing aesthetic" required for impact. Headings should utilize tight letter-spacing and heavy weights (600-700).

**Inter** is the workhorse for all body copy, instructional text, and form inputs. Its high x-height and neutral character ensure that educational content remains accessible and easy to digest over long periods of study. 

All typography follows a rhythmic scale, prioritizing vertical rhythm to ensure that even complex lesson descriptions feel organized.

## Layout & Spacing
The layout uses a **Fluid Grid** system based on an 8px square baseline. 

- **Desktop:** A 12-column grid with 24px gutters. Content is housed in a max-width container of 1280px to prevent excessive line lengths.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** 4-column grid with 16px side margins. 

Spacing between sections is generous (80px on desktop) to allow the professional navy and white blocks to "breathe," preventing the UI from feeling cluttered or overwhelming—crucial for a learning environment.

## Elevation & Depth
Depth is handled through **Ambient Shadows** and tonal layering. Since the design style is professional and clean, we avoid heavy gradients.

- **Level 1 (Default):** Flat surfaces with a 1px border (#E2E8F0) for inputs and secondary cards.
- **Level 2 (Hover/Active):** A soft, diffused shadow (0px 10px 15px -3px rgba(0, 51, 102, 0.1)) used for interactive cards and primary buttons to give them a "lifted" feel.
- **Level 3 (Modals/Overlays):** A more dramatic, deep shadow with a slight navy tint to the shadow color to maintain brand harmony.

Visual hierarchy is further enhanced by using the Primary Navy for "heavy" footer and navigation sections, making the main content area feel physically layered on top.

## Shapes
In line with the "modern and approachable" requirement, the design system adopts a **Rounded (Level 2)** shape language, with specific components extending to **Extra Large (xl)**.

- **Standard Components:** Buttons, inputs, and small widgets use a 0.5rem (8px) radius.
- **Feature Containers:** Large cards, testimonial blocks, and image containers use `rounded-xl` (1.5rem / 24px) to soften the professional aesthetic and make the platform feel modern and friendly.
- **Call-to-Action Buttons:** May occasionally use pill-shapes (3rem) for extreme prominence in marketing heroes.

## Components
- **Buttons:** Primary buttons use the Bright Yellow (#FFD700) with Primary Navy text for maximum "pop." Secondary buttons use a Navy outline with a transparent fill.
- **Cards:** Use White backgrounds, `rounded-xl` corners, and Level 1 shadows. Headers within cards should use Montserrat Medium.
- **Input Fields:** Large, 48px height minimum, with a 1px border. On focus, the border transitions to Primary Navy with a subtle 2px glow.
- **Chips/Badges:** Used for subject categories (e.g., "Math," "Physics"). These should use a light tint of the Primary Navy (10% opacity) with Navy text to keep them secondary to the main CTA.
- **Lists:** Learning objectives use custom checkmark icons in Primary Navy to reinforce the "professional" side of the brand.
- **Progress Bars:** Use a neutral gray track with a Bright Yellow fill to show student progress, providing a "vibrant" reward for completion.