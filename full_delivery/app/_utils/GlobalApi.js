//const { gql } = require("graphql-request");

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEDN_API_URL;

// /**
//  * Used to Make Get Category API request
//  * @returns
//  */

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
  }
} `,
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
