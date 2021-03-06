import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/Category';
import { CategoryService } from 'src/app/services/category.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css'],
})
export class ManageCategoriesComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  name!: string;
  image!: string;

  searchTerm!:any;

  editName!: string;
  editImage?: string;
  existingImage!: string;
  catId!: number;
  isVisible: boolean = true;
  selectedCat?: string;

  myControl = new FormControl<string | Category>('');
  options: Category[] = [];
  filteredOptions!: Observable<Category[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    (<HTMLInputElement>document.getElementById('image')).value = '';
    (<HTMLInputElement>document.getElementById('editImage')).value = '';

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

  }

  private _filter(name: string): Category[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  createCategory() {
    const newCategory = {
      name: this.name,
      image: this.image,
      visibility: true
    };

    if (!this.name) {
      this._snackBar.open('Please enter a name for category!', 'Close', {
        duration: 2000,
      });
    } else if (!this.image) {
      this._snackBar.open('Please upload an image!', 'Close', {
        duration: 2000,
      });
    } else {
      this.fileChanged();

      this.categoryService
        .addCategory(newCategory)
        .subscribe((category: Category) => this.categories.push(category));

      setTimeout(() => {
        this._snackBar.open( newCategory.name + ' created!', 'Close', {
          duration: 2000,
        });
        this.ngOnInit();
      }, 1000);

      this.name = '';
    }
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.dataSource = new MatTableDataSource<Category>(this.categories);
      this.dataSource.paginator = this.paginator;
      this.options =categories;
    });
  }

  fileChanged() {
    var inputElement: HTMLInputElement = document.getElementById(
      'image'
    )! as HTMLInputElement;
    this.image = 'assets/' + inputElement.files![0].name;
  }

  fileChangedEdit() {
    const inputElement: HTMLInputElement = document.getElementById(
      'editImage'
    ) as HTMLInputElement;
    this.editImage = 'assets/' + inputElement.files![0].name;
  }
  
  deleteConfirmation(event:any){
    this.catId = event.target.dataset.sectionvalue;
    this.categoryService.getCategory(this.catId).subscribe((category) => {
      this.selectedCat = category.name;
    });

  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.catId).subscribe();
    setTimeout(() => {
      this._snackBar.open(this.selectedCat + ' deleted!', 'Close', {
        duration: 2000,
      });
      this.ngOnInit();
    }, 100);

  }

  editCategory(event: any) {
    this.catId = event.target.dataset.sectionvalue;
    this.categoryService.getCategory(this.catId).subscribe((category) => {
      this.editName = category.name;
      this.existingImage = category.image;
    });
  }

  updateCategoryChanges() {
    const updateCategory = {
      name: this.editName,
      image: this.editImage == null ? this.existingImage : this.editImage,
      visibility: true,
      id: this.catId,
    };

    if (this.editImage != null) {
      this.fileChangedEdit();
    }

    this.categoryService.updateCategory(updateCategory).subscribe(() => {
      setTimeout(() => {
        this._snackBar.open( updateCategory.name + ' updated!', 'Close', {
          duration: 2000,
        });
        this.ngOnInit();
      }, 100);
    });
  }

  toggleVisibility(category:Category){
    category.visibility = !category.visibility;
    this.categoryService.updateVisiblity(category).subscribe();
  }

  search(){
    console.log(this.searchTerm)
    
    if(this.searchTerm){
      this.categoryService.getCategories().subscribe((categories) => {
        this.categories = categories.filter( categories =>
          (categories.name.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())
          ||categories.id==this.searchTerm)
        )
        this.dataSource = new MatTableDataSource<Category>(this.categories);
        this.dataSource.paginator = this.paginator;
      });
    }else{
      this.categoryService.getCategories().subscribe((categories) => {
        this.categories = categories;
        this.dataSource = new MatTableDataSource<Category>(this.categories);
        this.dataSource.paginator = this.paginator;
      });
    }
  }  
}
