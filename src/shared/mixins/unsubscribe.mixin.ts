import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export function UnsubscribeMixin() {
  return class implements OnDestroy {
    onDestroy$ = new Subject<void>();

    ngOnDestroy(): void {
      this.onDestroy$.next();
    }
  };
}
