# 01. Analyze Current Landing Page Structure and Components

meta:
  id: minimalist-landing-page-01
  feature: minimalist-landing-page
  priority: P1
  depends_on: []
  tags: [analysis, documentation]

objective:
- Document the current landing page structure and identify components to keep, modify, or remove for minimalist design

deliverables:
- Analysis document of current structure
- List of components to keep/remove
- Identification of redundant elements

steps:
- ✅ Examine the current routes/index.tsx file structure
- ✅ Review existing components (Button, MobileMenu, LanguageSwitcher, DarkModeToggle, TestimonialsCarousel, ProductShowcaseCarousel)
- ✅ Analyze current sections: header, hero, features, testimonials, product showcase, footer
- ✅ Identify which elements align with minimalist requirements (language, login, about, contact, Google Maps comments)
- ✅ Document current styling approach and complexity

tests:
- ✅ Unit: Verify analysis covers all current components and sections
- ✅ Integration: Ensure identified components are correctly categorized for minimalist approach
- ✅ Visual: Confirm current styling patterns are documented

acceptance_criteria:
- ✅ Complete analysis of current landing page structure
- ✅ Clear categorization of components to keep, modify, or remove
- ✅ Documentation of current styling patterns that need simplification

validation:
- ✅ Review analysis document against actual code structure
- ✅ Verify all components are accounted for in the categorization

## Current Structure Analysis

### Main Components (routes/index.tsx)
- **Header**: Complex with gradient background, multiple navigation links, logo, mobile menu
- **Hero Section**: Large with gradients, animations, complex CTA buttons
- **Features Section**: 3-column grid with emoji icons and descriptions
- **Testimonials Section**: Uses TestimonialsCarousel component with auto-advance
- **Product Showcase Section**: Uses ProductShowcaseCarousel component with product cards
- **Footer**: 3-column layout with newsletter signup form

### Island Components Analysis
- **LanguageSwitcher**: ✅ KEEP - Simple PT/EN toggle, already minimalist
- **DarkModeToggle**: ❌ REMOVE - Not needed for minimalist design
- **MobileMenu**: ❌ REMOVE - Simplify navigation instead
- **TestimonialsCarousel**: 🔄 MODIFY - Convert to Google Maps style, remove auto-advance
- **ProductShowcaseCarousel**: ❌ REMOVE - Not in minimalist requirements

### Components to Keep (Minimalist Requirements)
- ✅ LanguageSwitcher - Already well-designed
- ✅ User authentication logic - Simplify UI only
- ✅ Basic navigation structure - Simplify to essential links only
- ✅ Testimonials - Redesign as Google Maps style cards

### Components to Remove
- ❌ DarkModeToggle - Adds complexity not needed for minimalist design
- ❌ MobileMenu - Simplify to basic responsive navigation
- ❌ ProductShowcaseCarousel - Products not in minimalist requirements
- ❌ Complex hero section with gradients and animations
- ❌ Features section with 3-column grid
- ❌ Newsletter signup in footer
- ❌ Complex footer with multiple columns

### Sections to Simplify
- **Header**: Remove gradient, simplify to logo + language + login only
- **Hero**: Replace with simple title and minimal content
- **Footer**: Reduce to simple copyright and essential links only
- **Navigation**: Keep only About and Contact links

### Current Styling Issues
- Complex gradient backgrounds (hero, header)
- Multiple animations (bounce, scale, hover effects)
- Dark mode support throughout
- Complex shadow and blur effects
- Multiple color schemes (yellow, blue, red, green)

### Content Structure
- Current locales have 37 translation keys
- Many will be removed (features, showcase, newsletter)
- Need new keys for simplified about/contact sections
- Testimonials content needs adaptation for Google Maps style

## Minimalist Design Plan
1. **Header**: Simple white background, logo, language switcher, login button
2. **Main Content**: About section, Contact section, Google Maps testimonials
3. **Footer**: Simple copyright, minimal links
4. **Color Palette**: Reduce to black, white, gray, single accent color
5. **Typography**: Clean, minimal hierarchy
6. **Spacing**: Generous whitespace between sections