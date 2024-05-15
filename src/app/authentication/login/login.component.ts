import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ThirdPartytoastyService } from 'src/app/shared/services/systemcore/third-partytoasty.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public routes = routes;
  public passwordClass = false;

  form = new FormGroup({
    userName: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(public auth: AuthService, private accountService: AccountService, private thirdPartytoastyService: ThirdPartytoastyService) { }
  ngOnInit(): void {
    if (localStorage.getItem('authenticated')) {
      localStorage.removeItem('authenticated');
    }
  }
  loading = false;
  loginFormSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.accountService.Login(this.form.value)
        .subscribe({
          next: (c: any) => {
            if (c["token"]) {
              localStorage.setItem('authenticated', 'true');
              sessionStorage.setItem("lebwoiubpaneltoken", c["token"]);
              localStorage.setItem("nameEn", c["nameEn"]);
              localStorage.setItem("userName", c["userName"]);
              sessionStorage.setItem("lstRoles", c["lstRoles"]);
              // setTimeout(() => {
              //   window.location.reload();
              // }, 10);
              this.thirdPartytoastyService.navigateTo(this.routes.adminDashboard)
            } else {
              alert(c['lstError'][0]);
              this.loading = false;
            }
          },
          error: err => {
            if (err.status == 400) {
              console.log(err);
              alert(err.error.message);
            }
          }
        });
    }
  }
  togglePassword() {
    this.passwordClass = !this.passwordClass;
  }
}
