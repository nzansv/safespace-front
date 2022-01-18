import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Mail} from '../interfaces/mail.interface';
import {Notification} from '../interfaces/notification.interface';
import {fakeMails} from '../../../../../static-data/fakeMails';
import {NavigationService} from '../../../../../@vex/services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  api = '/notify/';
  private countNotes = new Subject<any>();
  countNotes$ = this.countNotes.asObservable();
  currentUser;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.countNew(this.currentUser.id).subscribe(v => {
        this.countNotes.next(v);
      });
    }
  }

  setCountNotes(count) {
    this.countNotes.next(count);
  }

  public getAll(userId: number): Observable<any> {
    return this.http.get(this.api + `get/all/${userId}`);
  }

  public countNew(userId: number): Observable<any> {
    return this.http.get(this.api + `new/byUserId/${userId}`);
  }

  public getById(id: number): Observable<any> {
    return this.http.get(this.api + `/get/${id}`);
  }

  markNoteAsRead(noteId: Notification['id']) {
    this.countNew(this.currentUser.id).subscribe(v => {
      console.log('v');
      console.log(v);
      this.countNotes.next(v - 1);
    });
    let note;
    this.getById(noteId).subscribe(val => {
      note = val;
      if (note.seen) {
        return;
      }

      // this.updateMail(noteId, {
      //   seen: true
      // });
    });
  }

  // updateMail(noteId: Notification['id'], update: Partial<Notification>) {
  //   const notes = [
  //     ...this.notifications.filter(m => m.id !== noteId),
  //     {
  //       ...this.getById(noteId),
  //       ...update
  //     }
  //   ];
  //
  //   this.notifications.next(notes);
  // }
}
