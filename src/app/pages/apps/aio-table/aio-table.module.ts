import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AioTableRoutingModule } from './aio-table-routing.module';
import { AioTableComponent } from './aio-table.component';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { CustomerCreateUpdateModule } from './customer-create-update/customer-create-update.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import {ChartModule} from '../../../../@vex/components/chart/chart.module';
import {WidgetQuickLineChartModule} from '../../../../@vex/components/widgets/widget-quick-line-chart/widget-quick-line-chart.module';
import {WidgetQuickValueCenterModule} from '../../../../@vex/components/widgets/widget-quick-value-center/widget-quick-value-center.module';
import {WidgetQuickValueStartModule} from '../../../../@vex/components/widgets/widget-quick-value-start/widget-quick-value-start.module';
import {WidgetLargeGoalChartModule} from '../../../../@vex/components/widgets/widget-large-goal-chart/widget-large-goal-chart.module';
import {WidgetAssistantModule} from '../../../../@vex/components/widgets/widget-assistant/widget-assistant.module';
import {WidgetLargeChartModule} from '../../../../@vex/components/widgets/widget-large-chart/widget-large-chart.module';
import {WidgetTableModule} from '../../../../@vex/components/widgets/widget-table/widget-table.module';
import {SecondaryToolbarModule} from '../../../../@vex/components/secondary-toolbar/secondary-toolbar.module';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CalendarModule} from '../calendar/calendar.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [AioTableComponent, EmpDashboardComponent],
  imports: [
    CommonModule,
    AioTableRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    CustomerCreateUpdateModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatMenuModule,
    IconModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ContainerModule,
    MatSelectModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    ChartModule,
    MatIconModule,
    WidgetQuickLineChartModule,
    WidgetQuickValueCenterModule,
    WidgetQuickValueStartModule,
    WidgetLargeGoalChartModule,
    IconModule,
    WidgetAssistantModule,
    WidgetLargeChartModule,
    WidgetTableModule,
    MatTableModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    PageLayoutModule,
    ContainerModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AioTableModule {
}
