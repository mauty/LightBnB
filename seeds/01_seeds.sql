INSERT INTO users (name, email, password) VALUES ('Paskal Siakam','paskal@raptors.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Fred VanVleet','fred@raptors.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('OG Anonoby','og@raptors.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Lakehouse Cottage', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 200, 2, 2, 3, 'Canada', '123 Fake Street', 'Bracebridge', 'Ontario', 'L7R 2K9', TRUE),
  (2, 'Downtown Condo', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 250, 1, 2, 2, 'Canada', '123 Fake Street', 'Toronto', 'Ontario', 'M7R 2C6', TRUE),
  (3, 'Suburban House', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 300, 3, 2, 4, 'Canada', '123 Fake Street', 'Markham', 'Ontario', 'L3W 9D7', FALSE)
;

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES (2021-11-01, 2021-11-05, 2, 3),
(2021-11-12, 2021-11-17, 1, 2),
(2021-11-15, 2021-11-20, 3, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 1, 3, 4, 'message goes here'),
(1, 3, 1, 4, 'message goes here'),
(3, 2, 3, 5, 'message goes here');