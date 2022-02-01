import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import icGroup from '@iconify/icons-ic/twotone-group';
import icPageView from '@iconify/icons-ic/twotone-pageview';
import icCloudOff from '@iconify/icons-ic/twotone-cloud-off';
import icTimer from '@iconify/icons-ic/twotone-timer';
import { defaultChartOptions } from '../../../../@vex/utils/default-chart-options';
import { Order, tableSalesData } from '../../../../static-data/table-sales-data';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icFavorite from '@iconify/icons-ic/twotone-favorite';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icPerson from '@iconify/icons-ic/twotone-person';
import icBeenhere from '@iconify/icons-ic/twotone-beenhere';
import {User} from '../../../core/model/user';
import {UserDto} from '../../../core/model/UserDto';
import {UserService} from '../../../core/service/user.service';
import {IndicatorService} from '../../../core/service/indicator.service';
import {Indicator} from '../../../core/model/Indicator';

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
  selector: 'vex-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardAnalyticsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'bloodPressure', 'bloodOxygen', 'heartRate', 'temperature'];
  dataSource = ELEMENT_DATA;
  selected: Date | null;
  user: User;
  userDTO: UserDto;
  indicators: Indicator[];
  lastIndicator: Indicator;
  timestamps: number[];
  timestampsMonth: number[];
  icFavorite = icFavorite;
  icPerson = icPerson;
  icMoreVert = icBeenhere;

  constructor(private cd: ChangeDetectorRef, private userService: UserService, private indicatorService: IndicatorService) {
  }

  ngOnInit() {
    this.userDTO = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUserDetailsById(this.userDTO.id).subscribe(res => {
      this.user = res;
      this.getLastIndicators();
    });
  }

  getLastIndicators(){
    this.indicatorService.getByUserIdAndIsLast(this.userDTO.id).subscribe(res => {
      console.log('hesfd sdf => ', res);
      this.lastIndicator = res;
    });
  }
}
