import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { aioTableData, aioTableLabels } from '../../../../../static-data/aio-table-data';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
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
  displayedColumns: string[] = ['id', 'created_at', 'employee_id', 'doctor_id', 'complaints', 'recommendations', 'actions'];

  pageSize = 10;
  page = 0;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: any[];

  labels = aioTableLabels;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icFolder = icFolder;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private taskService: TaskService) {
  }

  getAllTasksContent($event?): void {
    let param = `page=0&size=20`;
    if ($event) {
      param = `page=${$event.pageIndex}&size=${$event.pageSize}`;
    }
    this.taskService.getAllTasks(param).subscribe(res => {
      this.dataSource = res;
    });
  }

  ngOnInit() {
    this.getAllTasksContent();
  }
}
