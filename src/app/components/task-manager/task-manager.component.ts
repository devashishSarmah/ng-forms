import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PRIORITY_OPTIONS } from './form-values';
import { PriorityHighlightDirective } from './directives/priority-highlight/priority-highlight.directive';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, PriorityHighlightDirective],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent {
  taskManagerForm: FormGroup;
  priorityOptions = PRIORITY_OPTIONS;

  constructor() {
    this.taskManagerForm = new FormGroup({
      'taskTitle': new FormControl(''),
      'taskPriority': new FormControl(PRIORITY_OPTIONS[0].value)
    });
  }

}
