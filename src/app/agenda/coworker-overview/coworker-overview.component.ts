import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coworker-overview',
  templateUrl: './coworker-overview.component.html',
  styleUrls: ['./coworker-overview.component.css']
})
export class CoworkerOverviewComponent implements OnInit {

  coworkerList: string[][] = [['M.De Graaf', 'Assistent'], ['J.Barendse', 'Huisarts'], ['W.Jongeneel', 'PharmaPartners Medewerker'], ['M.Vermeer', 'Huisarts']
    , ['P.Willemse', 'Planner'], ['C.De Vries', 'Beheerder']];
  coworkerShownList: string[][] = this.coworkerList;

  searchName: string;

  constructor() { }

  ngOnInit(): void {
  }

  filterItems(arr, query): string[][] {
    return arr.filter(value => {
      return value[0].toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }


  search(): void {
    this.coworkerShownList = this.filterItems(this.coworkerList, this.searchName);
  }

}
