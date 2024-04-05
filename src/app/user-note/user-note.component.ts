import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../models/note.model';
import { NgIf } from '@angular/common';
import { NotesService } from '../services/notes/notes.service';

@Component({
  selector: 'user-note',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user-note.component.html',
  styleUrl: './user-note.component.scss',
})
export class UserNoteComponent {
  editableProperties = ['title', 'content'] as const;

  @Input() note: Note | null = null;
  @Input() editable: boolean = false;

  @Output() updateNoteEvent = new EventEmitter<{}>();

  constructor(private notesService: NotesService) {}

  handleUpdate(event: KeyboardEvent, noteProperty: string) {
    const divElement = event.target as HTMLDivElement;
    console.log('Key event: ', divElement.innerText, noteProperty);

    if (!this.note) return;

    this.updateNoteEvent.emit({
      property: noteProperty,
      updatedText: divElement.innerText,
    });
  }

  deleteNote(id: string) {
    if (!id) return;

    this.notesService.deleteNote(id);
  }
}
