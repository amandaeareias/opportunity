import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { categoriesList } from '../../../data/listsofdata/categorieslist'

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categoriesList: string[] = categoriesList;
  @Output() chosenCategory = new EventEmitter<string>()

  constructor() { }

  ngOnInit() {
  }

  chooseCategory(category) {
    this.chosenCategory.emit(category)
  }

}
