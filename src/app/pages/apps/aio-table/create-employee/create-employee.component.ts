import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icSmartphone from '@iconify/icons-ic/twotone-smartphone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import icMenu from '@iconify/icons-ic/twotone-menu';
import icCamera from '@iconify/icons-ic/twotone-camera';
import icPhone from '@iconify/icons-ic/twotone-phone';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {CountryState} from '../../../ui/forms/form-elements/form-elements.component';
import {DepartmentService} from '../../../../core/service/department.service';
import {Department} from '../../../../core/model/department';
import {AuthService} from '../../../../core/service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'vex-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  inputType = 'password';
  visible = false;

  icPhone = icPhone;
  icMenu = icMenu;
  icSmartphone = icSmartphone;
  icPerson = icPerson;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  createUserForm: FormGroup;
  departmentList: Department[];

  constructor(private cd: ChangeDetectorRef,
              private departmentService: DepartmentService,
              private authService: AuthService,
              private snackBar: MatSnackBar,) {
    this.createUserForm = new FormGroup({

      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required
      ),
      role: new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.departmentService.getAll().subscribe(v => {
      this.departmentList = v;
      console.log(this.departmentList);
    });
  }

  togglePassword() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  submit() {
    this.createUserForm.setValue({
      username: this.createUserForm.get('username').value,
      password: this.createUserForm.get('password').value,
      role: this.createUserForm.get('role').value,
      departmentId: parseInt(this.createUserForm.get('departmentId').value, 10)
    });
    console.log(this.createUserForm.value);
    this.authService.createUser(this.createUserForm.value).subscribe(v => {
      this.snackBar.open(v, '', {
        duration: 2000,
        horizontalPosition: 'center'
      });
    }, e => {
      this.snackBar.open('Unexpected error occurred, please try again later...', '', {
        duration: 3000,
        horizontalPosition: 'center'
      });
    });
  }
}
