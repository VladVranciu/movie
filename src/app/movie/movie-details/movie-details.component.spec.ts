import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { ACTIVATED_ROUTE, MOCK_STORE, MOVIE } from '@mocks/test.mocks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MessageService } from 'primeng/api';
import { MovieDetailsComponent } from './movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let store: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
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


    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should dispatch setSelectedMovie', () => {
      const spy = spyOn(store, 'dispatch');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not dispatch getMovie when there is movie and set it', () => {
      const spy = spyOn(store, 'dispatch');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.selectedMovie).toEqual(MOVIE);
      expect(component.isLoadingMovie).toEqual(false);
    });
  });
});
