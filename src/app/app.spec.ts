import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Router } from '@angular/router';

describe('App', () => {
  let fixture: any;
  let app: App;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/movies',
            navigate: vi.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should return selectedIndex 0 for /movies', () => {
    Object.defineProperty(router, 'url', { value: '/movies', configurable: true });
    expect(app.selectedIndex).toBe(0);
  });

  it('should return selectedIndex 1 for /collections', () => {
    Object.defineProperty(router, 'url', { value: '/collections', configurable: true });
    expect(app.selectedIndex).toBe(1);
  });

  it('should navigate to /movies on tab 0', () => {
    const spy = vi.spyOn(router, 'navigate');
    app.onTabChange(0);
    expect(spy).toHaveBeenCalledWith(['/movies']);
  });

  it('should navigate to /collections on tab 1', () => {
    const spy = vi.spyOn(router, 'navigate');
    app.onTabChange(1);
    expect(spy).toHaveBeenCalledWith(['/collections']);
  });
});
