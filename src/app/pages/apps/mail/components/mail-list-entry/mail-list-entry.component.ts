import {ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import { Mail } from '../../interfaces/mail.interface';
import { MatCheckboxChange } from '@angular/material/checkbox';
import icStar from '@iconify/icons-ic/star';
import icStarBorder from '@iconify/icons-ic/star-border';
import { MailService } from '../../services/mail.service';
import {Notification} from '../../interfaces/notification.interface';
import {NotificationService} from '../../services/notification.service';
import {MailListComponent} from '../../containers/mail-list.component';
import {NavigationService} from '../../../../../../@vex/services/navigation.service';

@Component({
  selector: 'vex-mail-list-entry',
  templateUrl: './mail-list-entry.component.html',
  styleUrls: ['./mail-list-entry.component.scss']
})
export class MailListEntryComponent implements OnInit {

  @Input() mail: Mail;
  @Input() notification: Notification;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  hovered: boolean;
  c;

  icStar = icStar;
  icStarBorder = icStarBorder;

  constructor(private cd: ChangeDetectorRef,
              private mailService: MailService,
              @Inject(NotificationService) private notificationService,
              private mailListComponent: MailListComponent) {
  }

  ngOnInit(): void {
  }

  onMouseEnter() {
    this.hovered = true;
    this.cd.markForCheck();
  }

  onMouseLeave() {
    this.hovered = false;
    this.cd.markForCheck();
  }

  onCheckboxChange(event: MatCheckboxChange) {
    this.selectedChange.emit(event.checked);
  }

  markNotificationAsRead(noteId: Notification['id']) {

    // this.notificationService.countNotes$.subscribe(v => {
    //   this.c = v;
    //   console.log('count');
    //   console.log(this.c);
    //   this.notificationService.setCountNotes(this.c--);
    // });
    this.notificationService.markNoteAsRead(noteId);
    this.notification.seen = true;
    // this.updateNotification(noteId);
  }

  updateNotification(noteId: Notification['id']) {
    const notes = [
      ...this.mailListComponent.notifications$.filter(m => m.id !== noteId),
    ];

    this.mailListComponent.notifications.next(notes);
  }
}
