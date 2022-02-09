import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/homecomponent/app.home.component';
import { AuthorizationGuardService } from './services/app.authguard.service';
import { UserRegistrationComponent } from './components/userregistration/app.userregistration.component';
import { LoginComponent } from './components/logincomponent/app.login.component';
import { RoleCreationComponent } from './components/admin/app.rolecreation.component';
import { Roles } from './models/app.models';
import { AdminComponent } from './components/admin/app.admin.component';
import { ApproveUserComponent } from './components/admin/app.approveuser.component';
import { ApproveOrderComponent } from './components/orders/app.approve.order.component';
import { ListOrdersComponent } from './components/orders/app.listorders.component';
import { CreateOrderComponent } from './components/orders/app.createorder.component';
import { EditOrderComponent } from './components/orders/app.edit.order.component';
import { ManagerComponent } from './components/manager/app.manager.component';
import { ClerkComponent } from './components/clerk/app.clerk.component';
import { UnAuthorizedComponent } from './components/unauth/app.unauthorized.component';

// defining routes
const routes: Routes = [
   {
     path: '', component: HomeComponent,
     canActivate: [AuthorizationGuardService]
   },
   {
     path: 'createuser', component: UserRegistrationComponent
   },
   {
     path: 'login', component: LoginComponent
   },
   {
     path: 'administrator', component: AdminComponent,
      canActivate: [AuthorizationGuardService],
     data: {roles: Roles.Administrator},
     children: [
       {
          path: 'createrole', component: RoleCreationComponent
       },
       {
         path: 'approveuser', component: ApproveUserComponent
       },
       {
         path: 'approveorder/:id', component: ApproveOrderComponent
       },
       {
         path: 'listorder', component: ListOrdersComponent
       },
       {
         path: 'createorder', component: CreateOrderComponent
       },
       {
         path: 'editorder/:id', component: EditOrderComponent
       }
     ]
   },
   {
    path: 'manager', component: ManagerComponent, canActivate: [AuthorizationGuardService],
    data: {roles: Roles.Manager},
    children: [
      {
        path: 'listorder', component: ListOrdersComponent
      },
      {
        path: 'createorder', component: CreateOrderComponent
      },
      {
        path: 'editorder/:id', component: EditOrderComponent
      },
      {
        path: 'approveorder', component: ApproveOrderComponent
      }
    ]
  },
  {
    path: 'clerk', component: ClerkComponent, canActivate: [AuthorizationGuardService],
    data: {roles: Roles.Clerk},
    children: [
      {
        path: 'listorder', component: ListOrdersComponent
      },
      {
        path: 'createorder', component: CreateOrderComponent
      },
      {
        path: 'editorder/:id', component: EditOrderComponent
      }
    ]
  },
  {
    path: 'unauthorized', component: UnAuthorizedComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
