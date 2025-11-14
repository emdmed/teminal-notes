import React, {useState, useEffect} from 'react';
import {useInput, useApp} from 'ink';
import NoteListView from './components/NoteListView.js';
import NoteDetailView from './components/NoteDetailView.js';
import NoteEditor from './components/NoteEditor.js';
import DeleteConfirmation from './components/DeleteConfirmation.js';
import {
	loadNotes,
	addNote,
	updateNote,
	deleteNote,
	getNoteById,
} from './storage.js';

export default function App() {
	const {exit} = useApp();
	const [view, setView] = useState('list');
	const [notes, setNotes] = useState([]);
	const [selectedNoteId, setSelectedNoteId] = useState(null);

	useEffect(() => {
		const loadedNotes = loadNotes();
		setNotes(loadedNotes);
	}, []);

	useInput((input, key) => {
		if ((input === 'q' || key.escape) && view === 'list') {
			exit();
		}
	});

	const refreshNotes = () => {
		const updatedNotes = loadNotes();
		setNotes(updatedNotes);
	};

	const handleAdd = () => {
		setSelectedNoteId(null);
		setView('edit');
	};

	const handleView = noteId => {
		setSelectedNoteId(noteId);
		setView('detail');
	};

	const handleEdit = noteId => {
		setSelectedNoteId(noteId);
		setView('edit');
	};

	const handleSaveNote = (title, content) => {
		if (selectedNoteId) {
			updateNote(selectedNoteId, title, content);
		} else {
			addNote(title, content);
		}
		refreshNotes();
		setSelectedNoteId(null);
		setView('list');
	};

	const handleSaveFromDetail = (noteId, title, content) => {
		updateNote(noteId, title, content);
		refreshNotes();
	};

	const handleDeleteRequest = noteId => {
		setSelectedNoteId(noteId);
		setView('delete');
	};

	const handleDeleteConfirm = () => {
		if (selectedNoteId) {
			deleteNote(selectedNoteId);
			refreshNotes();
			setSelectedNoteId(null);
		}
		setView('list');
	};

	const handleBackToList = () => {
		setSelectedNoteId(null);
		setView('list');
	};

	const handleCancel = () => {
		setSelectedNoteId(null);
		setView('list');
	};

	if (view === 'list') {
		return (
			<NoteListView
				notes={notes}
				onView={handleView}
				onEdit={handleEdit}
				onDelete={handleDeleteRequest}
				onAdd={handleAdd}
			/>
		);
	}

	if (view === 'detail') {
		const note = getNoteById(selectedNoteId);
		return (
			<NoteDetailView
				note={note}
				onSave={handleSaveFromDetail}
				onBack={handleBackToList}
				onDelete={handleDeleteRequest}
			/>
		);
	}

	if (view === 'edit') {
		const note = selectedNoteId ? getNoteById(selectedNoteId) : null;
		return <NoteEditor note={note} onSave={handleSaveNote} onCancel={handleCancel} />;
	}

	if (view === 'delete') {
		const note = getNoteById(selectedNoteId);
		return (
			<DeleteConfirmation
				note={note}
				onConfirm={handleDeleteConfirm}
				onCancel={handleCancel}
			/>
		);
	}

	return null;
}
