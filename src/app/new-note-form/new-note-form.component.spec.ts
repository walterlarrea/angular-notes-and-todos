import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNoteFormComponent } from './new-note-form.component';

describe('NewNoteFormComponent', () => {
  let component: NewNoteFormComponent;
  let fixture: ComponentFixture<NewNoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewNoteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
