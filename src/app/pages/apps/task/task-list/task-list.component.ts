import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { aioTableData, aioTableLabels } from '../../../../../static-data/aio-table-data';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import {UserService} from '../../../../core/service/user.service';
import {TaskService} from '../../../../core/service/task.service';


@UntilDestroy()
@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class TaskListComponent implements OnInit{

  layoutCtrl = new FormControl('boxed');
  displayedColumns: string[] = ['id', 'created_at', 'employee_id', 'doctor_id', 'actions'];

  pageLength = 0;
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  tasks: any[];

  labels = aioTableLabels;

  icFolder = icFolder;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,
              private taskService: TaskService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getAllTasksContent();
  }

  getAllTasksContent(event?: PageEvent) {
    let param = '';
    if (event) {
      param = `page=${event.pageIndex}&size=${event.pageSize}`;
    } else {
      this.pageLength = 0;
      this.pageIndex = 0;
      this.pageSize = 5;
      param = `page=${this.pageIndex}&size=${this.pageSize}`;
    }
    this.taskService.getAllTasks(param).subscribe(res => {
      this.tasks = res.content;
      this.pageIndex = res.pageNumber;
      this.pageSize = res.pageSize;
      this.pageLength = res.totalElements;
    });
  }
}
