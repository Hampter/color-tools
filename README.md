# Color Tools

A VSCode extension for generating CSS custom properties (CSS variables) from color codes in CSS and SCSS files. Automatically create color tints and complementary color schemes with convenient tab stops for easy customization.

## Features

- **Generate Color Tints**: Select any hex or RGB color code and generate 9 tint variations as CSS custom properties
- **Complementary Color Tints**: Generate tint variations of the complementary color
- **Smart Snippet Integration**: Uses VS Code snippets with tab stops for easy variable naming
- **Multi-cursor Editing**: All variable names are selected simultaneously for batch editing
- **Tab Navigation**: Press Tab to move to the end of the generated code block
- **Smart Detection**: Automatically detects valid hex (`#fff`, `#ffffff`, `#ffaabb`) and RGB (`rgb(255,0,0)`) color codes
- **File Type Restriction**: Only works in CSS and SCSS files to prevent accidental usage

## Usage

### Generate Color Tints

1. Open a CSS or SCSS file
2. Select a color code (e.g., `#ff0000`, `rgb(255, 0, 0)`)
3. Use the "Create Tints" command
4. The color will be replaced with 9 CSS custom properties with tint variations
5. All variable names are selected - type to rename them all at once or press Tab to keep defaults
6. Press Tab again to move to the end of the code block

### Generate Complementary Color Tints

1. Open a CSS or SCSS file
2. Select a color code (e.g., `#ff0000`, `rgb(255, 0, 0)`)
3. Use the "Create Complementary Tints" command
4. The extension will calculate the complementary color and generate tint variations

### Example Output

Selecting `#3366cc` and running "Create Tints" generates:

```css
---100: #1a4d99;
---200: #2d5fb3;
---300: #3366cc;
---400: #5580d6;
---500: #7799e0;
---600: #99b3ea;
---700: #bbccf4;
---800: #dde6fe;
---900: #ffffff;
```

The variable names (100, 200, 300, etc.) are automatically selected across all lines, allowing you to type once to rename all variables simultaneously. For example, typing "primary" would change all lines to use "primary" as the variable name.

### Supported Color Formats

- **Hex Colors**: `#fff`, `#ffffff`, `#ffaabb`
- **RGB Colors**: `rgb(255, 255, 255)`, `rgba(255, 255, 255, 0.5)`

## Commands

| Command                                  | Description                                         |
| ---------------------------------------- | --------------------------------------------------- |
| `color-tools.create-tints`               | Generate tint variations of the selected color      |
| `color-tools.create-complementary-tints` | Generate tint variations of the complementary color |

## Requirements

- Visual Studio Code 1.103.0 or higher
- CSS or SCSS files for the extension to work

## Installation

1. Install the extension from the VS Code marketplace
2. Reload VS Code if necessary
3. Open a CSS or SCSS file and start using the commands

## Extension Settings

This extension does not contribute any VS Code settings at this time. You can assign custom keybindings to the commands through VS Code's keyboard shortcuts settings.

## Release Notes

### 0.0.2

Current release of Color Tools extension featuring:

- Color tint generation with 9 variations (from darker to lighter)
- Complementary color tint generation
- CSS custom property output format
- Snippet-based editing with tab stops
- Multi-cursor variable name editing
- Support for hex and RGB color formats

### 0.0.1

Initial release with basic functionality.
