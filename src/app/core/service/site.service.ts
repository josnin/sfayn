import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { 
  GET_NAV, 
} from '@/core/graphql';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  constructor(private apollo: Apollo) { }

  setNav({ 
      side_bar = true, 
      menu = true, 
      arrow_back = false, 
      component = null,
      __typename = 'Nav'
   } = {}
  ) {

    this.apollo.client.writeFragment({
      id: 'Nav:1',
      fragment: GET_NAV,
      data: { 
          side_bar,
          menu,
          arrow_back,
          component,
          __typename }, 
      })
  }

}