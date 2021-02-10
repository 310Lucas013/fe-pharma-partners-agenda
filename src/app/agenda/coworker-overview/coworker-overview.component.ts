import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coworker-overview',
  templateUrl: './coworker-overview.component.html',
  styleUrls: ['./coworker-overview.component.css']
})
export class CoworkerOverviewComponent implements OnInit {

  coworkerList: string[] = ['M.De Graaf', 'J.Barendse', 'W.Jongeneel', 'M.Vermeer', 'P.Willemse', 'C.De Vries'];
  coworkerShownList: string[] = this.coworkerList;

  searchName: string;

  constructor() { }

  ngOnInit(): void {
  }

  filterItems(arr, query): string[] {
    return arr.filter(value => {
      return value.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }


  search(): void {
    this.coworkerShownList = this.filterItems(this.coworkerList, this.searchName);
  }

}
