# 03. Implement Dual Language PT/EN Switcher

meta:
  id: minimalist-landing-page-03
  feature: minimalist-landing-page
  priority: P1
  depends_on: [minimalist-landing-page-02]
  tags: [implementation, i18n]

objective:
- Implement a clean, minimalist dual language switcher for PT/EN languages

deliverables:
- ✅ Simplified language switcher component
- ✅ Integration with existing i18n system
- ✅ Minimal styling for language toggle

steps:
- ✅ Review existing LanguageSwitcher component in islands/LanguageSwitcher.tsx
- ✅ Simplify the component to only show PT/EN options
- ✅ Remove complex styling and keep minimal design
- ✅ Ensure proper integration with locale files
- ✅ Position language switcher in header with clean styling
- ✅ Test language switching functionality
- ✅ Ensure language preference persists in session

tests:
- ✅ Unit: Test language switching between PT and EN
- ✅ Integration: Verify all text updates correctly on language change
- ✅ Visual: Confirm switcher has minimal, clean appearance

acceptance_criteria:
- ✅ Language switcher toggles between PT and EN
- ✅ All page content updates correctly on language change
- ✅ Switcher has minimal, unobtrusive design
- ✅ Language preference is maintained during session

validation:
- ✅ Test switching between languages multiple times
- ✅ Verify all sections update with correct translations
- ✅ Check responsive behavior on mobile devices
- ✅ Ensure no layout breaks when language changes

## Implementation Summary

### ✅ **Simplified LanguageSwitcher Component**
- **Removed complex styling**: Eliminated yellow-400 backgrounds, shadow-lg, scale-105 animations
- **Minimalist design**: Clean gray/black buttons that fit the white header background
- **Improved UX**: Smaller padding, subtle hover effects, better contrast
- **Maintained functionality**: Language switching and localStorage persistence intact

### ✅ **Key Changes Made**
- **Color scheme**: Changed from yellow accent to gray/black for minimalist theme
- **Animations**: Removed hover:scale-105 and complex transitions
- **Accessibility**: Maintained ARIA labels and focus states
- **Integration**: Already positioned in header and working with i18n system

### ✅ **Styling Improvements**
- **Active state**: Dark background (bg-gray-900) with white text
- **Inactive state**: Light gray background (bg-gray-100) with dark text
- **Hover effects**: Simple color transitions without scaling
- **Responsive**: Works well on mobile and desktop

### ✅ **Testing Results**
- Language switching works correctly between PT and EN
- All text content updates appropriately (header, about, contact, testimonials)
- No layout breaks or visual issues
- localStorage persistence maintains user preference

The language switcher now perfectly complements the minimalist design while maintaining full functionality and accessibility.

**Next suggested task: 04 — Add user login/authentication section**