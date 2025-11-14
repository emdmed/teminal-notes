import React from 'react';
import {Box, Text} from 'ink';

const NoteViewer = ({note, onBack}) => {
	if (!note) {
		return (
			<Box flexDirection="column" padding={1}>
				<Box marginBottom={1}>
					<Text color="red">Note not found.</Text>
				</Box>
				<Box>
					<Text dimColor>Press ESC to go back</Text>
				</Box>
			</Box>
		);
	}

	const formatDate = dateString => {
		const date = new Date(dateString);
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	};

	return (
		<Box flexDirection="column" padding={1}>
			<Box marginBottom={1}>
				<Text bold color="cyan">
					{note.title}
				</Text>
			</Box>

			<Box marginBottom={1} flexDirection="column">
				<Text dimColor>Created: {formatDate(note.createdAt)}</Text>
				<Text dimColor>Updated: {formatDate(note.updatedAt)}</Text>
			</Box>

			<Box
				marginBottom={1}
				paddingTop={1}
				paddingBottom={1}
				borderStyle="single"
				borderColor="gray"
				flexDirection="column"
			>
				<Text>{note.content}</Text>
			</Box>

			<Box>
				<Text dimColor>Press ESC to go back</Text>
			</Box>
		</Box>
	);
};

export default NoteViewer;
