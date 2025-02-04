import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sub-tasks',
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './sub-tasks.component.html',
  styleUrl: './sub-tasks.component.scss'
})
export class SubTasksComponent {

  tasks = [];

}
