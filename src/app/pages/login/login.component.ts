import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customPasswordValidator } from 'src/app/shared/service/validators/validatePassword.service';
import IsLogged from 'src/app/shared/service/isLoggedIn.service';
import { ILogInData } from 'src/app/shared/types/logIn';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isReg: boolean = false;
  isFormValid: boolean = false;

  applyForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, customPasswordValidator()])
  });

  constructor(private isLoggedInService: IsLogged, private router: Router) {
    this.applyForm.statusChanges.subscribe(() => {
      this.isFormValid = this.applyForm.valid;
    });
  }

  logIn() {
    if (this.isReg) {
      localStorage.clear();
    } else {
      if (this.applyForm.valid) {
        const email = this.applyForm.value.email;
        const password = this.applyForm.value.password;

        this.isLoggedInService.logInApp(email!, password!)
          .subscribe((loggedIn) => {
            if (loggedIn) {
              this.isReg = true;
              this.router.navigate(["result"]);
            } else {
              throw new Error("Invalid credentials");
            }
          });
      }
    }
  }
}
