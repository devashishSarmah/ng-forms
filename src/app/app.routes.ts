import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/task-manager/task-manager.component').then(c => c.TaskManagerComponent)
  }
];
