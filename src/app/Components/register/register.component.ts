import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../Service/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  isLoading = false;

  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formRegister = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      },
      { validator: this.mustMatch('password', 'repeatPassword') }
    );
  }

  onSubmit() {
    this.formRegister.markAllAsTouched();
    Object.values(this.formRegister.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    });
    if (!this.formRegister.valid) {
      return;
    }
    const { email, password } = this.formRegister.getRawValue();
    this.isLoading = true;
    this.authService.register({ email, password }).subscribe(
      (data) => {
        this.isLoading = false;
        this.notificationService.createNotification(
          'success',
          'Success',
          'Register success, please login!'
        );
        this.router.navigate(['/login']);
      },
      (err) => {
        this.isLoading = false;
        this.notificationService.createNotification(
          'error',
          'Error',
          `register faild with error : ${err}!`
        );
      }
    );
  }

  passChange() {
    ['password', 'repeatPassword'].forEach((item) => {
      this.formRegister.get(item)?.updateValueAndValidity();
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ noMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
