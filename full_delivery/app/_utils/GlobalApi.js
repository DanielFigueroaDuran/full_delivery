//const { gql } = require("graphql-request");

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEDN_API_URL;

// /**
//  * Used to Make Get Category API request
//  * @returns
//  */

export const getlocalStorage = () => {
  const data = localStorage.getItem("orders");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

// const token = Cookies.get("token");

// if (!token) {
//   router.replace("/"); // Si no se encuentra el token, redirige a la página de inicio de sesión
//   return;
// }

// // Validar el token haciendo una llamada a la API
// const validateToken = async () => {
//   try {
//     const res = await fetch(MASTER_URL, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!res.ok) throw new Error("Token validation failed");
//   } catch (error) {
//     console.error(error);
//     router.replace("/"); // Redirige al inicio de sesión si la validación del token falla
//   }
// };

// validateToken();

export const getCategory = async () => {
  try {
    const response = await fetch(MASTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
         query Categories {
         categories(first: 50) {
         createdAt
         id
         slug
         name
         icon {
          url
        }
      }
    }
        `,
      }),
    });

    const data = await response.json();
    const result = data.data.categories;
    //console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
};

export const getBusiness = async (category) => {
  try {
    const response = await fetch(MASTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          `query GetBusiness {
            restaurants(where: {categories_some: {slug: "` +
          category +
          `"}}) {
    aboutUe
    address
    banner {
      url
    }
    categories {
      name
    }
    id
    name
    restroType
    slug
    workingHours
     review {
      star
    }
  }
}
        `,
      }),
    });

    const data = await response.json();
    //console.log(data.data.restaurants);
    const result = data.data;
    //console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
};

export const getBusinessDetail = async (bussinessSlug) => {
  try {
    const response = await fetch(MASTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          `query RestaurantDetail {
  restaurant(where: {slug: "` +
          bussinessSlug +
          `"}) {
    aboutUe
    address
    banner {
      url
    }
    categories {
      name
    }
    id
    name
    restroType
    slug
    workingHours
    menu {
      ... on Menu {
        id
        cate
        menuItem {
          ... on MenuItem {
            id
            name
            description
            price
            productImage {
              url
            }
          }
        }
      }
    }
          review {
      star
    }
  }
} `,
      }),
    });

    const data = await response.json();
    const result = data.data;
    //console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
};

export const addToCart = async (data) => {
  //console.log(data);
  try {
    const response = await fetch(MASTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          `mutation AddToCart {
  createUserCart(
    data: {email: "` +
          data?.email +
          `",
     price: ` +
          data.price +
          `,
      productDescription: "` +
          data.description +
          `",
       productImage: "` +
          data.productImage +
          `",
        productName: "` +
          data.name +
          `"
           restaurant: {connect: {slug: "` +
          data.restaurantSlug +
          `"}}
          }
  ) {
    id
  }
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}
 `,
      }),
    });

    const result = await response.json();
    // console.log(result);
    const results = result;
    return result;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
};

export const getUserCart = async (userEmail) => {
  try {
    const response = await fetch(MASTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          `
           query GetUserCart {
  userCarts(where: {
  email: "` +
          userEmail +
          `"}) {
    id
    price
    productDescription
    productImage
    productName
        restaurant {
      name
      banner {
        url
      }
      slug
    }
  }
}
           `,
      }),
    });

    const data = await response.json();
    const result = data.data;
    //console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
};

export const disconnectRestroFromUserCartIem = async (id) => {
  try {
    const response = await fetch(MASTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          `mutation DisconnectRestaurantFrontFromCartIem {
  updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "` +
          id +
          `"}) 
  {
    id
  }
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}

   `,
      }),
    });

    const data = await response.json();
    const result = data.data;
    //console.log(data.data);
    return result;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
};

export const deleteCartFromItem = async (id) => {
  try {
    const response = await fetch(MASTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          `
          mutation DeleteCartItem {
  deleteUserCart(where: {id: "` +
          id +
          `"}) {
    id
  }
}
   `,
      }),
    });

    const data = await response.json();
    //const result = data.extensions.requestId;
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
};

export const addNewReview = async (data) => {
  //console.log(data.userName);
  try {
    const response = await fetch(MASTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          `
      mutation AddNewReview {
  createReview(
    data: {
    email: "` +
          data.email +
          `",
    profileImage: "` +
          data.profileImage +
          `",
    reviewText: "` +
          data.reviewText +
          `",
    star: ` +
          data.star +
          `,
    userName: "` +
          data.userName +
          `",
    restaurant: {connect: {slug: "` +
          data.RestroSlug +
          `"}}}
  ) {
    id
  }
  publishManyReviews(to: PUBLISHED) {
    count
  }
}
   `,
      }),
    });

    const result = await response.json();
    //console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
};

export const getRestaurantReviews = async (slug) => {
  // console.log(slug);
  try {
    const response = await fetch(MASTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          `
          query RestaurantReviews {
  reviews(where: {restaurant: {slug: "` +
          slug +
          `"}},orderBy: publishedAt_ASC) {
    email
    id
    profileImage
    publishedAt
    userName
    star
    reviewText
  }
}
   `,
      }),
    });

    const data = await response.json();
    const result = data.data;
    // console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
};

export const createNewOrder = async (data) => {
  //console.log(data);
  try {
    const response = await fetch(MASTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          `
         mutation CreateNewOrder {
  createOrder(
    data: {
    email: "` +
          data.email +
          `",
    orderAmount: ` +
          data.orderAmount +
          `,
    restaurantName: "` +
          data.restaurantName +
          `",
    userName: "` +
          data.userName +
          `",
    phone: "` +
          data.phone +
          `",
    address: "` +
          data.address +
          `",
    zipCode: "` +
          data.zipCode +
          `"
    }
  )
    {
    id
  }
}
   `,
      }),
    });

    const results = await response.json();
    const result = results.data;
    //console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
};

export const updateOrderToAddOrderItems = async (name, price, id, email) => {
  //console.log(data);
  try {
    const response = await fetch(MASTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          `
          mutation UpdateOrderWithDetail {
  updateOrder(
    data: {orderDetail: {create: {OrderItem:
    {data: {
    name: "` +
          name +
          `",
    price: ` +
          price +
          `
    }}}}}
    where: {id: "` +
          id +
          `"}
  ) {
    id
  }
     publishManyOrders(to: PUBLISHED) {
    count
  }

  deleteManyUserCarts(where: {email:"` +
          email +
          `"}) {
    count
  }

}
   `,
      }),
    });

    const results = await response.json();
    const result = results.data;
    //console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
};

export const getUsersOrders = async (email) => {
  //console.log(data);
  try {
    const response = await fetch(MASTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          `
          query UserOrders {
  orders(where: {email: "` +
          email +
          `"},
          orderBy: publishedAt_DESC
          ) {
    address
    createdAt
    email
    id
    orderAmount
    orderDetail {
      ... on OrderItem {
        id
        name
        price
      }
    }
    phone
    restaurantName
    userName
    zipCode
  }
}
   `,
      }),
    });

    const data = await response.json();
    const result = data.data;
    //console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
};
