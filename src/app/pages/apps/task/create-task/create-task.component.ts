import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TaskService} from '../../../../core/service/task.service';
import {UserService} from '../../../../core/service/user.service';
import {User} from '../../../../core/model/user';
import {Task} from '../../../../core/model/task';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {debounceTime, delay, filter, map, take, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    /** control for the selected users for server side filtering */
    public usersServerSideCtrl: FormControl = new FormControl();

    /** control for filter for server side. */
    public usersServerSideFilteringCtrl: FormControl = new FormControl();

    /** indicate search operation is in progress */
    public searching = false;

    /** list of users filtered after simulating server side search */
    public filteredServerSideUsers: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);

    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();

    employeeId: any;
    userDetail: any;

    task: Task = {
        employeeId: null,
        doctorId: null,
        complaints: '',
        recommendations: '',
        createdAt: null
    };
    taskForm: FormGroup;

    constructor(private taskService: TaskService,
                private userService: UserService,
                private activatedRoute: ActivatedRoute,
                public datePipe: DatePipe,
                private fb: FormBuilder,
                private snackBar: MatSnackBar) {
        this.employeeId = this.activatedRoute.snapshot.params['userId'];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.taskForm = this.createTaskForm();
    }

    ngOnInit(): void {
        this.getAllUsers();
        if (this.employeeId) {
            this.userService.getUserDetailsById(this.employeeId).subscribe(res => {
                this.userDetail = res;
            });
        }
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    createForm() {
        console.log(this.taskForm.getRawValue());
        // this.taskForm.controls.userId.setValue(this.usersServerSideCtrl.value?.userId);
        this.taskService.createOrUpdateTask(this.taskForm.getRawValue()).subscribe(res => {
            this.snackBar.open('Task successfully created!', '', {
                duration: 2000,
                horizontalPosition: 'center'
            });
        }, e => {
            this.snackBar.open('Something went wrong...', '', {
                duration: 2000,
                horizontalPosition: 'center'
            });
        });
    }

    getAllUsers() {
        this.userService.getUsers().subscribe(res => {
            this.users = res;
            this.usersServerSideFilteringCtrl.valueChanges
                .pipe(
                    filter(search => !!search),
                    tap(() => this.searching = true),
                    takeUntil(this._onDestroy),
                    debounceTime(200),
                    map(search => {
                        if (!this.users) {
                            return [];
                        }
                        return this.users.filter(user => user.firstName.indexOf(search) > -1 || user.lastName.indexOf(search) > -1);
                    }),
                    delay(500),
                    takeUntil(this._onDestroy)
                )
                .subscribe(filteredUsers => {
                        this.searching = false;
                        this.filteredServerSideUsers.next(filteredUsers);
                    },
                    error => {
                        this.searching = false;
                    });
        });
    }

    createTaskForm(): FormGroup {
        this.task.createdAt = Date.now();
        this.task.doctorId = this.currentUser.id;
        return this.fb.group({
            createdAt: Date.now(),
            employeeId: [this.employeeId],
            doctorId: this.currentUser.id,
            complaints: [this.task.complaints],
            recommendations: [this.task.recommendations]
        });
    }

}
