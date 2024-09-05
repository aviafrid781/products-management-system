import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Mark as standalone
  imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule], // Import RouterModule to use <router-outlet>
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'product-management-system';
  goToHome() {
    this.router.navigate(['/products-list']);
  }
}
