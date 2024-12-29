import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagerComponent } from './task-manager.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('TaskManagerComponent', () => {
  let component: TaskManagerComponent;
  let fixture: ComponentFixture<TaskManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskManagerComponent, ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with taskTitle control', () => {
    expect(component.taskManagerForm.contains('taskTitle')).toBeTruthy();
  });

  it('taskTitle control should be required', () => {
    const control = component.taskManagerForm.get('taskTitle')!;
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('taskTitle control should have max length of 50', () => {
    const control = component.taskManagerForm.get('taskTitle')!;
    control.setValue('a'.repeat(51));
    expect(control.valid).toBeFalsy();
  });

  it('should display character count', () => {
    const control = component.taskManagerForm.get('taskTitle')!;
    control.setValue('Test');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.label-text-alt').textContent).toContain('4/50 Characters');
  });

  it('should display required error message when taskTitle is empty and touched', () => {
    const control = component.taskManagerForm.get('taskTitle')!;
    control.setValue('');
    control.markAsTouched();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.text-rose-600').textContent).toContain('Task title is required');
  });

  it('should display max length error message when taskTitle exceeds 50 characters and is dirty', () => {
    const control = component.taskManagerForm.get('taskTitle')!;
    control.setValue('a'.repeat(51));
    control.markAsDirty();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.text-rose-600').textContent).toContain('Max character length exceeded');
  });
});
