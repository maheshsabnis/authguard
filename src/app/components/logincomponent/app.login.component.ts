import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../../models/app.models';
import { UserManagementService } from '../../services/app.usermanagement.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './app.login.view.html'
})
export class LoginComponent implements OnInit {
  loginUser: LoginUser;
  status: string;
  returnUrl: string;
  constructor(private serv: UserManagementService,
              private act: ActivatedRoute,
              private router: Router) {
    this.loginUser = new LoginUser('', '');
    this.status = '';
  }

  ngOnInit(): void {
    this.returnUrl = this.act.snapshot.queryParams['returnUrl'] || '/';
  }
  clear(): void {
    this.loginUser = new LoginUser('', '');
  }
  save(): void {
    // this.serv.authUser(this.loginUser).subscribe((response) => {
    //    localStorage.setItem('roleInfo', response.Token);
    //    this.serv.authenticatedUserSubject.next(response);
    //    this.status = response.Message;
    // }, (error) => {
    //     this.status = `Error Occured while login ${error}`;
    // });
    alert(`login called ${JSON.stringify(this.loginUser)}`);
    this.serv.authUser(this.loginUser)
        .pipe(first())
        .subscribe(data => {
          this.router.navigate([this.returnUrl]);
        }, (error) => {
            this.status = `User Name or Password is wrong, please try again`;

        });
  }
}
