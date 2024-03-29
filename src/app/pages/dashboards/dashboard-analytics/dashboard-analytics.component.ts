import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import icFavorite from '@iconify/icons-ic/twotone-favorite';
import icPerson from '@iconify/icons-ic/twotone-person';
import icBeenhere from '@iconify/icons-ic/twotone-beenhere';
import {User} from '../../../core/model/user';
import {UserDto} from '../../../core/model/UserDto';
import {UserService} from '../../../core/service/user.service';
import {IndicatorService} from '../../../core/service/indicator.service';
import {Indicator} from '../../../core/model/Indicator';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import icInsertComment from '@iconify/icons-ic/twotone-insert-comment';
import icPersonOutline from '@iconify/icons-ic/twotone-person-outline';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icBookmarks from '@iconify/icons-ic/twotone-bookmarks';
import icOpacity from '@iconify/icons-ic/baseline-opacity';

@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardAnalyticsComponent implements OnInit {
  displayedColumns: string[] = ['time', 'lowerBloodPressure', 'upperBloodPressure', 'bloodOxygen', 'heartRate', 'temperature'];
  selected: Date | null;
  user: User;
  pageSize = 5;
  pageIndex = 0;
  pageLength = 0;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  userDTO: UserDto;
  indicators: any[];
  lastIndicator: Indicator;
  icFavorite = icFavorite;
  icPerson = icPerson;
  icBlood = icOpacity;
  iconThermometer = 'thermometer';
  iconPressure = 'pressure';
  iconHeartRate = 'heart';
  iconOxygen = 'oxygen';
  icMoreVert = icBeenhere;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dateFrom: number;
  dateTo: number;
  constructor(private cd: ChangeDetectorRef, private userService: UserService, private indicatorService: IndicatorService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.dateFrom = new Date().setHours(0, 0, 0, 0);
    this.dateTo = new Date().setHours(23, 59, 59, 999);
    this.userDTO = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUserDetailsById(this.userDTO.id).subscribe(res => {
      this.user = res;
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
      this.indicatorService.getByDateAndUserIdAndPagination(this.userDTO.id, this.dateFrom, this.dateTo, param).subscribe(res => {
        this.indicators = res.content;
        this.pageIndex = res.pageNumber;
        this.pageSize = res.pageSize;
        this.pageLength = res.totalElements;
      });
    }
  }

  getLastIndicators(){
    this.indicatorService.getByUserIdAndIsLast(this.userDTO.id).subscribe(res => {
      this.lastIndicator = res;
    });
  }
}
