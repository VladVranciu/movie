import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly messageService = inject(MessageService);

  showWarningToast(message: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: 'warn',
      summary: message
    });
  }

  showErrorToast(message: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: 'error',
      summary: message
    });
  }
}
