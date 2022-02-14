import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteExplanationComponent } from './note-explanation.component';

describe('NoteExplanationComponent', () => {
  let component: NoteExplanationComponent;
  let fixture: ComponentFixture<NoteExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteExplanationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
