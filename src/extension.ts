// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Regular expressions to match hex and RGB color codes
const HEX_COLOR_REGEX = /#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})\b/;
const RGB_COLOR_REGEX = /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(0?\.\d+|1))?\s*\)/;

function isColorCode(text: string): boolean {
	return HEX_COLOR_REGEX.test(text) || RGB_COLOR_REGEX.test(text);
}

function isCssOrScssFile(document: vscode.TextDocument): boolean {
	const languageId = document.languageId;
	return languageId === 'css' || languageId === 'scss';
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "color-tools" is now active!');

	// Register the color replacement command
	const disposable = vscode.commands.registerCommand('color-tools.create-tints', () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showWarningMessage('No active text editor found.');
			return;
		}

		// Check if the file is CSS or SCSS
		if (!isCssOrScssFile(editor.document)) {
			vscode.window.showWarningMessage('This command only works in CSS and SCSS files.');
			return;
		}

		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);

		if (!selectedText) {
			vscode.window.showWarningMessage('No text selected. Please select a hex or RGB color code.');
			return;
		}

		// Check if the selected text is a color code
		if (!isColorCode(selectedText.trim())) {
			vscode.window.showWarningMessage('Selected text is not a valid hex or RGB color code.');
			return;
		}

		// Replace with dummy value - you can modify this part with your actual logic
		const dummyValue = getTints(selectedText);

		editor.edit(editBuilder => {
			editBuilder.replace(selection, '.color {\n\t' + dummyValue.join(';\n\t') + ';\n}');
			// Highlight the word 'color' in '.color'
			const start = selection.start;
			const replacedText = '.color {\n\t' + dummyValue.join(';\n\t') + ';\n}';
			const colorIndex = replacedText.indexOf('color');
			if (colorIndex !== -1) {
				const colorStart = start.translate(0, colorIndex);
				const colorEnd = colorStart.translate(0, 'color'.length);
				// Set the new selection to highlight 'color'
				editor.selection = new vscode.Selection(colorStart, colorEnd);
			}
		}).then(success => {
			if (success) {
				vscode.window.showInformationMessage(`Replaced color code: ${selectedText} → ${dummyValue.join(', ')}`);
			} else {
				vscode.window.showErrorMessage('Failed to replace color code.');
			}
		});
	});

	const complementaryDisposable = vscode.commands.registerCommand('color-tools.create-complementary-tints', () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showWarningMessage('No active text editor found.');
			return;
		}

		// Check if the file is CSS or SCSS
		if (!isCssOrScssFile(editor.document)) {
			vscode.window.showWarningMessage('This command only works in CSS and SCSS files.');
			return;
		}

		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);

		if (!selectedText) {
			vscode.window.showWarningMessage('No text selected. Please select a hex or RGB color code.');
			return;
		}

		// Check if the selected text is a color code
		if (!isColorCode(selectedText.trim())) {
			vscode.window.showWarningMessage('Selected text is not a valid hex or RGB color code.');
			return;
		}

		// Replace with dummy value - you can modify this part with your actual logic
		const dummyValue = getTints(getComplementary(selectedText));

		editor.edit(editBuilder => {
			editBuilder.replace(selection, '.color {\n\t' + dummyValue.join(';\n\t') + ';\n}');
			// Highlight the word 'color' in '.color'
			const start = selection.start;
			const replacedText = '.color {\n\t' + dummyValue.join(';\n\t') + ';\n}';
			const colorIndex = replacedText.indexOf('color');
			if (colorIndex !== -1) {
				const colorStart = start.translate(0, colorIndex);
				const colorEnd = colorStart.translate(0, 'color'.length);
				// Set the new selection to highlight 'color'
				editor.selection = new vscode.Selection(colorStart, colorEnd);
			}
		}).then(success => {
			if (success) {
				vscode.window.showInformationMessage(`Replaced color code: ${selectedText} → ${dummyValue.join(', ')}`);
			} else {
				vscode.window.showErrorMessage('Failed to replace color code.');
			}
		});
	});

	context.subscriptions.push(disposable, complementaryDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }

function getRgb(color: string): [number, number, number] {
	if (color.startsWith('#')) {
		if (color.length === 4) {
			color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
		}
		const r = parseInt(color.slice(1, 3), 16);
		const g = parseInt(color.slice(3, 5), 16);
		const b = parseInt(color.slice(5, 7), 16);
		return [r, g, b];
	} else if (color.startsWith('rgb')) {
		return color.match(/\d+/g)?.map(Number) as [number, number, number];
	}
	return [0, 0, 0]; // Default to black if parsing fails
}

function getTints(color: string): string[] {
	const [r, g, b] = getRgb(color);
	const tints: string[] = [];
	for (let i = -4; i <= 4; i++) {
		const factor = i / 10;
		let newR, newG, newB;
		if (factor < 0) {
			// Tint towards black
			newR = Math.max(0, Math.round(r * (1 + factor)));
			newG = Math.max(0, Math.round(g * (1 + factor)));
			newB = Math.max(0, Math.round(b * (1 + factor)));
		} else {
			// Tint towards white
			newR = Math.min(255, Math.round(r + (255 - r) * factor));
			newG = Math.min(255, Math.round(g + (255 - g) * factor));
			newB = Math.min(255, Math.round(b + (255 - b) * factor));
		}
		const toHex = (n: number) => n.toString(16).padStart(2, '0');
		const hex = `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
		tints.push(hex);
	}
	return tints.map((tint, i) => {
		return `--${(i + 1) * 100}: ${tint}`;
	});
}

function getComplementary(color: string): string {
	const [r, g, b] = getRgb(color);
	const compR = 255 - r;
	const compG = 255 - g;
	const compB = 255 - b;
	const toHex = (n: number) => n.toString(16).padStart(2, '0');
	return `#${toHex(compR)}${toHex(compG)}${toHex(compB)}`;
}
