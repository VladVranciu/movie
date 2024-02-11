import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APIInterceptor } from '@interceptors/api.interceptor';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { MovieModule } from './movie/movie.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MessageModule,
    ToastModule,
    CommonModule,
    MovieModule,
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    BrowserAnimationsModule
  ],
  declarations: [AppComponent],
  providers: [provideHttpClient(withInterceptors([APIInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule {}
