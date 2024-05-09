import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface Note {
  title: string;
  content: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Notes';

  notes: Note[] = [];
  selectedNote: Note | null = null;
  newNote: Note = { title: '', content: '' };
  errorTitle: string | null = null;
  errorContent: string | null = null;
  showSaveButton = false;

  selectNote(note: Note) {
    this.selectedNote = note;
  }

  editNote(note: Note) {
    this.selectedNote = note;
    this.newNote = { ...note };
    this.showSaveButton = true;
  }

  saveAddNote() {
    if (this.validateInput()) {
      if (this.selectedNote) {
        const index = this.notes.indexOf(this.selectedNote);
        this.notes[index] = { ...this.newNote };
      } else {
        this.notes.push({ ...this.newNote });
      }
      this.clearForm();
      this.showSaveButton = false;
    }
  }

  deleteNote(note: Note) {
    const index = this.notes.indexOf(note);

    if (index !== -1) {
      this.notes.splice(index, 1);
      if (this.selectedNote === note) {
        this.clearForm();
      }
    }
  }

  validateInput(): boolean {
    let isValid = true;

    if (this.newNote.title.length < 5) {
      this.errorTitle = 'Заглавието трябва да е поне 5 символа.';
      isValid = false;
    } else {
      this.errorTitle = null;
    }

    if (this.newNote.content.length < 7) {
      this.errorContent = 'Съдържанието трябва да е поне 7 символа.';
      isValid = false;
    } else {
      this.errorContent = null;
    }

    return isValid;
  }

  clearForm() {
    this.newNote = { title: '', content: '' };
    this.selectedNote = null;
  }
}