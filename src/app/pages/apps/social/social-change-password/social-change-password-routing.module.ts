import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import {SocialChangePasswordComponent} from './social-change-password.component';


const routes: Routes = [
    {
        path: '',
        component: SocialChangePasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, QuicklinkModule]
})
export class SocialChangePasswordRoutingModule {
}
