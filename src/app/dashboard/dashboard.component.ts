import { Component } from '@angular/core';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [NotesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
