import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SiteService,
  ProductService,
  CartService,
} from '@/core/service';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss']
})
export class LayoutMainComponent implements OnInit, OnDestroy {
  title = 'sfayn';
  opened: boolean = true;
  menu$: any;
  loading: boolean = true;
  cartCount: number = 0 ;
  cartObj: any;
  subscriptions = new Subscription();

  constructor(
    private siteService: SiteService,
    private productService: ProductService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.loadNav());
    this.subscriptions.add(this.loadProducts());
  }

  loadNav() {
    this.siteService.navQuery()
      .valueChanges
      .pipe(map(res => res.data.Nav ))
      .subscribe(res => this.menu$ = res)
  }

  loadProducts() {
    this.productService.allProductsQuery()
      .valueChanges
      .subscribe(({data, loading}) => {
        this.subscriptions.add(this.loadCarts())
    });
  }

  loadCarts() {
    this.cartService.allCartsQuery()
      .valueChanges
      .subscribe(({data, loading}) => {
        const data2 = data.allShoppingCart.edges;
        const totalAmount = this.cartService.getTotalAmount(data2)
        const typeNameId = this.cartService.getTypeNameId(data2)

        const cartObj = {}
        cartObj['cartObj'] = data2;
        cartObj['totalAmount'] = totalAmount;
        cartObj['typeNameId'] = typeNameId;

        this.cartService.objSrc$.next(cartObj)
        this.cartCount =  data2.length;
        this.loading = loading;
        //console.log('cartObj', cartObj, this.cartCount)

    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
