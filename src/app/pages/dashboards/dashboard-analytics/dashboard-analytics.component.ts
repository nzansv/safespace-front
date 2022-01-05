import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss']
})
export class DashboardAnalyticsComponent implements OnInit {

  user: User;
  userDTO: UserDto;
  indicators: Indicator[];
  lastIndicator: Indicator;
  timestamps: number[];
  timestampsMonth: number[];
  userSessionsSeries: ApexAxisChartSeries = [
    {
      name: 'Blood Pressure',
      data: []
    },
    {
      name: 'Heart rate',
      data: []
    },
    {
      name: 'Temperature',
      data: []
    }
  ];
  icFavorite = icFavorite;
  icPerson = icPerson;
  icMoreVert = icBeenhere;

  constructor(private cd: ChangeDetectorRef, private userService: UserService, private indocatorService: IndicatorService) {
  }

  ngOnInit() {
    this.userDTO = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUserDetailsById(this.userDTO.id).subscribe(res => {
      this.user = res;
    });
    this.indocatorService.getIndicatorDetailsById(this.userDTO.id).subscribe(res => {
      this.indicators = res;
      this.indicators = this.indicators.sort(function(x, y) {
        return x.checkTime - y.checkTime;
      });
      this.userSessionsSeries[0].data = this.indicators.map((item) => item.bloodPressure);
      this.userSessionsSeries[1].data = this.indicators.map((item) => item.heartRate);
      this.userSessionsSeries[2].data = this.indicators.map((item) => item.temperature);
      this.timestamps = this.indicators.map((item) => item.checkTime).slice(-17);
      this.timestampsMonth = this.indicators.map((item) => item.checkTime).slice(-30);
      for (const i of this.indicators) {
        if (i.isLast === true) {
          this.lastIndicator = i;
        }
      }
    });
  }
}
