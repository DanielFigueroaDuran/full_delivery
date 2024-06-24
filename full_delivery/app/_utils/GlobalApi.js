//const { gql } = require("graphql-request");

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEDN_API_URL;

// /**
//  * Used to Make Get Category API request
//  * @returns
//  */

// const GetCategory = async () => {
//   const query = gql`
//     query Categories {
//       categories(first: 50) {
//         createdAt
//         id
//         slug
//         name
//         icon {
//           url
//         }
//       }
//     }
//   `;
//   const result = await request(MASTER_URL, query);
//   return result;
// };

//const MASTER_URL = process.env.NEXT_PUBLIC_BACKEDN_API_URL;

// export const getCategoryList = async () => {
//   try {
//     const response = await fetch(MASTER_URL);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

export async function getCategory() {
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

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const result = data.data.categories;
    //console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
}

export async function getBusiness(category) {
  try {
    const response = await fetch(MASTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          `
         query GetBusiness {
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

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    //console.log(data.data.restaurants);
    const result = data.data.restaurants;
    // console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error);
  }
}
