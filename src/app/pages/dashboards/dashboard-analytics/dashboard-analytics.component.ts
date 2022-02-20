import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import icFavorite from '@iconify/icons-ic/twotone-favorite';
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
      this.lastIndicator = res;
    });
  }
}
