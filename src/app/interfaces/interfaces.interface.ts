export interface Product {
  '_id': string;
  'name': string;
  'image': string;
  'description': string;
  'brand': string;
  'category': string;
  'price': number;
  'qty'?: number;
  'countInStock': number;
  'rating': number;
  'numReviews': number;
}
