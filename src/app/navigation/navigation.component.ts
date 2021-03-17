import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  searchBarText: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  removeText(): void {
    if (this.searchBarText === '') {
      this.searchBarText = 'Typ hier om te zoeken';
    } else {
      this.searchBarText = '';
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToAgenda(): void {
    this.router.navigate(['/agenda']);
  }

  navigateToPost(): void {
    this.router.navigate(['/post']);
  }

  navigateToSupport(): void {
    this.router.navigate(['/support']);
  }

  navigateToClientOverview(): void {
    this.router.navigate(['/clientoverview']);
  }
}
