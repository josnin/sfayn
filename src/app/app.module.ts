import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ProductService } from './product.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {MaterialModule} from './material-module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(
        apollo: Apollo,
        httpLink: HttpLink
    ) {

    apollo.create({
    link: httpLink.create({ uri: 'http://192.168.1.120:4000/graphql/' }),
      cache: new InMemoryCache()
      });

   }

}
