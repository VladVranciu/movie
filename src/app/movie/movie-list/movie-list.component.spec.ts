import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Router } from '@angular/router';
import { ComponentsModule } from '@components/components.module';
import { ACTIVATED_ROUTE, MOCK_STORE } from '@mocks/test.mocks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MessageService } from 'primeng/api';
import { MovieListComponent } from './movie-list.component';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let store: MockStore;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsModule],
      declarations: [MovieListComponent],
      providers: [
        provideMockStore(MOCK_STORE),
        {
          provide: ActivatedRoute,
          useValue: ACTIVATED_ROUTE
        },
        MessageService
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set component attributes', () => {
    component.ngOnInit();
    expect(component.movies.length).toBe(1);
    expect(component.selectedCurrentPage).toBe(1);
    expect(component.selectedMovieId).toBe(866398);
    expect(component.isLoading).toBeFalse();
  });

  it('should select movie', () => {
    const spy1 = spyOn(store, 'dispatch');
    const spy2 = spyOn(router, 'navigate');

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    component.selectMovie(866398);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should change page', () => {
    const spy1 = spyOn(store, 'dispatch');

    expect(spy1).not.toHaveBeenCalled();
    component.onPageChange(866398);
    expect(spy1).toHaveBeenCalledTimes(2);
  });

  it('should try again', () => {
    const spy1 = spyOn(store, 'dispatch');

    expect(spy1).not.toHaveBeenCalled();
    component.tryAgain();
    expect(spy1).toHaveBeenCalledTimes(1);
  });
});
