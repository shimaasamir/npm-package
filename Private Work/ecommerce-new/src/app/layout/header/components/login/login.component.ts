import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/API/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogin = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentLoggedIn.subscribe(
      (isLogin) => (this.isLogin = isLogin)
    );
  }

  logout(): void {
    // this.router.navigate(['./']);
    location.reload();
    this.authService.logOut();
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}
