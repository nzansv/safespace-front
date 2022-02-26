import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {User} from '../../../../core/model/user';
import {UserDto} from '../../../../core/model/UserDto';
import {Indicator} from '../../../../core/model/Indicator';
import {UserService} from '../../../../core/service/user.service';
import {IndicatorService} from '../../../../core/service/indicator.service';
import icFavorite from '@iconify/icons-ic/twotone-favorite';
import icPerson from '@iconify/icons-ic/twotone-person';
import icBeenhere from '@iconify/icons-ic/twotone-beenhere';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {untilDestroyed} from '@ngneat/until-destroy';
import {chats} from '../../../../../static-data/chats';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Contact} from '../../contacts/interfaces/contact.interface';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  bloodPressure: number;
  bloodOxygen: number;
  heartRate: number;
  temperature: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: '8:00', bloodPressure: 1.0079, bloodOxygen: 130, heartRate: 56, temperature: 37.6},
  {name: '9:30', bloodPressure: 4.0026, bloodOxygen: 130, heartRate: 56, temperature: 37.6},
  {name: '10:00', bloodPressure: 6.941, bloodOxygen: 130, heartRate: 56, temperature: 37.6},
  {name: '12:00', bloodPressure: 9.0122, bloodOxygen: 130, heartRate: 56, temperature: 37.6},
  {name: '12:30', bloodPressure: 10.811, bloodOxygen: 130, heartRate: 56, temperature: 37.6},
  {name: '14:00', bloodPressure: 12.0107, bloodOxygen: 130, heartRate: 56, temperature: 37.6},
  {name: '15:30', bloodPressure: 14.0067, bloodOxygen: 130, heartRate: 56, temperature: 37.6}
];

@Component({
  selector: 'vex-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmpDashboardComponent implements OnInit {
  displayedColumns: string[] = ['time', 'lowerBloodPressure', 'upperBloodPressure', 'bloodOxygen', 'heartRate', 'temperature'];
  dataSource = ELEMENT_DATA;
  selected: Date | null;
  indicators: any[];
  user: User;
  pageSize = 10;
  pageIndex = 0;
  pageLength = 0;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  lastIndicator: Indicator;
  icFavorite = icFavorite;
  icPerson = icPerson;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dateFrom: number;
  dateTo: number;
  icMoreVert = icBeenhere;
  constructor(@Inject(MAT_DIALOG_DATA) private empId: User['userId'],
              private route: ActivatedRoute,
              private dialogRef: MatDialogRef<EmpDashboardComponent>,
              private cd: ChangeDetectorRef,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private indicatorService: IndicatorService) {
  }

  ngOnInit() {
    this.dateFrom = new Date().setHours(0, 0, 0, 0);
    this.dateTo = new Date().setHours(23, 59, 59, 999);
    this.userService.getUserDetailsById(this.empId).subscribe(res => {
        this.user = res;
        console.log(res);
        this.getLastIndicators();
        this.getIndicatorsByDateAndUserIdAndPagination();
      });
  }
  onChangeDate(value) {
    this.dateFrom = new Date(value).setHours(0, 0, 0, 0);
  }
  onChangeDateT(value) {
    this.dateTo = new Date(value).setHours(23, 59, 59, 999);
  }

  getIndicatorsByDateAndUserIdAndPagination(event?: PageEvent) {
    if (this.dateTo < this.dateFrom) {
      this.snackBar.open('Range of date is not valid!', '', {
        duration: 3000,
        horizontalPosition: 'center'
      });
    } else {
      let param = '';
      if (event) {
        param = `page=${event.pageIndex}&size=${event.pageSize}`;
      } else {
        this.pageLength = 0;
        this.pageIndex = 0;
        this.pageSize = 5;
        param = `page=${this.pageIndex}&size=${this.pageSize}`;
      }
      this.indicatorService.getByDateAndUserIdAndPagination(this.empId, this.dateFrom, this.dateTo, param).subscribe(res => {
        this.indicators = res.content;
        this.pageIndex = res.pageNumber;
        this.pageSize = res.pageSize;
        this.pageLength = res.totalElements;
      });
    }
  }

  getLastIndicators(){
    this.indicatorService.getByUserIdAndIsLast(this.empId).subscribe(res => {
      this.lastIndicator = res;
    });
  }
}
