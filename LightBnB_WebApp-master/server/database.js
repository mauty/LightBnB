const properties = require('./json/properties.json');
const users = require('./json/users.json');


const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});



/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryUserWithEmail = `
  SELECT * FROM users
  WHERE users.email = $1
  `
  const values = [email];

  return pool
    .query(queryUserWithEmail, values)
    .then(results => {
      if (!results.rows) {
        return null
      }
      return results.rows[0]
    })
    .catch(err => console.log(err.message))
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryUserWithId = `
  SELECT * FROM users
  WHERE users.id = $1;
  `
  const values = [id];

  return pool
    .query(queryUserWithId, values)
    .then(results => {
      if (!results.rows) {
        return null
      }
      return results.rows[0]
    })
    .catch(err => console.log(err.message))
}
  // return Promise.resolve(users[id]);
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const query = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `
  const values = [user.name, user.email, user.password]

  return pool
    .query(query, values)
    .then(results => {
      results.rows[0]
    })
    .catch(error => console.log(error))

  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const query = `
  SELECT * FROM reservations
  WHERE guest_id = $1
  LIMIT $2;
  `
  const values = [guest_id, limit]

  return pool
    .query(query, values)
    .then(results => {
      return results.rows
    })
    .catch(error => console.log(error))
  
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */


const getAllProperties = (options, limit = 10) => {
  const queryParams = []
  
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating 
  FROM properties 
  JOIN property_reviews ON property_id = properties.id
  `;

  console.log('options', options)
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `WHERE owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}00`)
    queryString += ` AND cost_per_night > $${queryParams.length}`
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}00`)
    queryString += ` AND cost_per_night < $${queryParams.length}`
  }

  queryString += `
  GROUP BY properties.id
  `
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`)
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}`
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool
    .query(queryString, queryParams)
    .then(results => {
      console.log('results.rows ---->', results.rows)
      return results.rows
    })
      .catch(err => {
      console.log(err.message);
    });
};



// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
