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
import { AddTeacherComponent } from './shared/add-teacher/add-teacher.component';
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
    AddTeacherComponent,
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
    NonTeachingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
