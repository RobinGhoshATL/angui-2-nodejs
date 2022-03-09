import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  base_href=environment.base_href;
  all = 'product/all';
  add = 'product';
  update = 'product';
  delete = 'product/';
  add_products = 'product/bulkimport';
  get_product = 'product/';
  constructor(
    private http: HttpClient
  ) {
    
  }

  getProducts(){
    return this.http.get<any>(`${this.base_href}${this.all}`);
  }
  getProduct(id){
    return this.http.get<any>(`${this.base_href}${this.get_product}${id}`);
  }
  addProduct(value): Observable<any>  {
    return this.http.post<any>(`${this.base_href}${this.add}`, value);
  }
  updateProduct(value): Observable<any>  {
    return this.http.put<any>(`${this.base_href}${this.update}`, value);
  }
  deleteProduct(value):  Observable<any>  {
    return this.http.delete<any>(`${this.base_href}${this.delete}${value.id}`, value);
  }
  addProducts(value): Observable<any>  {
    return this.http.post<any>(`${this.base_href}${this.add_products}`, value);
  }
 
  
}

