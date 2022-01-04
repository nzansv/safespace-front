import { Component, OnInit } from '@angular/core';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import {DateTime} from 'luxon';

@Component({
  selector: 'vex-widget-assistant',
  templateUrl: './widget-assistant.component.html',
  styleUrls: ['./widget-assistant.component.scss']
})
export class WidgetAssistantComponent implements OnInit {

  icCheckCircle = icCheckCircle;
  date = DateTime.local().toFormat('DD');
  dayName = DateTime.local().toFormat('EEEE');
  constructor() { }

  ngOnInit() {
  }

}
