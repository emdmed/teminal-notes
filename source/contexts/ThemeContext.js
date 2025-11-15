import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTheme } from '../utils/themes.js';
import { loadConfig, saveConfig, loadThemes } from '../storage.js';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [themeName, setThemeName] = useState('default');
	const [colors, setColors] = useState(getTheme('default'));
	const [allThemes, setAllThemes] = useState({});

	// Load theme from config on mount and cache all themes
	useEffect(() => {
		const themes = loadThemes();
		setAllThemes(themes);

		const config = loadConfig();
		if (config.theme && themes[config.theme]) {
			setThemeName(config.theme);
			setColors(themes[config.theme]);
		} else {
			// Fallback to default if configured theme doesn't exist
			setColors(themes.default);
		}
	}, []);

	const changeTheme = (newThemeName) => {
		// Use cached themes instead of calling getTheme which reads from disk
		const themeColors = allThemes[newThemeName] || allThemes.default;
		setThemeName(newThemeName);
		setColors(themeColors);
		saveConfig({ theme: newThemeName });
	};

	return (
		<ThemeContext.Provider value={{ colors, themeName, setTheme: changeTheme, allThemes }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within ThemeProvider');
	}
	return context;
}
