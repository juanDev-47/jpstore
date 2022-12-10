export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category?: Category;
  rating?: {
    rate: number;
    count: number;
  };
  images: string[];
}

export interface ProductDTO extends Omit<Product, 'category' | 'id'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<ProductDTO>{ }
