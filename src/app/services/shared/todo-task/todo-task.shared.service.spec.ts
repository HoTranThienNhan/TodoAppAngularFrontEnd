import { TestBed } from '@angular/core/testing';

import { TodoTaskSharedService } from './todo-task.shared.service';

describe('TodoTaskService', () => {
  let service: TodoTaskSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoTaskSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
