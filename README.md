# Color Tools

A VSCode extension for working with color codes in CSS and SCSS files. Quickly replace selected hex and RGB color codes with custom values using a convenient keybinding.

## Features

- **Color Code Replacement**: Select any hex or RGB color code and replace it with a custom value
- **Smart Detection**: Automatically detects valid hex (`#fff`, `#ffffff`, `#ffffff`) and RGB (`rgb(255,0,0)`) color codes
- **File Type Restriction**: Only works in CSS and SCSS files to prevent accidental usage
- **Keyboard Shortcut**: Quick access with `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (macOS)

## Usage

1. Open a CSS or SCSS file
2. Select a color code (e.g., `#ff0000`, `rgb(255, 0, 0)`)
3. Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on macOS)
4. The selected color will be replaced with your custom value

### Supported Color Formats

- **Hex Colors**: `#fff`, `#ffffff`
- **RGB Colors**: `rgb(255, 255, 255)`

## Keybindings

| Command            | Keybinding (Windows/Linux) | Keybinding (macOS) | When                |
| ------------------ | -------------------------- | ------------------ | ------------------- |
| Replace Color Code | `Ctrl+Shift+R`             | `Cmd+Shift+R`      | CSS/SCSS files only |

## Requirements

- Visual Studio Code 1.103.0 or higher
- CSS or SCSS files for the extension to work

## Extension Settings

This extension does not contribute any VS Code settings at this time.

## Release Notes

### 0.0.1

Initial release of Color Tools extension with basic color code replacement functionality.
