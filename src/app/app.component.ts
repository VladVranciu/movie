import { Component, OnInit, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent implements OnInit {
  private readonly primengConfig = inject(PrimeNGConfig);
  title = 'movies';

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
