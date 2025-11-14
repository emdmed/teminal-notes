import React, {useState} from 'react';
import {Box, Text} from 'ink';
import SelectInput from 'ink-select-input';

const DeleteNote = ({notes, onDelete, onBack}) => {
	const [selectedNoteId, setSelectedNoteId] = useState(null);
	const [showConfirmation, setShowConfirmation] = useState(false);

	if (notes.length === 0) {
		return (
			<Box flexDirection="column" padding={1}>
				<Box marginBottom={1}>
					<Text bold color="cyan">
						Delete Note
					</Text>
				</Box>
				<Box marginBottom={1}>
					<Text color="yellow">No notes to delete.</Text>
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

	if (!showConfirmation) {
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
				setSelectedNoteId(item.value);
				setShowConfirmation(true);
			}
		};

		return (
			<Box flexDirection="column" padding={1}>
				<Box marginBottom={1}>
					<Text bold color="cyan">
						Delete Note
					</Text>
				</Box>
				<Box marginBottom={1}>
					<Text dimColor>Select a note to delete</Text>
				</Box>
				<SelectInput items={items} onSelect={handleSelect} />
			</Box>
		);
	}

	// Confirmation screen
	const selectedNote = notes.find(note => note.id === selectedNoteId);
	const confirmItems = [
		{
			label: '✓ Yes, delete it',
			value: 'yes',
		},
		{
			label: '✗ No, cancel',
			value: 'no',
		},
	];

	const handleConfirm = item => {
		if (item.value === 'yes') {
			onDelete(selectedNoteId);
		} else {
			setShowConfirmation(false);
			setSelectedNoteId(null);
		}
	};

	return (
		<Box flexDirection="column" padding={1}>
			<Box marginBottom={1}>
				<Text bold color="red">
					Confirm Deletion
				</Text>
			</Box>
			<Box marginBottom={1}>
				<Text>
					Are you sure you want to delete "{selectedNote?.title}"?
				</Text>
			</Box>
			<Box marginBottom={1}>
				<Text dimColor>This action cannot be undone.</Text>
			</Box>
			<SelectInput items={confirmItems} onSelect={handleConfirm} />
		</Box>
	);
};

export default DeleteNote;
