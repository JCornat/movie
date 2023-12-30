import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '@app/category/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  categoryService = inject(CategoryService);

  categories = this.categoryService.categories;
}
