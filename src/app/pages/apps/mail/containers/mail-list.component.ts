import { Component, OnInit } from '@angular/core';
import icArchive from '@iconify/icons-ic/twotone-archive';
import { MailService } from '../services/mail.service';
import { LayoutService } from '../../../../../@vex/services/layout.service';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import { trackById } from '../../../../../@vex/utils/track-by';
import { SelectionModel } from '@angular/cdk/collections';
import { Mail } from '../interfaces/mail.interface';
import { MatCheckboxChange } from '@angular/material/checkbox';
import icCheck from '@iconify/icons-ic/twotone-check';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icLabel from '@iconify/icons-ic/twotone-label';
import icSettings from '@iconify/icons-ic/twotone-settings';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { getAllParams } from '../../../../../@vex/utils/check-router-childs-data';
import {NotificationService} from '../services/notification.service';
import {BehaviorSubject} from 'rxjs';
import {Notification} from '../interfaces/notification.interface';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'vex-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ]
})
export class MailListComponent implements OnInit {

  mails$ = this.mailService.filteredMails$;
  gtSm$ = this.layoutService.gtSm$;
  notifications;
  notifications$;

  hasActiveMail$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => getAllParams(this.router.routerState.root.snapshot)),
    map(params => params.has('mailId')),
    distinctUntilChanged()
  );

  icArchive = icArchive;
  icCheck = icCheck;
  icFolder = icFolder;
  icLabel = icLabel;
  icSettings = icSettings;

  currentUser;

  pageSize = 10;
  pageIndex = 0;
  pageLength = 0;

  trackById = trackById;

  selection = new SelectionModel<Notification['id']>(true, []);

  constructor(private mailService: MailService,
              private layoutService: LayoutService,
              private notificationService: NotificationService,
              private router: Router) {}

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      this.getAllNotifications();
    }
  }

  getAllNotifications(event?: PageEvent) {
    let param = '';
    if (event) {
      param = `page=${event.pageIndex}&size=${event.pageSize}`;
    } else {
      // this.pageLength = 0;
      // this.pageIndex = 0;
      // this.pageSize = 10;
      param = `page=${this.pageIndex}&size=${this.pageSize}`;
    }
    this.notificationService.getAll(this.currentUser.id, param).subscribe(res => {
      this.notifications = new BehaviorSubject(res.content);
      this.notifications$ = this.notifications.asObservable();

      this.notifications = res.content;
      this.pageIndex = res.pageNumber;
      this.pageSize = res.pageSize;
      this.pageLength = res.totalElements;
    });
  }

  masterToggle(notes: Notification[] | null, change: MatCheckboxChange) {
    if (change.checked) {
      this.selection.select(...notes?.map(note => note.id));
    } else {
      this.selection.deselect(...notes?.map(note => note.id));
    }
  }

  isAllSelected(notes: Notification[]): boolean {
    return notes?.length > 0 && notes?.length === this.selection.selected?.length;
  }

  isSomeButNotAllSelected(notes: Notification[]): boolean {
    return !this.isAllSelected(notes) && this.selection.hasValue();
  }
}
