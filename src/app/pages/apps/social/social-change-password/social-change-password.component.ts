import { Component, OnInit } from '@angular/core';
import {ChangePasswordRequest} from '../../../../core/model/changePasswordRequest';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../../../core/service/auth.service';

@Component({
  selector: 'vex-social-change-password',
  templateUrl: './social-change-password.component.html',
  styleUrls: ['./social-change-password.component.scss']
})
export class SocialChangePasswordComponent implements OnInit {

  changePasswordRequest = new ChangePasswordRequest();

  constructor(private snackbar: MatSnackBar,
              private authService: AuthService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.changePasswordRequest.userId = currentUser.id;
  }

  ngOnInit(): void {
  }

  submit() {
    this.authService.changePassword(this.changePasswordRequest).subscribe(res => {
      this.snackbar.open(res, 'X', {
        duration: 2000,
        horizontalPosition: 'center'
      });
      console.log(res);
    });

  }
}
