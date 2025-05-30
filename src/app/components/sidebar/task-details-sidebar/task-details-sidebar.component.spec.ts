import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsSidebarComponent } from './task-details-sidebar.component';

describe('TaskDetailsSidebarComponent', () => {
  let component: TaskDetailsSidebarComponent;
  let fixture: ComponentFixture<TaskDetailsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailsSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
