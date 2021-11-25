SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
FROM reservations
JOIN users ON guest_id = users.id
JOIN properties ON property_id = properties.id
JOIN property_reviews ON reservation_id = reservations.id
WHERE users.id = 1 AND end_date < now()::DATE
GROUP BY reservations.id, properties.id
ORDER BY start_date DESC;