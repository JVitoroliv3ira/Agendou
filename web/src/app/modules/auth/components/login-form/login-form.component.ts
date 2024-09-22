import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../core/services/api/auth.service";
import {Router} from "@angular/router";
import {finalize, take} from "rxjs";
import {AuthenticatedUserService} from "../../../../core/services/authenticated-user.service";

@Component({
  selector: 'agendou-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  public form!: FormGroup;
  public loading = false;
  public errors: { [key: string]: string[] } = {};


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticatedUserService: AuthenticatedUserService
  ) {
    this.setupForm();
  }

  public handleInputChangeEvent(input: string, value: string): void {
    this.form.patchValue({[input]: value});
  }

  public login(): void {
    this.loading = true;
    this.errors = {};
    this.authService
      .login(this.form.value)
      .pipe(take(1), finalize(() => this.loading = false))
      .subscribe({
        next: (res) => {
          if (res.content) {
            this.authenticatedUserService.saveUser(res.content);
          }
          this.router.navigate(['app', 'home']);
        },
        error: (errorResponse) => {
          this.errors = errorResponse.error.errors || {};
        }
      });
  }

  private setupForm(): void {
    this.form = this.formBuilder.group({
      email: [null],
      password: [null],
    });
  }
}
