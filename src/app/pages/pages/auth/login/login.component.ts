import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import {fadeInUp400ms} from '../../../../../@vex/animations/fade-in-up.animation';
import {AuthService} from '../../../../core/service/auth.service';
import icLayers from '@iconify/icons-ic/twotone-layers';
import icAssigment from '@iconify/icons-ic/twotone-assignment';
import icMail from '@iconify/icons-ic/twotone-mail';
import icPersonOutline from '@iconify/icons-ic/twotone-person-outline';
import icBook from '@iconify/icons-ic/twotone-book';
import icContactSupport from '@iconify/icons-ic/twotone-contact-support';
import icDateRange from '@iconify/icons-ic/twotone-date-range';
import icChat from '@iconify/icons-ic/twotone-chat';
import icChromeReaderMode from '@iconify/icons-ic/twotone-chrome-reader-mode';
import icContacts from '@iconify/icons-ic/twotone-contacts';
import icAssessment from '@iconify/icons-ic/twotone-assessment';
import icLock from '@iconify/icons-ic/twotone-lock';
import icWatchLater from '@iconify/icons-ic/twotone-watch-later';
import icError from '@iconify/icons-ic/twotone-error';
import icAttachMoney from '@iconify/icons-ic/twotone-attach-money';
import icReceipt from '@iconify/icons-ic/twotone-receipt';
import icHelp from '@iconify/icons-ic/twotone-help';
import icBubbleChart from '@iconify/icons-ic/twotone-bubble-chart';
import icFormatColorText from '@iconify/icons-ic/twotone-format-color-text';
import icStar from '@iconify/icons-ic/twotone-star';
import icViewCompact from '@iconify/icons-ic/twotone-view-compact';
import icPictureInPicture from '@iconify/icons-ic/twotone-picture-in-picture';
import icUpdate from '@iconify/icons-ic/twotone-update';
import icSettings from '@iconify/icons-ic/twotone-settings';
import {NotificationService} from '../../../apps/mail/services/notification.service';
import {NavigationService} from '../../../../../@vex/services/navigation.service';
import {LayoutService} from '../../../../../@vex/services/layout.service';

@Component({
    selector: 'vex-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        fadeInUp400ms
    ]
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    inputType = 'password';
    visible = false;
    error = '';
    showError = false;
    c: string;

    icVisibility = icVisibility;
    icVisibilityOff = icVisibilityOff;

    constructor(private router: Router,
                private fb: FormBuilder,
                private cd: ChangeDetectorRef,
                private snackbar: MatSnackBar,
                private authService: AuthService,
                private notificationService: NotificationService
    ) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() {
        return this.form.controls;
    }

    send() {
        if (this.form.invalid) {
            this.error = 'Username and Password not valid!';
            console.log(this.error);
            return;
        } else {
            this.authService.login(this.f.username.value, this.f.password.value)
                .subscribe(res => {
                        if (res) {
                            console.log('user after login');
                            console.log(res);
                            this.notificationService.countNew(res.id).subscribe(v => {
                                console.log(v);
                                this.notificationService.countNotes.next(v);
                            });
                            this.router.navigate(['/']);
                            // this.snackbar.open('Lucky you! Looks like you need a password or username!
                            // For a real application we provide validators to prevent this. ;)', 'LOL THANKS', {
                            //   duration: 10000
                            // });
                        }
                    },
                    err => {
                        if (err.status === 401) {
                            this.showError = true;
                            this.error = 'Log in failed. Please try again!';
                        }
                    });
        }
    }

    toggleVisibility() {
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
}
