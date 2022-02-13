import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../../../core/service/task.service';
import {UserService} from '../../../../core/service/user.service';
import {User} from '../../../../core/model/user';
import {Task} from '../../../../core/model/task';

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
  task: Task = {
    employeeId: null,
    doctorId: null,
    complaints: '',
    recommendations: '',
    createdAt: null
  };
  currentUser: any;
  users: User[];
  constructor(private taskService: TaskService, private userService: UserService) {
   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Test Tesov'},
    {value: 'pizza-1', viewValue: 'Adil Adilev'},
    {value: 'tacos-2', viewValue: 'Nazym Nazymova'},
  ];
  ngOnInit(): void {
  }
  createTask(){
    this.task.doctorId = this.currentUser.id;
    this.task.employeeId = 12;
    console.log("3r2r23");
    console.log(this.task);
    this.taskService.createTask(this.task).subscribe(res =>
    {
      console.log(res);
    });
  }

}
