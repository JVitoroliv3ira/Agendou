import {Component} from '@angular/core';
import {AuthService} from "../../../../core/services/api/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {finalize, take} from "rxjs";

@Component({
  selector: 'agendou-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {
  public form!: FormGroup;
  public loading = false;
  public errors: { [key: string]: string[] } = {};


  constructor(public authService: AuthService, public formBuilder: FormBuilder) {
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
          console.log('Registration successful', response);
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
