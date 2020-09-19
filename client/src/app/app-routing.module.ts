import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './auth/add-user/add-user.component';
import { LoginComponent } from './auth/login/login.component';
import { AddAssessmentComponent } from './shared/add-assessment/add-assessment.component';
import { AddPrincipalComponent } from './shared/add-principal/add-principal.component';
import { AddSchoolComponent } from './shared/add-school/add-school.component';
import { AddTeacherComponent } from './shared/add-teacher/add-teacher.component';
import { AdminDashboardComponent } from './shared/admin-dashboard/admin-dashboard.component';
import { AssignTeacherComponent } from './shared/assign-teacher/assign-teacher.component';
import { PrincipalAssessmentComponent } from './shared/principal-assessment/principal-assessment.component';
import { PrincipalDashboardComponent } from './shared/principal-dashboard/principal-dashboard.component';
import { TeacherAcademicAssessmentComponent } from './shared/teacher-academic-assessment/teacher-academic-assessment.component';
import { TeacherDashboardComponent } from './shared/teacher-dashboard/teacher-dashboard.component';
import { TeacherOtherAssessmentComponent } from './shared/teacher-other-assessment/teacher-other-assessment.component';
import { TeacherPeerAssessmentComponent } from './shared/teacher-peer-assessment/teacher-peer-assessment.component';
import { TeacherSelfAssessmentComponent } from './shared/teacher-self-assessment/teacher-self-assessment.component';


const routes: Routes = [
  {path: '',   redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'add_user', component: AddUserComponent},
  {path: 'add_assessment', component: AddAssessmentComponent},
  {path: 'add_principal', component: AddPrincipalComponent},
  {path: 'add_school', component: AddSchoolComponent},
  {path: 'add_teacher', component: AddTeacherComponent},
  {path: 'admin_dashboard', component: AdminDashboardComponent},
  {path: 'assign_teacher', component: AssignTeacherComponent},
  {path: 'principal_dashboard', component: PrincipalDashboardComponent},
  {path: 'principal_assessment', component: PrincipalAssessmentComponent},
  {path: 'teacher_dashboard', component: TeacherDashboardComponent},
  {path: 'teacher_self_assessment', component: TeacherSelfAssessmentComponent},
  {path: 'teacher_peer_assessment', component: TeacherPeerAssessmentComponent},
  {path: 'teacher_other_assessment', component: TeacherOtherAssessmentComponent},
  {path: 'teacher_academic_assessment', component: TeacherAcademicAssessmentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
