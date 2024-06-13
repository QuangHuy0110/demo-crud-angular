import { Injectable } from '@angular/core';
import { Product } from '../Types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { apiURL } from '../Constants/url';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productlist = new BehaviorSubject<Product[]>([]);

    constructor(private httpClient: HttpClient) { }

    fetchProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${apiURL}/products`).pipe(
            tap((products: Product[]) => {
                this.productlist.next(products);
            })
        );
    }

    getProducts(): Observable<Product[]> {
        return this.productlist.asObservable();
    }

    fetchProductById(id: number): Observable<Product> {
        return this.httpClient.get<Product>(`${apiURL}/products/${id}`)
    }
}
