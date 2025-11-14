import React, {useState} from 'react';
import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';

const AddNote = ({onSave, onCancel}) => {
	const [step, setStep] = useState('title'); // 'title' or 'content'
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleTitleSubmit = value => {
		if (value.trim()) {
			setTitle(value);
			setStep('content');
		}
	};

	const handleContentSubmit = value => {
		if (value.trim()) {
			setContent(value);
			onSave(title, value);
		}
	};

	const handleInput = value => {
		if (step === 'title') {
			setTitle(value);
		} else {
			setContent(value);
		}
	};

	return (
		<Box flexDirection="column" padding={1}>
			<Box marginBottom={1}>
				<Text bold color="cyan">
					Add New Note
				</Text>
			</Box>

			{step === 'title' && (
				<Box flexDirection="column">
					<Box marginBottom={1}>
						<Text>Enter note title (ESC to cancel):</Text>
					</Box>
					<Box>
						<Text color="green">&gt; </Text>
						<TextInput
							value={title}
							onChange={handleInput}
							onSubmit={handleTitleSubmit}
						/>
					</Box>
				</Box>
			)}

			{step === 'content' && (
				<Box flexDirection="column">
					<Box marginBottom={1}>
						<Text dimColor>Title: {title}</Text>
					</Box>
					<Box marginBottom={1}>
						<Text>Enter note content:</Text>
					</Box>
					<Box>
						<Text color="green">&gt; </Text>
						<TextInput
							value={content}
							onChange={handleInput}
							onSubmit={handleContentSubmit}
						/>
					</Box>
				</Box>
			)}

			<Box marginTop={1}>
				<Text dimColor>Press ESC to go back</Text>
			</Box>
		</Box>
	);
};

export default AddNote;
