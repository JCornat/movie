import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '@app/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
})
export class CategoryComponent {
  categoryService = inject(CategoryService);

  readonly categories = this.categoryService.categories;
}
