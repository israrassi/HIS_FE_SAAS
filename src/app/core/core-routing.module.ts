import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/gaurd/auth.guard';
import { CoreComponent } from './core.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'settings/lookups',
        loadChildren: () => import('../Settings/lookups/lookups.module').then(m => m.LookupsModule)
      },
      {
        path: 'appointment/setup',
        loadChildren: () => import('../Appointments/appointments-setup/appointments-setup.module').then(m => m.AppointmentsSetupModule)
      },
      {
        path: 'appointment/list',
        loadChildren: () => import('../Appointments/appointment-list/appointment-list.module').then(m => m.AppointmentListModule)
      },
      {
        path: 'visits',
        loadChildren: () => import('../Appointments/visits-list/visits-list.module').then(m => m.VisitsListModule)
      },
      {
        path: 'visits/cu/:id',
        loadChildren: () => import('../Appointments/visits-cu/visits-cu.module').then(m => m.VisitsCuModule)
      },
      {
        path: 'visits/cu',
        loadChildren: () => import('../Appointments/visits-cu/visits-cu.module').then(m => m.VisitsCuModule)
      },
      {
        path: 'settings/visitautoservice',
        loadChildren: () => import('../Settings/Visits/visit-auto-service/visit-auto-service.module').then(m => m.VisitAutoServiceModule)
      },
      {
        path: 'settings/services',
        loadChildren: () => import('../Settings/Services/services-list/services-list.module').then(m => m.ServicesListModule)
      },
      {
        path: 'settings/services/cu/:id',
        loadChildren: () => import('../Settings/Services/add-service/add-service.module').then(m => m.AddServiceModule)
      },
      {
        path: 'settings/services/cu',
        loadChildren: () => import('../Settings/Services/add-service/add-service.module').then(m => m.AddServiceModule)
      },
      {
        path: 'settings/users',
        loadChildren: () => import('../Settings/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'settings/users/cu/:id',
        loadChildren: () => import('../Settings/add-user/add-user.module').then(m => m.AddUserModule)
      },
      {
        path: 'settings/users/cu',
        loadChildren: () => import('../Settings/add-user/add-user.module').then(m => m.AddUserModule)
      },
      {
        path: 'settings/departments',
        loadChildren: () => import('../Settings/Departments/departments/departments.module').then(m => m.DepartmentsModule)
      },
      {
        path: 'settings/departments/cu/:id',
        loadChildren: () => import('../Settings/Departments/add-department/add-department.module').then(m => m.AddDepartmentModule)
      },
      {
        path: 'settings/departments/cu',
        loadChildren: () => import('../Settings/Departments/add-department/add-department.module').then(m => m.AddDepartmentModule)
      },
      {
        path: 'settings/patients',
        loadChildren: () => import('../Settings/patients/patients.module').then(m => m.PatientsModule)
      },
      {
        path: 'settings/patients/cu/:id',
        loadChildren: () => import('../Settings/add-patients/add-patients.module').then(m => m.AddPatientsModule)
      },
      {
        path: 'settings/patients/cu',
        loadChildren: () => import('../Settings/add-patients/add-patients.module').then(m => m.AddPatientsModule)
      },
      {
        path: 'settings/doctors',
        loadChildren: () => import('../Settings/doctors/doctors.module').then(m => m.DoctorsModule)
      },
      {
        path: 'settings/doctors/cu/:id',
        loadChildren: () => import('../Settings/add-doctors/add-doctors.module').then(m => m.AddDoctorsModule)
      },
      {
        path: 'settings/doctors/cu',
        loadChildren: () => import('../Settings/add-doctors/add-doctors.module').then(m => m.AddDoctorsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'doctor',
        loadChildren: () =>
          import('./doctor/doctor.module').then((m) => m.DoctorModule),
      },
      {
        path: 'patient',
        loadChildren: () =>
          import('./patient/patient.module').then((m) => m.PatientModule),
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./staff/staff.module').then((m) => m.StaffModule),
      },
      {
        path: 'appointments',
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'doctor-schedule',
        loadChildren: () =>
          import('./doctor-schedule/doctor-schedule.module').then(
            (m) => m.DoctorScheduleModule
          ),
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('./departments/departments.module').then(
            (m) => m.DepartmentsModule
          ),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./accounts/accounts.module').then((m) => m.AccountsModule),
      },
      {
        path: 'payroll',
        loadChildren: () =>
          import('./payroll/payroll.module').then((m) => m.PayrollModule),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./chat/chat.module').then((m) => m.ChatModule),
      },
      {
        path: 'calls',
        loadChildren: () =>
          import('./calls/calls.module').then((m) => m.CallsModule),
      },
      {
        path: 'email',
        loadChildren: () =>
          import('./email/email.module').then((m) => m.EmailModule),
      },
      {
        path: 'blogs',
        loadChildren: () =>
          import('./blogs/blogs.module').then((m) => m.BlogsModule),
      },
      {
        path: 'assets',
        loadChildren: () =>
          import('./assets/assets.module').then((m) => m.AssetsModule),
      },
      {
        path: 'activities',
        loadChildren: () =>
          import('./activities/activities.module').then(
            (m) => m.ActivitiesModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./invoice/invoice.module').then((m) => m.InvoiceModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'components',
        loadChildren: () =>
          import('./components/components.module').then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./forms/forms.module').then((m) => m.FormsModule),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./tables/tables.module').then((m) => m.TablesModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'gallery',
        loadChildren: () =>
          import('./gallery/gallery.module').then((m) => m.GalleryModule),
      },
      {
        path: 'blank-page',
        loadChildren: () =>
          import('./blank-page/blank-page.module').then(
            (m) => m.BlankPageModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./calendar/calendar.module').then((m) => m.CalendarModule),
      },
      {
        path: 'edit-profile',
        loadChildren: () =>
          import('./edit-profile/edit-profile.module').then(
            (m) => m.EditProfileModule
          ),
      },
      {
        path: 'payment',
        loadChildren: () => import('../Payments/payment-checkout/payment-checkout.module').then((m) => m.PaymentCheckoutModule),
      },
      {
        path: 'paymentu',
        loadChildren: () => import('../Payments/payment-u/payment-u.module').then((m) => m.PaymentUModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
