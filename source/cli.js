#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
		Usage
		  $ terminal-notes

		Description
		  Interactive terminal note-taking application
		  Notes are saved in ~/.terminal_notes.json

		Examples
		  $ terminal-notes
	`,
	{
		importMeta: import.meta,
	},
);

console.clear();

render(<App />);
