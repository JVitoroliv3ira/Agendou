import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../core/services/api/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {finalize, take} from "rxjs";

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
    private toastr: ToastrService
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
        next: (response) => {
          this.router.navigate(['app', 'home']).then(r => {});
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
