import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import { AioTableComponent } from './aio-table.component';
import {AuthGuard} from '../../../core/guard/auth.guard';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';


const routes: VexRoutes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      toolbarShadowEnabled: true
    },
    children: [
      {
        path: 'create-employee',
        component: CreateEmployeeComponent
      },
      {
        path: 'employee-list',
        component: AioTableComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class AioTableRoutingModule {
}
