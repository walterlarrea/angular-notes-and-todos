import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NotesService } from '../services/notes/notes.service';
import { NgIf } from '@angular/common';
import { Note } from '../models/note.model';
import { UserNoteComponent } from '../user-note/user-note.component';

@Component({
  selector: 'note-edition',
  standalone: true,
  imports: [NgIf, UserNoteComponent],
  templateUrl: './note-edition.component.html',
  styleUrl: './note-edition.component.scss',
})
export class NoteEditionComponent implements OnChanges {
  @Input() note: Note | null = null;
  decNote: Note | null = null;

  @Output() closeDialogEvent = new EventEmitter();
  private dialog: HTMLDialogElement | null = null;
  private isUpdated: boolean = false;

  constructor(private notesService: NotesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dialog = document.getElementsByTagName('dialog')[0];

    this.decNote = { ...this.note } as Note;
    this.openDialog();
  }

  openDialog() {
    if (this.note?.id) {
      this.dialog?.showModal();
    }
  }

  closeDialog(event: MouseEvent) {
    if (!this.dialog) return;

    const rect = this.dialog.getBoundingClientRect();
    const isClickInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!isClickInDialog) {
      this.updateNotePermanent();

      this.closeDialogEvent.emit();
      this.dialog.close();
    }
  }

  private isNoteKey(value: string): value is keyof Note {
    return Object.keys(this.note as Note).includes(value);
  }

  updateNoteLocally({ property, updatedText }: any) {
    if (!this.note) return;

    const typeCheck = this.isNoteKey(property);
    if (typeCheck) {
      this.note[property] = updatedText;
    }

    this.isUpdated = true;
  }

  updateNotePermanent() {
    if (this.isUpdated && this.note) {
      this.notesService.updateNote(this.note);
    }
  }
}
