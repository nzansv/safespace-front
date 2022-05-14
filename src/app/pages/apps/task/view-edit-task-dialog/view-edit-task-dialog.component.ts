import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../../core/model/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TaskService} from '../../../../core/service/task.service';
import {Task} from '../../../../core/model/task';

@Component({
  selector: 'vex-view-edit-task-dialog',
  templateUrl: './view-edit-task-dialog.component.html',
  styleUrls: ['./view-edit-task-dialog.component.scss']
})
export class ViewEditTaskDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public task: Task,
              private fb: FormBuilder,
              private taskService: TaskService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ViewEditTaskDialogComponent>,
              ) { }

  ngOnInit(): void {
  }

  updateTask() {
    console.log(this.task);
    this.taskService.createOrUpdateTask(this.task).subscribe(v => {
      this.dialogRef.close();
      this.snackBar.open('The task successfully updated!', 'Close', {
        duration: 3000
      });
    });
  }
}
