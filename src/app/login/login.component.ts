import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Credentials} from 'src/app/shared/models/Credentials';
import {AuthService} from '../shared/services/auth/auth.service';
import {TokenStorageService} from '../shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {} as Credentials;

  constructor(private router: Router, private authService: AuthService, private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
  }

  navigateToHome(): void {
    // this.router.navigate(['/home']);
  }

  login(): void {
    this.authService.login(this.credentials)
      .subscribe(data => {
        this.tokenService.saveToken(data.token);
        this.router.navigate(['/verify']);
      },
        error => console.log(error));
  }

  register(): void {
    this.authService.register(this.credentials)
      .subscribe(
        error => console.log(error));
  }
}
