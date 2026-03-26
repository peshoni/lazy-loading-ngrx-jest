import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainOutletComponent } from './main-outlet.component';
import { screen } from '@testing-library/angular';

describe('MainOutletComponent', () => {
  let component: MainOutletComponent;
  let fixture: ComponentFixture<MainOutletComponent>;
  
  beforeEach(() => {
    fixture = TestBed.createComponent(MainOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should have navigation', async () => {
    expect(await screen.findAllByTestId('navigation')).toBeTruthy();

    const navigation: HTMLElement = await screen.findByTestId('navigation');
    const menus: NodeListOf<HTMLAnchorElement> = navigation.querySelectorAll('a');
    expect(menus.length).toBe(2);
    expect(menus[0].text).toBe('users');
    expect(menus[1].text).toBe('vehicles');
  });
});
