import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/constants';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { Note, NoteToCreate } from '../../models/note.model';
import { GoogleAuthSession } from '../../models/session.model';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes$ = new BehaviorSubject<Note[]>([]);
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.init();
  }

  init() {
    const session: GoogleAuthSession = this.sessionService.getCurrentSession();
    if (!session?.id) return;

    this.http
      .get<Note[]>(`${API_BASE_URL}${API_ENDPOINTS.notes}`)
      .pipe(
        map((notes: Note[]) =>
          notes.filter((note: Note) =>
            note.userId === session.id ? note : undefined
          )
        )
      )
      .subscribe((notes: Note[]) => {
        this.notes$.next(notes);
      });
  }

  public getNotesObservable(): Observable<Note[]> {
    return this.notes$.asObservable();
  }

  public async createNote(newNote: NoteToCreate): Promise<Note | null> {
    const session: GoogleAuthSession = this.sessionService.getCurrentSession();
    if (!session?.id) return null;
    newNote.userId = session.id;

    try {
      const createdNote = await firstValueFrom(
        this.http.post<Note>(`${API_BASE_URL}${API_ENDPOINTS.notes}`, newNote)
      );
      if (!createdNote?.id) return null;

      this.notes$.next([...this.notes$.value, createdNote]);

      return createdNote;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async deleteNote(noteId: string): Promise<Note | null> {
    if (!noteId || noteId === '') return null;
    const session: GoogleAuthSession = this.sessionService.getCurrentSession();
    if (!session?.id) return null;

    try {
      const deletedNote = await firstValueFrom(
        this.http.delete<Note>(
          `${API_BASE_URL}${API_ENDPOINTS.notes}/${noteId}`
        )
      );
      if (!deletedNote?.id) return null;

      this.notes$.next([
        ...this.notes$.value.filter((note: Note) =>
          note.id !== deletedNote?.id ? note : undefined
        ),
      ]);

      return deletedNote;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async updateNote(note: Note): Promise<Note | null> {
    if (!note.id || note.id === '') return null;
    const session: GoogleAuthSession = this.sessionService.getCurrentSession();
    if (!session?.id) return null;

    try {
      const updatedNote = await firstValueFrom(
        this.http.put<Note>(
          `${API_BASE_URL}${API_ENDPOINTS.notes}/${note.id}`,
          note
        )
      );
      if (!updatedNote?.id) return null;

      this.notes$.next([
        ...this.notes$.value.filter((note: Note) =>
          note.id !== updatedNote?.id ? updatedNote : note
        ),
      ]);

      return updatedNote;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
