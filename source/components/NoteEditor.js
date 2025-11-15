import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { useScreenSize } from '../hooks/useScreenSize.js';
import { useTheme } from '../contexts/ThemeContext.js';

const NoteEditor = ({ note, onSave, onCancel, mode = 'edit' }) => {
	const [isViewMode, setIsViewMode] = useState(mode === 'view');
	const [editingField, setEditingField] = useState('title');
	const [title, setTitle] = useState(note ? note.title : '');
	const [content, setContent] = useState(note ? note.content : '');
	const [priority, setPriority] = useState(note ? note.priority || 'none' : 'none');
	const { height, width } = useScreenSize();
	const { colors } = useTheme();

	const priorities = ['high', 'medium', 'low', 'none'];

	useInput((input, key) => {
		if (key.escape) {
			onCancel();
			return;
		}

		if (isViewMode && key.return) {
			setIsViewMode(false);
			return;
		}

		if (isViewMode) {
			return;
		}

		if (key.downArrow) {
			if (editingField === 'title') {
				setEditingField('content');
			}
			return;
		}

		if (key.upArrow) {
			if (editingField === 'content') {
				setEditingField('title');
			}
			return;
		}

		if (key.tab) {
			const currentIndex = priorities.indexOf(priority);
			const newIndex = (currentIndex + 1) % priorities.length;
			setPriority(priorities[newIndex]);
			return;
		}

		if (input === 's' && key.ctrl) {
			if (title.trim() && content.trim()) {
				onSave(title, content, priority);
			}
			return;
		}
	});

	const handleTitleSubmit = () => {
		setEditingField('content');
	};

	const handleContentSubmit = () => {
		if (title.trim() && content.trim()) {
			onSave(title, content, priority);
		}
	};

	const handleTitleChange = value => {
		setTitle(value);
	};

	const handleContentChange = value => {
		setContent(value);
	};

	const getPriorityColor = priority => {
		const colorMap = {
			high: colors.priorityHigh,
			medium: colors.priorityMedium,
			low: colors.priorityLow,
			none: colors.priorityNone
		};
		return colorMap[priority] || colors.priorityNone;
	};

	if (isViewMode) {
		return (
			<Box
				flexDirection="column"
				width={width}
				height={height}
				paddingX={2}
				paddingY={1}
			>
				<Box borderStyle="single" borderColor={colors.primary} marginBottom={1} paddingX={1} flexDirection="row" alignItems="center" justifyContent="space-between">
					<Text bold color={colors.primary}>
						{title || 'Untitled'}
					</Text>
					<Box flexDirection="row">
						<Text color={colors.primary}>Priority: </Text>
						<Text color={getPriorityColor(priority)} bold>
							{priority}
						</Text>
					</Box>
				</Box>

				<Box
					flexDirection="column"
					flexGrow={1}
					borderStyle="single"
					borderColor={colors.primary}
					paddingX={1}
					paddingY={1}
				>
					<Text color={colors.primary}>{content || '(empty)'}</Text>
				</Box>

				<Box paddingX={1} marginTop={1}>
					<Text dimColor>
						Enter=edit | ESC=back
					</Text>
				</Box>
			</Box>
		);
	}

	return (
		<Box
			flexDirection="column"
			width={width}
			height={height}
			paddingX={2}
			paddingY={1}
		>
			<Box borderStyle="single" borderColor={colors.primary} marginBottom={1} paddingX={1} flexDirection="row" alignItems="center" justifyContent="space-between">
				<Box flexGrow={1} flexDirection="row" alignItems="center">
					{editingField === 'title' ? (
						<Box flexGrow={1}>
							<TextInput
								value={title}
								onChange={handleTitleChange}
								onSubmit={handleTitleSubmit}
								placeholder="Enter note title..."
							/>
						</Box>
					) : (
						<>
							<Text inverse color={colors.primary}>
								{" "}{title || 'Untitled'}{" "}
							</Text>
							<Text color={colors.primary}> (↑ to edit)</Text>
						</>
					)}
				</Box>
				<Box flexDirection="row">
					<Text color={colors.primary}>Priority: </Text>
					<Text color={getPriorityColor(priority)} bold>{priority}</Text>
					<Text color={colors.primary} dimColor> (Tab)</Text>
				</Box>
			</Box>

			<Box
				flexDirection="column"
				flexGrow={1}
				borderStyle="single"
				borderColor={colors.primary}
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
						<Text color={colors.primary}>{content || '(empty)'}</Text>
						<Text color={colors.primary} marginTop={1}>
							(↓ to edit)
						</Text>
					</Box>
				)}
			</Box>

			<Box paddingX={1} marginTop={1}>
				<Text dimColor>
					↑/↓=switch title/content | Tab=cycle priority | Enter=next/save | Ctrl+S=save | ESC=cancel
				</Text>
			</Box>
		</Box>
	);
};

export default NoteEditor;
