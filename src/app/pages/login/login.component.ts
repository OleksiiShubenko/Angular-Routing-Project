import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from "../../core";
import {NavigationExtras, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message!: string;
  authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.setMessage();
  }

  onLogin(): void {
    this.message = 'Trying to log in ...';
    const observer = {
      next: () => {
        this.setMessage();
        if (this.authService.isLoggedIn) {

          //set strategy to preserve queryParams and fragment that were sent to these component
          const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
          };

          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          const redirect = this.authService.redirectUrl
            ? this.authService.redirectUrl
            : '/admin';
          // Redirect the user
          this.router.navigate([redirect], navigationExtras);
        }
      },
      error: (err: any) => console.log(err),
      complete: () => console.log('[takeUntilDestroyed] complete')
    };
    this.authService
      .login()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(observer);
  }

  onLogout(): void {
    this.authService.logout();
    this.setMessage();
  }

  private setMessage(): void {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

}
