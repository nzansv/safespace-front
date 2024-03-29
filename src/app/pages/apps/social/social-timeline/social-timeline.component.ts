import { Component, OnInit } from '@angular/core';
import { friendSuggestions } from '../../../../../static-data/friend-suggestions';
import { FriendSuggestion } from '../social.component';
import icMail from '@iconify/icons-ic/twotone-mail';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icAdd from '@iconify/icons-ic/twotone-add';
import icWhatshot from '@iconify/icons-ic/twotone-whatshot';
import icWork from '@iconify/icons-ic/twotone-work';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icCheck from '@iconify/icons-ic/twotone-check';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../../@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../../@vex/animations/scale-in.animation';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import icAddAPhoto from '@iconify/icons-ic/twotone-add-a-photo';
import icPhotoFilter from '@iconify/icons-ic/twotone-photo-filter';
import icAttachFile from '@iconify/icons-ic/twotone-attach-file';
import icKeyboardArrowRight from '@iconify/icons-ic/twotone-keyboard-arrow-right';
import {UserService} from '../../../../core/service/user.service';
import {User} from '../../../../core/model/user';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'vex-social-timeline',
  templateUrl: './social-timeline.component.html',
  styleUrls: ['./social-timeline.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class SocialTimelineComponent implements OnInit {

  user = new User();

  constructor(private userService: UserService,
              private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.userService.getUserDetailsById(currentUser.id).subscribe(v => {
      this.user = v;
    });
  }

  updateUserDetails() {
    this.userService.updateUserDetails(this.user).subscribe(v => {

      this.snackbar.open('Your details successfully updated!', 'Close', {
        duration: 3000
      });
    }, error => {
      this.snackbar.open('Error occurred', 'Close', {
        duration: 3000
      });
    });
  }

  onChangeDate(value) {
    this.user.dateOfBirth = new Date(value).getTime();
  }
}
