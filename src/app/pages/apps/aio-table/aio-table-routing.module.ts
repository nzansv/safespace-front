import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import { AioTableComponent } from './aio-table.component';
import {AuthGuard} from '../../../core/guard/auth.guard';
import {EmpDashboardComponent} from './emp-dashboard/emp-dashboard.component';


const routes: VexRoutes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AioTableComponent,
    data: {
      toolbarShadowEnabled: true
    }
  } ,
  {
    path: ':empId',
    component: EmpDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class AioTableRoutingModule {
}
