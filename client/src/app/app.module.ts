import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './shared/admin-dashboard/admin-dashboard.component';
import { AddSchoolComponent } from './shared/add-school/add-school.component';
import { AddPrincipalComponent } from './shared/add-principal/add-principal.component';
import { AddStaffComponent } from './shared/add-staff/add-staff.component';
import { PrincipalDashboardComponent } from './shared/principal-dashboard/principal-dashboard.component';
import { AssignTeacherComponent } from './shared/assign-teacher/assign-teacher.component';
import { TeacherDashboardComponent } from './shared/teacher-dashboard/teacher-dashboard.component';
import { TeacherSelfAssessmentComponent } from './shared/teacher-self-assessment/teacher-self-assessment.component';
import { TeacherPeerAssessmentComponent } from './shared/teacher-peer-assessment/teacher-peer-assessment.component';
import { TeacherOtherAssessmentComponent } from './shared/teacher-other-assessment/teacher-other-assessment.component';
import { AddUserComponent } from './auth/add-user/add-user.component';
import { AddAssessmentComponent } from './shared/add-assessment/add-assessment.component';
import { PrincipalAssessmentComponent } from './shared/principal-assessment/principal-assessment.component';
import { TeacherAcademicAssessmentComponent } from './shared/teacher-academic-assessment/teacher-academic-assessment.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NonTeachingComponent } from './shared/non-teaching/non-teaching.component';
import { NonTeachingSelfAssessmentComponent } from './shared/non-teaching-self-assessment/non-teaching-self-assessment.component';
import { NonTeachingPeerAssessmentComponent } from './shared/non-teaching-peer-assessment/non-teaching-peer-assessment.component';
import { CommonService } from './shared/services/common/common.service';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EditorLoginComponent } from './auth/editor-login/editor-login.component';
import { AuditScoreInfoComponent } from './shared/audit-score-info/audit-score-info.component';
import { ConsolidateSchoolReportComponent } from './shared/consolidate-school-report/consolidate-school-report.component';
import { ConsolidateCroReportComponent } from './shared/consolidate-cro-report/consolidate-cro-report.component';
import { IndividualAuditReportComponent } from './shared/individual-audit-report/individual-audit-report.component';
import { ObserverFeedbackReportComponent } from './shared/observer-feedback-report/observer-feedback-report.component';
import { AuditRecommendationComponent } from './shared/audit-recommendation/audit-recommendation.component';
import { ChartsModule } from 'ng2-charts';
import { SchoolLoginComponent } from './auth/school-login/school-login.component';
import {NgxPrintModule} from 'ngx-print';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    AdminDashboardComponent,
    AddSchoolComponent,
    AddPrincipalComponent,
    AddStaffComponent,
    PrincipalDashboardComponent,
    AssignTeacherComponent,
    TeacherDashboardComponent,
    TeacherSelfAssessmentComponent,
    TeacherPeerAssessmentComponent,
    TeacherOtherAssessmentComponent,
    AddUserComponent,
    AddAssessmentComponent,
    PrincipalAssessmentComponent,
    TeacherAcademicAssessmentComponent,
    NonTeachingComponent,
    NonTeachingSelfAssessmentComponent,
    NonTeachingPeerAssessmentComponent,
    AdminLoginComponent,
    EditorLoginComponent,
    AuditScoreInfoComponent,
    ConsolidateSchoolReportComponent,
    ConsolidateCroReportComponent,
    IndividualAuditReportComponent,
    ObserverFeedbackReportComponent,
    AuditRecommendationComponent,
    SchoolLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ChartsModule,
    NgxPrintModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [CommonService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
