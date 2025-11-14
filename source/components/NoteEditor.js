import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import TextInput from 'ink-text-input';
import {useScreenSize} from '../hooks/useScreenSize.js';
import {colors} from '../utils/colors.js';

const NoteEditor = ({note, onSave, onCancel}) => {
	const [editingField, setEditingField] = useState('title');
	const [title, setTitle] = useState(note ? note.title : '');
	const [content, setContent] = useState(note ? note.content : '');
	const {height, width} = useScreenSize();

	useInput((input, key) => {
		if (key.escape) {
			onCancel();
		}
		else if (key.downArrow && editingField === 'title') {
			setEditingField('content');
		}
		else if (key.upArrow && editingField === 'content') {
			setEditingField('title');
		}
		else if (input === 's' && key.ctrl) {
			if (title.trim() && content.trim()) {
				onSave(title, content);
			}
		}
	});

	const handleTitleSubmit = () => {
		setEditingField('content');
	};

	const handleContentSubmit = () => {
		if (title.trim() && content.trim()) {
			onSave(title, content);
		}
	};

	const handleTitleChange = value => {
		setTitle(value);
	};

	const handleContentChange = value => {
		setContent(value);
	};

	return (
		<Box
			flexDirection="column"
			width={width}
			height={height}
			paddingX={2}
			paddingY={1}
		>
			<Box marginBottom={1} flexDirection="column">
				{editingField === 'title' ? (
					<Box>
						<TextInput
							value={title}
							onChange={handleTitleChange}
							onSubmit={handleTitleSubmit}
							placeholder="Enter note title..."
						/>
					</Box>
				) : (
					<Box>
						<Text inverse color={colors.green}>
							{" "}{title || 'Untitled'}{" "}
						</Text>
						<Text color={colors.green}> (↑ to edit)</Text>
					</Box>
				)}
			</Box>

			<Box
				flexDirection="column"
				flexGrow={1}
				borderStyle="single"
				borderColor={colors.green}
				paddingX={1}
				paddingY={1}
			>
				{editingField === 'content' ? (
					<Box flexDirection="column">
						<TextInput
							value={content}
							onChange={handleContentChange}
							onSubmit={handleContentSubmit}
							placeholder="Enter note content..."
						/>
					</Box>
				) : (
					<Box flexDirection="column">
						<Text color={colors.green}>{content || '(empty)'}</Text>
						<Text color={colors.green} marginTop={1}>
							(↓ to edit)
						</Text>
					</Box>
				)}
			</Box>

			<Box paddingX={1} marginTop={1}>
				<Text dimColor>
					↑/↓=switch field | Enter=next/save | Ctrl+S=save | ESC=cancel
				</Text>
			</Box>
		</Box>
	);
};

export default NoteEditor;
