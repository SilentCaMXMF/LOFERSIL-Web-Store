# 08. Update Locale Files for New Content

meta:
  id: minimalist-landing-page-08
  feature: minimalist-landing-page
  priority: P1
  depends_on: [minimalist-landing-page-07]
  tags: [implementation, i18n]

objective:
- Update English and Portuguese locale files with new minimalist content

deliverables:
- ✅ Updated en.json with new minimalist content
- ✅ Updated pt.json with new minimalist content
- ✅ All new sections properly translated
- ✅ Consistent terminology across languages

steps:
- ✅ Review current locale files structure
- ✅ Add translations for new about section content
- ✅ Add translations for contact section content
- ✅ Add translations for Google Maps testimonials
- ✅ Add translations for new minimalist UI elements
- ✅ Remove translations for removed sections
- ✅ Ensure consistent terminology and tone
- ✅ Validate JSON syntax for both files

tests:
- ✅ Unit: Test JSON syntax validation for both locale files
- ✅ Integration: Verify all new content displays correctly in both languages
- ✅ Visual: Confirm translations are appropriate and complete

acceptance_criteria:
- ✅ All new content has proper PT/EN translations
- ✅ Removed content translations are cleaned up
- ✅ JSON files are valid and properly formatted
- ✅ No missing translation keys
- ✅ Consistent terminology across both languages

validation:
- ✅ Test language switching with all new content
- ✅ Verify no missing translation errors
- ✅ Check JSON syntax with linter
- ✅ Ensure proper escaping of special characters

## Implementation Summary

### ✅ **Locale Files Cleaned and Updated**
- **Removed unused keys**: Eliminated translations for removed sections (hero, features, showcase, newsletter, etc.)
- **Added new translations**: Complete coverage for about, contact, and testimonials sections
- **No duplicates**: Removed duplicate keys and ensured unique entries
- **Valid JSON**: Both files are properly formatted and syntactically correct

### ✅ **English Translations (en.json)**
- **Essential keys only**: 35 keys total, focused on minimalist content
- **About section**: 8 keys covering title, description, core values, and mission
- **Contact section**: 10 keys for form labels, placeholders, and contact info
- **Testimonials**: 7 keys for reviews, names, and roles
- **Navigation & SEO**: Maintained essential navigation and meta tags

### ✅ **Portuguese Translations (pt.json)**
- **Cultural adaptation**: Professional translations with appropriate Portuguese terminology
- **Consistent structure**: Same key structure as English for easy maintenance
- **Business tone**: Maintained formal, professional language throughout
- **Complete coverage**: All new sections fully translated with no missing keys

### ✅ **Quality Improvements**
- **Terminology consistency**: Standardized terms like "Contact" vs "Contact Us" across both languages
- **Concise content**: Translations are brief and align with minimalist design philosophy
- **Professional tone**: Business-appropriate language in both PT and EN
- **Proper escaping**: All special characters properly handled in JSON

### ✅ **Integration Results**
- **Language switching**: All content updates correctly between PT/EN
- **No missing keys**: All translation keys are defined and accessible
- **Performance**: Minimal file sizes with only essential translations
- **Maintainability**: Clean, organized structure for future updates

The locale files are now optimized for the minimalist landing page, with complete bilingual support and no unnecessary content.

**Next suggested task: 09 — Apply minimalist styling and responsive design**