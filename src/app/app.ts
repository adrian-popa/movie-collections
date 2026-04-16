import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { inject } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatTabsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('movie-collections');
  private router = inject(Router);

  get selectedIndex(): number {
    const url = this.router.url;
    if (url.startsWith('/collections')) return 1;
    return 0;
  }

  onTabChange(index: number) {
    if (index === 0) {
      this.router.navigate(['/movies']);
    } else if (index === 1) {
      this.router.navigate(['/collections']);
    }
  }
}
