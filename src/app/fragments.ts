
import gql from 'graphql-tag';


export const originalImgInfo = gql`
    fragment originalImgInfo on ProductOriginalImgNodeEdge {
        node {
            id
  	    originalImg
            __typename
         }
    }
`;

export const warehouseInfo = gql`
    fragment warehouseInfo on ProductWarehouseNodeEdge {
        node {
            id
            warehouse
            price
            goodsState
            goodsNumber
            __typename
        }
    }
`;

export const parentSn2ProductInfo = gql`
fragment parentSn2ProductInfo on ProductNode {
  parentSn {
    parent2product {
      edges {
        node {
          id
          color          
        }
      }
    }
  }
}`;

export const parent2productInfo = gql`
    fragment parent2productInfo on ProductNodeEdge {
        node {
  	    id
  	    title
  	    sku
  	    parentId
  	    color
            goodsDesc
	    ...parentSn2ProductInfo
  	    originalImg {
    	        edges {
      	            ...originalImgInfo   
    	        }
  	    }
  	    warehouse {
    	        edges {
      	            ...warehouseInfo                  
    	        }
  	    }
        }
    }
    ${originalImgInfo}
    ${warehouseInfo}
    ${parentSn2ProductInfo}
`;


export const shopcartInfo = gql`
    fragment shopcartInfo on ShoppingCartNode {
            id
            quantity
            __typename
            product {
              id
              sku
              title
              color
              __typename
              warehouse {
                edges {
                    ...warehouseInfo
                }
              }
              originalImg(first: 1) {
                edges {
                    ...originalImgInfo
                }
              }
            }
            user {
              id
              username
              email
              __typename
            }
        }
    ${originalImgInfo}
    ${warehouseInfo}
`;

export const PRODUCTS_SEARCH_CATEGORY_QUERY = gql`
    query SearchProductByCategory($first: Int = 1, $catId: String!) 
        {
            allProductparents{
                edges {
                  node {
                    parent2product (first: $first , cat_CatId_In: $catId) {
                      edges {
                            ...parent2productInfo
                      }
                    }
                  }
                }
            }
     }
     ${parent2productInfo}
`;

//export const PRODUCTS_QUERY = gql`
//    query ProductQuery($first: Int = 1) 
//        {
//            allProductparents{
//                edges {
//                  node {
//                    parent2product (first: $first) {
//                      edges {
//                            ...parent2productInfo
//                      }
//                    }
//                  }
//                }
//            }
//     }
//     ${parent2productInfo}
//`;
//

const categoryInfo = gql`
    fragment categoryInfo on ProductCategoryNodeEdge {
     node {
        catName
        parentId
        catId
        level
      }
    }
`;

export const PRODUCTS_SEARCH_CATEGORY_LIST_QUERY = gql`
{
  level1: allProductcategory (level: 1) {
    edges {
        ...categoryInfo
    }
  }
  level2: allProductcategory (level: 2) {
    edges {
        ...categoryInfo
    }
  }
  level3: allProductcategory (level: 3) {
    edges {
        ...categoryInfo
    }
  }
}
${categoryInfo}
`;

//export const PRODUCTS_DETAIL_QUERY = gql`
//query SelectedProduct($id: ID!, $first: Int = 1) {
//  product (id: $id) {
//    sku
//    title
//    color
//    size
//    goodsDesc
//    parentSn {
//      parent2product {
//          edges {
//                ...parent2productInfo
//          }
//      }
//    }
//    warehouse {
//        edges {
//            ...warehouseInfo                  
//        }
//    }
//     originalImg {
//        edges {
//            ...originalImgInfo   
//        }
//    }
//  }
//}
//${parent2productInfo}
//${warehouseInfo}
//${originalImgInfo}
//`;


export const TOKEN_AUTH_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
      tokenAuth(username: $username, password: $password) {
        token
      }
    }
`;

export const VERIFY_TOKEN_MUTATION = gql`
    mutation VerifyToken($token: String!) {
      verifyToken(token: $token) {
        payload
      }
    }
`;

export const SHOPPING_CART_MUTATION = gql`
    mutation NewShopCart($user: ID!, $prod: ID!, $qty: ID!) {
      shoppingCart(user: $user, product: $prod, quantity: $qty) {
        shoppingCart {
          product {
            sku
            dateCreated
          }
        }
      }
    }
`

//export const SHOPPING_CART_QUERY = gql`
//    query ShopCartPerUser($user: ID!) {
//      allShoppingCart(user_Id: $user){
//        edges {
//          node {
//            quantity
//            product {
//              sku
//              title
//              color
//              warehouse {
//                edges {
//                  node {
//                    goodsNumber
//                    price
//                    warehouse
//                  }
//                }
//              }
//              originalImg(first: 1) {
//                edges {
//                  node {
//                    originalImg
//                  }
//                }
//              }
//            }
//            user {
//              id
//              username
//              email
//            }
//          }
//        }
//      }
//    }
//`
export const GET_ALL_PRODUCTS = gql`
    query GetProductList 
        {
            allProductparents{
                edges {
                  node {
                    id
                    parent2product {
                      edges {
                            ...parent2productInfo
                      }
                    }
                  }
                }
            }
     }
     ${parent2productInfo}
`;


export const GET_SHOP_CART = gql`
    query ShopCartPerUser($uid: ID!) {
      allShoppingCart(user_Id: $uid ){
          edges {
              node {
                ...shopcartInfo
              }
          }
      }
    }
    ${shopcartInfo}
`

export const GET_SHOP_CART_ADD_CHECKED = gql`
    query ShopCartPerUserResolver($uid: ID!) {
      allShoppingCart(user_Id: $uid ){
          edges {
              node {
                checked @client(always:true)
                ...shopcartInfo
              }
          }
      }
    }
    ${shopcartInfo}
`

export const GET_NAV = gql`
    fragment myNav on Nav {
          arrow_back
          side_bar
          menu
          component
    }

`;

export const GET_PRODUCT_DETAIL = gql`
    fragment ProductDetail on ProductNode {
  	    id
  	    title
  	    sku
  	    parentId
  	    color
        goodsDesc
	      ...parentSn2ProductInfo
  	    originalImg {
    	        edges {
      	            ...originalImgInfo   
    	        }
  	    }
  	    warehouse {
    	        edges {
      	            ...warehouseInfo                  
    	        }
  	    }
    }
    ${originalImgInfo}
    ${warehouseInfo}
    ${parentSn2ProductInfo}
`;

export const GET_PRODUCT_LIST = gql`
       query {
	    allProductparents {
	     edges {
		node {
		   id 
		   __typename
		   parent2product  {
			edges @client(always:true) {
			    node   {
				id
				title
				sku
				parentId
				color
				goodsDesc
				 __typename
				 originalImg {
				   edges @client(always:true) {
				    node {
				      id
				      originalImg
				      __typename
				    }
				  }
				}
				warehouse {
				  edges @client(always:true) {
				    node {
				      id
				      goodsNumber
				      goodsState
				      price
				      warehouse
				      __typename
				    }
				  }
				}
			    }
		       }
		   }
		} 
	     }
	    }

	}`;


//export const GET_SHOP_CART_ADD_CHECKED = gql`
//    query GetAllShopCartAddChecked {
//          allShopCartAddChecked @client {
//             allShoppingCart
//              __typename   
//          }
//}`
