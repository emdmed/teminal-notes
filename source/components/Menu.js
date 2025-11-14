import React from 'react';
import {Box, Text} from 'ink';
import SelectInput from 'ink-select-input';

const Menu = ({onSelect}) => {
	const items = [
		{
			label: '📝 Add Note',
			value: 'add',
		},
		{
			label: '📋 View Notes',
			value: 'view',
		},
		{
			label: '🗑️  Delete Note',
			value: 'delete',
		},
		{
			label: '🚪 Exit',
			value: 'exit',
		},
	];

	return (
		<Box flexDirection="column" padding={1}>
			<Box marginBottom={1}>
				<Text bold color="cyan">
					Terminal Notes
				</Text>
			</Box>
			<Box marginBottom={1}>
				<Text dimColor>Use arrow keys to navigate, Enter to select</Text>
			</Box>
			<SelectInput items={items} onSelect={onSelect} />
		</Box>
	);
};

export default Menu;
