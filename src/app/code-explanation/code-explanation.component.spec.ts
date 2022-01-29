import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExplanationComponent } from './code-explanation.component';

describe('CodeExplanationComponent', () => {
  let component: CodeExplanationComponent;
  let fixture: ComponentFixture<CodeExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeExplanationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
