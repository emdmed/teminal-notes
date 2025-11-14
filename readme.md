# terminal-notes

A vim-style terminal note-taking application built with React and Ink. Features a full TUI (Terminal User Interface) with vim keybindings for efficient note management.

## Features

- **Full TUI Interface** - List view shows all notes with title and preview (first 30 chars)
- **Vim Keybindings** - Navigate and manage notes using familiar vim controls
- **Edit Mode** - Create new notes or edit existing ones
- **Quick Navigation** - Jump to top/bottom, scroll through notes
- **Delete with Confirmation** - Safe deletion with y/n confirmation
- **Persistent Storage** - All notes saved in `~/.terminal_notes.json`
- **Timestamps** - Track creation and modification dates
- **Cross-Platform** - Compatible with Arch Linux and Ubuntu

## Install

```bash
npm install --global terminal-notes
```

Or run locally:

```bash
npm install
npm run build
npm start
```

## Usage

Launch the app to see all your notes:

```bash
terminal-notes
```

## Vim Keybindings

### List View (Main Screen)

| Key | Action |
|-----|--------|
| `j` / `↓` | Move down to next note |
| `k` / `↑` | Move up to previous note |
| `g` | Jump to top (first note) |
| `G` | Jump to bottom (last note) |
| `i` / `a` | Insert/Add new note |
| `e` / `Enter` | Edit selected note |
| `d` | Delete selected note |
| `q` / `ESC` | Quit application |

### Edit Mode

| Key | Action |
|-----|--------|
| `Enter` | Move to next field / Save note |
| `ESC` | Cancel and return to list |

### Delete Confirmation

| Key | Action |
|-----|--------|
| `y` | Yes, delete the note |
| `n` / `ESC` | No, cancel deletion |

## Interface

When you launch the app, you'll see:

```
Terminal Notes (3)

> Welcome to Terminal Notes - This is a vim-style note ta... (11/14/2025)
  Shopping List - Buy milk, eggs, bread, and c... (11/14/2025)
  Project Ideas - Build a terminal-based task ... (11/14/2025)

┌─────────────────────────────────────────────────────────┐
│ j/k=down/up | g=top | G=bottom | i=insert | e/Edit=edit │
│ d=delete | q=quit                                        │
└─────────────────────────────────────────────────────────┘
```

## Data Storage

All notes are stored in a JSON file located at:
```
~/.terminal_notes.json
```

Each note contains:
- `id` - Unique identifier
- `title` - Note title
- `content` - Note content/body
- `createdAt` - Creation timestamp (ISO 8601)
- `updatedAt` - Last modification timestamp (ISO 8601)

## Development

### Build

Compile the JSX source code:

```bash
npm run build
```

### Watch Mode

Automatically rebuild on file changes:

```bash
npm run dev
```

### Start

Launch the application:

```bash
npm start
```

### Testing

Run tests and linters:

```bash
npm test
```

## Project Structure

```
source/
├── app.js                      # Main application logic
├── cli.js                      # CLI entry point
├── storage.js                  # File I/O operations
└── components/
    ├── NoteListView.js         # Main list view with vim controls
    ├── NoteEditor.js           # Create/edit note form
    └── DeleteConfirmation.js   # Delete confirmation dialog
```

## Technology Stack

- **React 19** - UI component framework
- **Ink 6** - React renderer for interactive CLI applications
- **ink-text-input** - Text input component for forms
- **Babel** - JSX transpilation
- **Node.js built-in modules** - File system operations (fs, path, os)

## Why Vim Keybindings?

Vim-style navigation is efficient and keeps your hands on the home row. No need to reach for arrow keys or mouse. If you're familiar with vim, you'll feel right at home!

## License

MIT
