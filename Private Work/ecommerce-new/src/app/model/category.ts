export class Category {
  id = 0;
  name = '';
  slug = '';
  description = '';
  products_count = 0;
  banner_image = '';
  subCategory?: Category[] = [];
}
