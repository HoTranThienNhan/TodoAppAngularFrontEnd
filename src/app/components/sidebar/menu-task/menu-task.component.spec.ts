import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTaskComponent } from './menu-task.component';

describe('MenuTaskComponent', () => {
  let component: MenuTaskComponent;
  let fixture: ComponentFixture<MenuTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
