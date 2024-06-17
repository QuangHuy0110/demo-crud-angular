import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { NotificationService } from '../Service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  canActivate(): boolean {
    if (this.authService.checkLogin()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.notificationService.createNotification('warning', 'Warning', 'You are not authorized to this page, please login!')
      return false;
    }
  }
}
