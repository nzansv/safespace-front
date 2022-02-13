import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VexRoutes} from '../../../../@vex/interfaces/vex-route.interface';
import {ScrumboardComponent} from '../scrumboard/scrumboard.component';
import {QuicklinkModule} from 'ngx-quicklink';
import {ChatEmptyComponent} from '../chat/chat-empty/chat-empty.component';
import {TaskListComponent} from './task-list/task-list.component';
import {CreateTaskComponent} from './create-task/create-task.component';

const routes: VexRoutes = [
  {
    path: '',
    children: [
      {
        path: 'task-list',
        component: TaskListComponent
      },
      {
        path: 'create-task',
        component: CreateTaskComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class TaskRoutingModule { }
