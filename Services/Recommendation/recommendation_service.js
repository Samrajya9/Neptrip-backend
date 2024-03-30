const service_error_handler = require("../../Abstraction/service_error_handler");
const Entity = require("../../Functions/ORM/Repositry");
const connection = require("../../Models/connection");
const categories = new Entity("categories");
const destinationratings = new Entity("destinationratings");

const recommendation_service = service_error_handler(async (req, res) => {
  const user_id = req.id;
  const result = await categories.findAll();
  const uniqueCategory = result.map((element) => element.name);
  console.log(uniqueCategory);
  const destination = await getdestinationforUser(user_id);
  const ratedDest = [];
  const noRatingDest = [];
  destination.map((element) => {
    if (
      element.destination_rating === null ||
      element.destination_rating === undefined
    ) {
      noRatingDest.push(element);
    } else {
      ratedDest.push(element);
    }
  });
  console.log(ratedDest);
  const categoryRatingForUser = await UserdestPrefence(
    ratedDest,
    uniqueCategory
  );
  const predication = await calculateRating(
    categoryRatingForUser,
    noRatingDest
  );
  console.log(ratedDest);
  console.log(noRatingDest);
  console.log(categoryRatingForUser);
  console.log(predication);
  const response = {
    predication,
  };
  return { data: response };
});

const create_recommendation_service = service_error_handler(
  async (req, res) => {
    const rating = req.query.rating;
    const destination_id = req.query.d_id;

    const user_id = req.id;
    const data = {
      rating,
      destination_id,
      user_id,
    };
    // data.user_id = user_id;
    const result = destinationratings.create(data);
    const response = {
      data: result,
    };
    return response;
  }
);

async function getdestinationforUser(user_id) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
    d.id AS destination_id,
    d.name AS destination_name,
    d.Description AS destination_description,
    d.img_url AS destination_img_url,
    districts.name AS district_name,
    GROUP_CONCAT(c.name) AS category_names,
    dr.rating AS destination_rating
FROM
    destinations d
LEFT JOIN
    destinationCategories dc ON d.id = dc.destination_id
LEFT JOIN
    categories c ON dc.category_id = c.id
LEFT JOIN
    districts ON d.district_id = districts.id
LEFT JOIN
    destinationRatings dr ON d.id = dr.destination_id AND dr.user_id = ?
    GROUP BY d.id, dr.rating;
 
`;
    connection.query(query, [user_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
async function UserdestPrefence(ratedDestination, uniqueCategory) {
  let allCatgoryTotalRating = 0;
  const response = [];
  for (const element of uniqueCategory) {
    let categoryRating = 0;
    for (const destination of ratedDestination) {
      const categoryArray = destination.category_names.split(",");
      if (categoryArray.includes(element)) {
        categoryRating += destination.destination_rating;
      }
    }
    allCatgoryTotalRating += categoryRating;
    response.push({
      category: element,
      rating: categoryRating,
    });
  }
  response.map((element) => {
    const aggregateRating = element.rating / allCatgoryTotalRating;
    element.aggregate = aggregateRating;
  });

  return response;
}
async function calculateRating(categoryRatingForUser, noRatingDest) {
  const updatedDestinations = [];

  // Iterate over destinations with no ratings
  for (const element of noRatingDest) {
    let futureRating = 0;
    console.log(element);
    const categoryArray = element.category_names.split(",");

    // Calculate future rating based on category preferences
    for (const category of categoryArray) {
      // Find the category's aggregate rating for the user
      const categoryRating = categoryRatingForUser.find(
        (ele) => ele.category === category
      );
      if (categoryRating) {
        futureRating += categoryRating.aggregate;
      }
    }

    // Assign the calculated future rating to the destination
    element.futureRating = futureRating;
    updatedDestinations.push(element);
  }

  // Sort destinations by futureRating in descending order
  updatedDestinations.sort((a, b) => b.futureRating - a.futureRating);

  return updatedDestinations;
}

module.exports = { recommendation_service, create_recommendation_service };
