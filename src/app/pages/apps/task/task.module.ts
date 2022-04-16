import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import {AioTableRoutingModule} from '../aio-table/aio-table-routing.module';
import {PageLayoutModule} from '../../../../@vex/components/page-layout/page-layout.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BreadcrumbsModule} from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import {CustomerCreateUpdateModule} from '../aio-table/customer-create-update/customer-create-update.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {IconModule} from '@visurel/iconify-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ContainerModule} from '../../../../@vex/directives/container/container.module';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CreateTaskComponent } from './create-task/create-task.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import { ViewEditTaskDialogComponent } from './view-edit-task-dialog/view-edit-task-dialog.component';


@NgModule({
  declarations: [
    TaskListComponent,
    CreateTaskComponent,
    ViewEditTaskDialogComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    CustomerCreateUpdateModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    IconModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ContainerModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  providers: [
    DatePipe,
  ]
})
export class TaskModule { }
