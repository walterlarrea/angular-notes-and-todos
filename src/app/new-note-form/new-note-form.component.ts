import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NotesService } from '../services/notes/notes.service';
import { NoteToCreate } from '../models/note.model';

@Component({
  selector: 'new-note-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-note-form.component.html',
  styleUrl: './new-note-form.component.scss',
})
export class NewNoteFormComponent {
  noteForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  constructor(private notesService: NotesService) {}

  onSubmitForm() {
    // TODO form validation
    if (!this.noteForm.value.content || !this.noteForm.value.title) return;

    const formValues = this.noteForm.value as NoteToCreate;

    this.notesService.createNote(formValues);

    this.noteForm.reset();
  }
}
