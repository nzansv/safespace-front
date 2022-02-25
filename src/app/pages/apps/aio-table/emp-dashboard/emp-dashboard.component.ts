import {ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
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
  displayedColumns: string[] = ['name', 'upperBloodPressure', 'lowerBloodPressure', 'bloodOxygen', 'heartRate', 'temperature'];
  dataSource = ELEMENT_DATA;
  selected: Date | null;
  user: User;
  indicators: Indicator[];
  lastIndicator: Indicator;
  icFavorite = icFavorite;
  icPerson = icPerson;
  icMoreVert = icBeenhere;
  constructor(@Inject(MAT_DIALOG_DATA) private empId: User['userId'],
              private route: ActivatedRoute,
              private dialogRef: MatDialogRef<EmpDashboardComponent>,
              private cd: ChangeDetectorRef,
              private userService: UserService,
              private indicatorService: IndicatorService) {
  }

  ngOnInit() {
      this.userService.getUserDetailsById(this.empId).subscribe(res => {
        this.user = res;
        console.log(res);
        this.getLastIndicators();
      });
  }

  getLastIndicators(){
    this.indicatorService.getByUserIdAndIsLast(this.empId).subscribe(res => {
      this.lastIndicator = res;
    });
  }
}
