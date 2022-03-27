import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Food } from 'src/app/interface/food';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pageTitle: string = 'Dimos Recipe App';
  food: Food[] = [];
  filteredFood: Food[] = [];
  private _listFilter: string = '';
  errMessage: string = '';
  form!: FormGroup;

  constructor(private homeService: HomeService) {}

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredFood = this.performFiltration(value);
  }

  performFiltration(filterBy: string): Food[] {
    filterBy = filterBy.toLowerCase();
    return this.food.filter((user: Food) =>
      user.name.toLowerCase().includes(filterBy)
    );
  }

  ngOnInit(): void {
    console.log('I Am loading on ngOnInit');
    this.listFilter = '';
    this.homeService.getFood().subscribe({
      next: (food) => {
        this.food = food;
        this.filteredFood = this.food;
      },
      error: (err) => (this.errMessage = err),
    });
  }
}
