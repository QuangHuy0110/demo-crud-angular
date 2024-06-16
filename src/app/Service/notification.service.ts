import { Injectable } from '@angular/core';
import { Product } from '../Types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { apiURL } from '../Constants/url';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(
    private notificationService: NzNotificationService,

  ) { }

  createNotification(type: 'success' | 'info' | 'warning' | 'error', title: string, content: string): void {
    this.notificationService.create(
      type,
      title,
      content,
      {
        nzDuration: 2000
      }
    );
  }
}
