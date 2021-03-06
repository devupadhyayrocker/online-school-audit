import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { NonTeachingComponent } from './shared/non-teaching/non-teaching.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './auth/add-user/add-user.component';
import { LoginComponent } from './auth/login/login.component';
import { AddAssessmentComponent } from './shared/add-assessment/add-assessment.component';
import { AddPrincipalComponent } from './shared/add-principal/add-principal.component';
import { AddSchoolComponent } from './shared/add-school/add-school.component';
import { AddStaffComponent } from './shared/add-staff/add-staff.component';
import { AdminDashboardComponent } from './shared/admin-dashboard/admin-dashboard.component';
import { AssignTeacherComponent } from './shared/assign-teacher/assign-teacher.component';
import { PrincipalAssessmentComponent } from './shared/principal-assessment/principal-assessment.component';
import { PrincipalDashboardComponent } from './shared/principal-dashboard/principal-dashboard.component';
import { TeacherAcademicAssessmentComponent } from './shared/teacher-academic-assessment/teacher-academic-assessment.component';
import { TeacherDashboardComponent } from './shared/teacher-dashboard/teacher-dashboard.component';
import { TeacherOtherAssessmentComponent } from './shared/teacher-other-assessment/teacher-other-assessment.component';
import { TeacherPeerAssessmentComponent } from './shared/teacher-peer-assessment/teacher-peer-assessment.component';
import { TeacherSelfAssessmentComponent } from './shared/teacher-self-assessment/teacher-self-assessment.component';
import { RoleGuard } from '../app/shared/services/guard/role-guard.guard';
import { NonTeachingSelfAssessmentComponent } from './shared/non-teaching-self-assessment/non-teaching-self-assessment.component';
import { NonTeachingPeerAssessmentComponent } from './shared/non-teaching-peer-assessment/non-teaching-peer-assessment.component';
import { EditorLoginComponent } from './auth/editor-login/editor-login.component';
import { AuditRecommendationComponent } from './shared/audit-recommendation/audit-recommendation.component';
import { AuditScoreInfoComponent } from './shared/audit-score-info/audit-score-info.component';
import { ConsolidateCroReportComponent } from './shared/consolidate-cro-report/consolidate-cro-report.component';
import { ConsolidateSchoolReportComponent } from './shared/consolidate-school-report/consolidate-school-report.component';
import { IndividualAuditReportComponent } from './shared/individual-audit-report/individual-audit-report.component';
import { ObserverFeedbackReportComponent } from './shared/observer-feedback-report/observer-feedback-report.component';
import { SchoolLoginComponent } from './auth/school-login/school-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/promoter_login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin_login', component: AdminLoginComponent
  },
  {
    path: 'editor_login', component: EditorLoginComponent
  },
  {
    path: 'promoter_login', component: SchoolLoginComponent
  },
  {
    path: 'add_user', component: AddUserComponent,
    data: { roles: ['admin'] },
    canActivate: [RoleGuard]
  },
  {
    path: 'add_assessment', component: AddAssessmentComponent,
    data: { roles: ['admin'] },
    canActivate: [RoleGuard]
  },
  {
    path: 'add_principal', component: AddPrincipalComponent,
    data: { roles: ['admin'] },
    canActivate: [RoleGuard]
  },
  {
    path: 'add_school', component: AddSchoolComponent,
    data: { roles: ['admin'] },
    canActivate: [RoleGuard]
  },
  {
    path: 'add_staff', component: AddStaffComponent,
    data: { roles: ['admin'] },
    canActivate: [RoleGuard]
  },
  {
    path: 'admin_dashboard', component: AdminDashboardComponent,
    data: { roles: ['admin'] },
    canActivate: [RoleGuard]
  },
  // {
  //   path: 'assign_teacher', component: AssignTeacherComponent,
  //   data: { roles: ['principal'] },
  //   canActivate: [RoleGuard]
  // },
  {
    path: 'principal_dashboard', component: PrincipalDashboardComponent,
    data: { roles: ['principal'] },
    canActivate: [RoleGuard]
  },
  // {
  //   path: 'principal_assessment', component: PrincipalAssessmentComponent,
  //   data: { roles: ['principal'] },
  //   canActivate: [RoleGuard]
  // }
  {
    path: 'teacher_dashboard', component: TeacherDashboardComponent,
    data: { roles: ['teaching'] },
    canActivate: [RoleGuard]
  },
  {
    path: 'nonteaching_dashboard', component: NonTeachingComponent,
    data: { roles: ['nonteaching'] },
    canActivate: [RoleGuard]
  },
  // {
  //   path: 'nonteaching_self_assessment', component: NonTeachingSelfAssessmentComponent,
  //   data: { roles: ['nonteaching'] },
  //   canActivate: [RoleGuard]
  // },
  // {
  //   path: 'nonteaching_peer_assessment', component: NonTeachingPeerAssessmentComponent,
  //   data: { roles: ['nonteaching'] },
  //   canActivate: [RoleGuard]
  // },
  // {
  //   path: 'teacher_self_assessment', component: TeacherSelfAssessmentComponent,
  //   data: { roles: ['teaching'] },
  //   canActivate: [RoleGuard]
  // },
  // {
  //   path: 'teacher_peer_assessment', component: TeacherPeerAssessmentComponent,
  //   data: { roles: ['teaching'] },
  //   canActivate: [RoleGuard]
  // },
  // {
  //   path: 'teacher_other_assessment', component: TeacherOtherAssessmentComponent,
  //   data: { roles: ['teaching'] },
  //   canActivate: [RoleGuard]
  // },
  {
    path: 'audit_recommendation', component: AuditRecommendationComponent,
    data: { roles: ['promoter'] },
    canActivate: [RoleGuard]
  },
  {
    path: 'audit_score_info', component: AuditScoreInfoComponent,
    data: { roles: ['promoter'] },
    canActivate: [RoleGuard]
  },
  {
    path: 'consolidate_cro_report', component: ConsolidateCroReportComponent,
    data: { roles: ['promoter'] },
    canActivate: [RoleGuard]
  },
  {
    path: 'consolidate_school_report', component: ConsolidateSchoolReportComponent,
    data: { roles: ['promoter'] },
    canActivate: [RoleGuard]
  },
  {
    path: 'individual_audit_report', component: IndividualAuditReportComponent,
    data: { roles: ['promoter'] },
    canActivate: [RoleGuard]
  },
  {
    path: 'observer_feedback_report', component: ObserverFeedbackReportComponent,
    data: { roles: ['promoter'] },
    canActivate: [RoleGuard]
  },
  {
    path: 'teacher_academic_assessment', component: TeacherAcademicAssessmentComponent,
    data: { roles: ['editor'] },
    canActivate: [RoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
