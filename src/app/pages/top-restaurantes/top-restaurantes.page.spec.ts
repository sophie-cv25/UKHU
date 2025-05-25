import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopRestaurantesPage } from './top-restaurantes.page';

describe('TopRestaurantesPage', () => {
  let component: TopRestaurantesPage;
  let fixture: ComponentFixture<TopRestaurantesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRestaurantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
