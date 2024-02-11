import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MAX_PAGE, MIN_PAGE } from '@constants/constants';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() currentPage: number = 1;
  @Output() currentPageChanged: EventEmitter<number> = new EventEmitter();
  readonly MIN_PAGE = MIN_PAGE;
  readonly MAX_PAGE = MAX_PAGE;

  moveBackward() {
    if (this.currentPage > MIN_PAGE) {
      this.currentPageChanged.emit(this.currentPage - 1);
    }
  }

  moveForward() {
    if (this.currentPage < MAX_PAGE) {
      this.currentPageChanged.emit(this.currentPage + 1);
    }
  }
}
