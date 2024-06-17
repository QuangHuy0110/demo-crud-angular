import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, RegisterRequest } from '../../Service/auth.service';
import { Router } from '@angular/router';
import { checkMatchValidator } from '../../utils';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationService } from '../../Service/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  isLoading = false;

  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
  ) {

  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), checkMatchValidator()]],
      repeatPassword: ['', [Validators.required, checkMatchValidator()]]
    });
  }

  onSubmit() {
    const { email, password } = this.formRegister.getRawValue()
    if (!this.formRegister.valid) {
      return
    }

    this.isLoading = true;
    this.authService.register({ email, password }).subscribe(
      data => {
        this.isLoading = false;
        this.notificationService.createNotification('success', 'Success', 'Register success, please login!')
        this.router.navigate(['/login'])
      },
      err => {
        this.isLoading = false;
        this.notificationService.createNotification('error', 'Error', `register faild with error : ${err}!`)
      }
    )
  }

  // passChange () =>{
  //   ['password', 'repeatPassword'].forEach(item => {
  //     this.formRegister.get(item)?.updateValueAndValidity()
  //   })
  // }
  passChange() {
    ['password', 'repeatPassword'].forEach(item => {
      this.formRegister.get(item)?.updateValueAndValidity()
    })
  }
}
