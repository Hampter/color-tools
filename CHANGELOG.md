# Change Log

All notable changes to the "color-tools" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.2] - 2025-08-09

### Added

- Color tint generation with 9 variations (from darker to lighter shades)
- Complementary color tint generation
- CSS custom property output format with `--` prefix
- VS Code snippet integration with tab stops for easy navigation
- Multi-cursor variable name editing - all variable names selected simultaneously
- Support for hex color formats (`#fff`, `#ffffff`, `#ffaabb`)
- Support for RGB color formats (`rgb(255, 255, 255)`, `rgba(255, 255, 255, 0.5)`)
- File type restriction to CSS and SCSS files only
- Smart color code detection using regex patterns

### Features

- `color-tools.create-tints` command - Generate tint variations of selected color
- `color-tools.create-complementary-tints` command - Generate complementary color tints
- Tab navigation: First tab stop selects all variable names, second tab stop moves to end of block
- Automatic color validation and user-friendly error messages

## [0.0.1] - Initial

### Added

- Initial project setup
- Basic extension structure
