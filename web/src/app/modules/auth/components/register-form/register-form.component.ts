import {Component} from '@angular/core';
import {AuthService} from "../../../../core/services/api/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {finalize, take} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'agendou-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {
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

  public register(): void {
    this.errors = {};
    this.loading = true;
    this.authService
      .register(this.form.value)
      .pipe(take(1), finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.router.navigate(['auth', 'login']).then(() => {
            this.toastr
              .success(
                response.content ?? 'Usuário cadastrado com sucesso!',
                'Sucesso', {
                  timeOut: 3000,
                  closeButton: true,
                  progressBar: true
                }
              )
          });
        },
        error: (errorResponse) => {
          this.errors = errorResponse.error.errors || {};
        }
      });
  }

  private setupForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      email: [null],
      password: [null],
    });
  }
}
