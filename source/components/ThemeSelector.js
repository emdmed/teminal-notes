import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { useScreenSize } from '../hooks/useScreenSize.js';
import { useTheme } from '../contexts/ThemeContext.js';
import { getThemeNames } from '../utils/themes.js';

const ThemeSelector = ({ onClose }) => {
	const { height, width } = useScreenSize();
	const { themeName, setTheme, colors } = useTheme();
	const themes = getThemeNames();
	const [selectedIndex, setSelectedIndex] = useState(themes.indexOf(themeName));

	useInput((input, key) => {
		if (key.escape) {
			onClose();
		} else if (key.downArrow || input === 'j') {
			if (selectedIndex < themes.length - 1) {
				setSelectedIndex(selectedIndex + 1);
			}
		} else if (key.upArrow || input === 'k') {
			if (selectedIndex > 0) {
				setSelectedIndex(selectedIndex - 1);
			}
		} else if (key.return) {
			setTheme(themes[selectedIndex]);
			onClose();
		}
	});

	return (
		<Box
			flexDirection="column"
			width={width}
			height={height}
			paddingX={2}
			paddingY={1}
		>
			<Box marginBottom={1}>
				<Text bold color={colors.primary}>
					Select Theme
				</Text>
			</Box>

			<Box flexDirection="column" flexGrow={1}>
				{themes.map((theme, index) => {
					const isSelected = index === selectedIndex;
					const isCurrent = theme === themeName;
					return (
						<Box key={theme} flexDirection="row">
							<Text
								color={colors.primary}
								bold={isSelected}
								inverse={isSelected}
							>
								{" "}{theme}{isCurrent ? ' (current)' : ''}
							</Text>
						</Box>
					);
				})}
			</Box>

			<Box paddingX={1} marginTop={1}>
				<Text dimColor>
					j/k=↓/↑ | Enter=select | ESC=cancel
				</Text>
			</Box>
		</Box>
	);
};

export default ThemeSelector;
