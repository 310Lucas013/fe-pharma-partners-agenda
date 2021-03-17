import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from 'src/models/Credentials';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {} as Credentials

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  login(cre : Credentials) {
    this.authService.login(cre)
      .subscribe(data => this.router.navigate(['/home']),
        error => console.log(error));
  }
}
