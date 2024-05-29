import { Injectable } from '@angular/core';
import { Product } from '../Types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiURL } from '../Constants/url';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private httpClient: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${apiURL}/products`)
    }

    getProductById(id: number): Observable<Product> {
        return this.httpClient.get<Product>(`${apiURL}/products/${id}`)
    }
}
