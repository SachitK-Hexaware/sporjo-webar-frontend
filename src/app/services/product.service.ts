import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products, Product } from '../shared/models/product.model';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url : any;

  constructor(private http: HttpClient, private _api: ApiService) {}

  getAllProducts(limitOfResults = 9, page): Observable<Products> {
    return this.http.get<Products>(this.url + 'products', {
      params: {
        limit: limitOfResults.toString(),
        page: page,
      },
    });
  }

  getSingleProduct(id: Number): Observable<any> {
    // console.log(id);
    return this._api.getTypeRequest('products/' + id);
  }
  
  public getProducts(endpoint: string) : Observable<any>{
    return this.http.get<any>(endpoint); 
   }
   getQrCodeEndpoint : string =environment.apiUrl+'makeQrCode';
   public getQrCode(body: any) : Observable<any> {
    return this.http.post<any>(this.getQrCodeEndpoint, body);
  }
}
