// Theme utilities that load from storage

import { loadThemes } from '../storage.js';

export function getTheme(themeName) {
	const themes = loadThemes();
	return themes[themeName] || themes.default;
}

export function getThemeNames() {
	const themes = loadThemes();
	return Object.keys(themes);
}
