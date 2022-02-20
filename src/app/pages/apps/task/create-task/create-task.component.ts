import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TaskService} from '../../../../core/service/task.service';
import {UserService} from '../../../../core/service/user.service';
import {User} from '../../../../core/model/user';
import {Task} from '../../../../core/model/task';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {take, takeUntil} from 'rxjs/operators';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'vex-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit, OnDestroy {
  currentUser: any;
  users: User[];
  public userCtrl: FormControl = new FormControl();
  public userFilterCtrl: FormControl = new FormControl();
  public filteredUsers: ReplaySubject<any> = new ReplaySubject(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject();


  task: Task = {
    employeeId: null,
    doctorId: null,
    complaints: '',
    recommendations: '',
    createdAt: null
  };  taskForm: FormGroup;
  constructor(private taskService: TaskService,
              private userService: UserService,
              public datePipe: DatePipe,
              private fb: FormBuilder) {
   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   this.taskForm = this.createTaskForm();
  }
  ngOnInit(): void {
    this.getAllUsers();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  protected setInitialValue() {
    this.filteredUsers
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          this.singleSelect.compareWith = (a: User, b: User) => a && b && a.id === b.id;
        });
  }

  /**
   * Write code on Method
   *
   * method logical code
   */
  protected filterBanks() {
    if (!this.users) {
      return;
    }

    let search = this.userFilterCtrl.value;
    if (!search) {
      this.filteredUsers.next(this.users.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredUsers.next(
        this.users.filter(user => user.firstName.toLowerCase().indexOf(search) > -1)
    );
  }
  createForm() {
    this.taskForm.controls.employeeId.setValue(this.userCtrl.value?.userId);
    this.taskService.createTask(this.taskForm.getRawValue()).subscribe(res => {
    });
  }
  getAllUsers(){
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.userCtrl.setValue(this.users[0]);
      this.filteredUsers.next(this.users.slice());

      this.userFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterBanks();
          });
    });
  }
  createTaskForm(): FormGroup {
    this.task.createdAt = Date.now();
    this.task.doctorId = this.currentUser.id;
    return this.fb.group({
      createdAt:  Date.now(),
      employeeId: [this.userCtrl.value?.userId],
      doctorId: this.currentUser.id,
      complaints: [this.task.complaints],
      recommendations: [this.task.recommendations]
    });
  }

}
