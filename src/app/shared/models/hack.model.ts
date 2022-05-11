export interface Products {
    count: number;
    products: Product[];
  }
  
  export interface Product {
    _id?: string;
    name?: string;
    description?: string;
    ios_src?: number;
    short_description?: string;
    src?: string;
    category?: string;
    product_image_url?: string;
    price?: number;
    industry?: string
}