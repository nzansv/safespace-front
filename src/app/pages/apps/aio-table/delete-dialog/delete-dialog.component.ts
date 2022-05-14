import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../../core/service/user.service';

@Component({
    selector: 'vex-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
    constructor(
        private userService: UserService,
        public dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

    close(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
    }

    deleteUser() {
        this.userService.deactivateUser(this.data).subscribe(response => {
            if (response.status === 200) {
                this.dialogRef.close('DELETED');
            } else {
                this.dialogRef.close('ERROR');
            }
        });
    }
}
