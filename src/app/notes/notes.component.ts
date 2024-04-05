import { Component } from '@angular/core';
import { NotesService } from '../services/notes/notes.service';
import { NgFor, AsyncPipe } from '@angular/common';
import { Note } from '../models/note.model';
import { UserNoteComponent } from '../user-note/user-note.component';
import { NewNoteFormComponent } from '../new-note-form/new-note-form.component';
import { NoteEditionComponent } from '../note-edition/note-edition.component';

@Component({
  selector: 'notes',
  standalone: true,
  imports: [
    NgFor,
    AsyncPipe,
    UserNoteComponent,
    NewNoteFormComponent,
    NoteEditionComponent,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  notes$ = this.noteService.getNotesObservable();
  selectedNote: Note | null = null;

  constructor(private noteService: NotesService) {}

  selectNoteToEdit(event: MouseEvent, note: Note) {
    if (event.target && (event.target as HTMLElement).nodeName === 'BUTTON')
      return;

    this.selectedNote = note;
  }

  deselectNoteToEdit() {
    this.selectedNote = null;
  }

  trackByFn(index: number, item: Note) {
    return item.id;
  }
}
