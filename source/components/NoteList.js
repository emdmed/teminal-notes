import React from 'react';
import {Box, Text} from 'ink';
import SelectInput from 'ink-select-input';

const NoteList = ({notes, onSelect, onBack}) => {
	if (notes.length === 0) {
		return (
			<Box flexDirection="column" padding={1}>
				<Box marginBottom={1}>
					<Text bold color="cyan">
						View Notes
					</Text>
				</Box>
				<Box marginBottom={1}>
					<Text color="yellow">No notes found.</Text>
				</Box>
				<Box>
					<Text dimColor>Press ESC to go back to menu</Text>
				</Box>
			</Box>
		);
	}

	const formatDate = dateString => {
		const date = new Date(dateString);
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	};

	const items = notes.map(note => ({
		label: `${note.title} (${formatDate(note.createdAt)})`,
		value: note.id,
	}));

	// Add back option
	items.push({
		label: '← Back to Menu',
		value: '__back__',
	});

	const handleSelect = item => {
		if (item.value === '__back__') {
			onBack();
		} else {
			onSelect(item.value);
		}
	};

	return (
		<Box flexDirection="column" padding={1}>
			<Box marginBottom={1}>
				<Text bold color="cyan">
					View Notes ({notes.length})
				</Text>
			</Box>
			<Box marginBottom={1}>
				<Text dimColor>Select a note to view details</Text>
			</Box>
			<SelectInput items={items} onSelect={handleSelect} />
		</Box>
	);
};

export default NoteList;
