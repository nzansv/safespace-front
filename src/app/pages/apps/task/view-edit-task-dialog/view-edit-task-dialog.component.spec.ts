import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditTaskDialogComponent } from './view-edit-task-dialog.component';

describe('ViewEditTaskDialogComponent', () => {
  let component: ViewEditTaskDialogComponent;
  let fixture: ComponentFixture<ViewEditTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEditTaskDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
