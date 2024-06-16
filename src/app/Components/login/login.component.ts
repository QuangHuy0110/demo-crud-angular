import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationService } from '../../Service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoading = false;

  formLogin: FormGroup;

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
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    const { email, password } = this.formLogin.getRawValue()
    if (!this.formLogin.valid) {
      return
    }

    this.isLoading = true;
    this.authService.login({ email, password }).subscribe(
      data => {
        this.isLoading = false;
        this.notificationService.createNotification('success', 'Success', 'login successfully!')
        this.router.navigate(['/products'])
      },
      err => {
        this.isLoading = false;
        this.notificationService.createNotification('error', 'Error', `login failed with error : ${err}!`)
      }
    )
  }
}
