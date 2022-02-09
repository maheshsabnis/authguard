import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/homecomponent/app.home.component';
import { LoginComponent } from './components/logincomponent/app.login.component';
import { CreateOrderComponent } from './components/orders/app.createorder.component';
import { EditOrderComponent } from './components/orders/app.edit.order.component';
import { ListOrdersComponent } from './components/orders/app.listorders.component';
import { AdminComponent } from './components/admin/app.admin.component';
import { ManagerComponent } from './components/manager/app.manager.component';
import { ClerkComponent } from './components/clerk/app.clerk.component';
import { ApproveOrderComponent } from './components/orders/app.approve.order.component';
import { UnAuthorizedComponent } from './components/unauth/app.unauthorized.component';
import { HttpClientModule } from '@angular/common/http';
import { UserRegistrationComponent } from './components/userregistration/app.userregistration.component';
import { RoleCreationComponent } from './components/admin/app.rolecreation.component';
import { ApproveUserComponent } from './components/admin/app.approveuser.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, LoginComponent,
    CreateOrderComponent,
    EditOrderComponent,
    ListOrdersComponent, AdminComponent, ManagerComponent,
    ClerkComponent, UserRegistrationComponent,
    RoleCreationComponent, ApproveUserComponent,
    ApproveOrderComponent, UnAuthorizedComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
