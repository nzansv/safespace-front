import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../../../core/service/task.service';
import {UserService} from '../../../../core/service/user.service';
import {User} from '../../../../core/model/user';
import {Task} from '../../../../core/model/task';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'vex-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  currentUser: any;
  users: User[];
  countries: User[];
  filteredCountries: User[] = [];
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
  createForm() {
    console.log(this.taskForm.getRawValue());
    this.taskService.createTask(this.taskForm.getRawValue()).subscribe(res => {
    });
  }
  getAllUsers(){
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }
  createTaskForm(): FormGroup {
    this.task.createdAt = Date.now();
    this.task.doctorId = this.currentUser.id;
    return this.fb.group({
      createdAt:  Date.now(),
      employeeId: [this.task.employeeId],
      doctorId: this.currentUser.id,
      complaints: [this.task.complaints],
      recommendations: [this.task.recommendations]
    });
  }

}
