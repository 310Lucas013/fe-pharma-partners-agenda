import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  searchBarText: string;

  constructor() { }

  ngOnInit(): void {
  }

  removeText(): void {
    if (this.searchBarText === '') {
      this.searchBarText = 'Typ hier om te zoeken';
    } else {
      this.searchBarText = '';
    }
  }

}
