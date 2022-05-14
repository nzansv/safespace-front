import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Customer } from './interfaces/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { aioTableData, aioTableLabels } from '../../../../static-data/aio-table-data';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icTrash from '@iconify/icons-ic/twotone-delete';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {UserService} from '../../../core/service/user.service';
import {User} from '../../../core/model/user';
import {EmpDashboardComponent} from './emp-dashboard/emp-dashboard.component';
import {Router} from '@angular/router';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';


@UntilDestroy()
@Component({
  selector: 'vex-aio-table',
  templateUrl: './aio-table.component.html',
  styleUrls: ['./aio-table.component.scss'],
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
export class AioTableComponent implements OnInit{

  layoutCtrl = new FormControl('boxed');
  displayedColumns: string[] = ['name', 'email', 'position', 'phoneNumber', 'riskStatus', 'covidStatus', 'actions'];

  pageSize = 10;
  pageIndex = 0;
  pageLength = 0;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  users: any[];
  searchUser: string;
  currentUser: any;

  labels = aioTableLabels;

  icFolder = icFolder;
  icSearch = icSearch;
  icAdd = icAdd;
  icTrash = icTrash;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private route: Router,
              private snackbar: MatSnackBar) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
    this.getAllUsersContent();
  }

  openDashboard(userId?: User['userId']) {
    this.dialog.open(EmpDashboardComponent, {
      data: userId || null,
      width: '1200px'
    });
  }

  getAllUsersContent(event?: PageEvent): void {
    let param = '';
    if (event) {
      param = `page=${event.pageIndex}&size=${event.pageSize}`;
    } else {
      this.pageLength = 0;
      this.pageIndex = 0;
      this.pageSize = 5;
      param = `page=${this.pageIndex}&size=${this.pageSize}`;
    }

    if (this.searchUser) {
      param += '&search=' + this.searchUser;
    }
    this.userService.getUsersByPagination(param).subscribe(res => {
      this.users = res.content;
      this.pageIndex = res.pageNumber;
      this.pageSize = res.pageSize;
      this.pageLength = res.totalElements;
    });
  }

  searchUsers() {
    // if (this.searchUser.trim()) {
      this.searchUser = this.searchUser.trim().replace(' ', '');
      this.getAllUsersContent();
    // }
  }

  addTask(userId: any) {
    console.log(userId);
    this.route.navigateByUrl('apps/task/create-task/' + userId);
  }

  deleteUser(userId: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: userId,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'DELETED') {
        this.snackbar.open('User deleted successfully!', '', {
          duration: 2000,
          horizontalPosition: 'center'
        });
        this.getAllUsersContent();
      } else if (result === 'ERROR') {
        this.snackbar.open('Something went wrong...', '', {
          duration: 2000,
          horizontalPosition: 'center'
        });
      }
    });
  }
}
