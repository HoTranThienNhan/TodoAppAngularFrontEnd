import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTaskItemsComponent } from './menu-task-items.component';

describe('MenuTaskItemsComponent', () => {
  let component: MenuTaskItemsComponent;
  let fixture: ComponentFixture<MenuTaskItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTaskItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTaskItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
