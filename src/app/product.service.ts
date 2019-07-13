import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map, tap, filter  } from 'rxjs/operators';

import { PRODUCTS_SEARCH_CATEGORY_LIST_QUERY, PRODUCTS_QUERY, SHOPPING_CART_MUTATION } from './fragments';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

sharedProdObjSrc$ = new BehaviorSubject(null);
sharedProdObj$ = this.sharedProdObjSrc$.asObservable();



constructor(private apollo: Apollo) { }

    getProd(qry): Observable<any> {

        return this.apollo.watchQuery<any>(qry)
             .valueChanges
             .pipe(
                map(res => res.data.allProductparents.edges),
                map(res => res.map(r => r.node.parent2product.edges ) ),
                filter(res => res.length > 0)
              )
        };

    getCat(): Observable<any> {
        return this.apollo.watchQuery<any>({ query: PRODUCTS_SEARCH_CATEGORY_LIST_QUERY }).valueChanges
                 .pipe(
                    map(res => res.data ),
                    //  map(res => res.map(r => r.node.catName ) )
                    )
    }

    addCart(arg_user, arg_prod, arg_qty): Observable<any> {
        return this.apollo.mutate({
            mutation: SHOPPING_CART_MUTATION,
            variables: {
                user: arg_user,
                prod: arg_prod,
                qty: arg_qty
            }
            })
    
    }

    getShopCart(qry): Observable<any> {

        return this.apollo.watchQuery<any>(qry)
             .valueChanges
             .pipe(
                map(res => res.data.allShoppingCart.edges)
                )
                
    };

}
