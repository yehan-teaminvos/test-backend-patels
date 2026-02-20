-- ═══════════════════════════════════════════════
-- SEED DATA for Petals Florist Database
-- Generated at: 2026-02-20T10:00:25.716Z
-- ═══════════════════════════════════════════════

-- Test User
INSERT OR IGNORE INTO users (name, email, password, phone, created_at) VALUES ('Test User', 'test@example.com', '$2b$10$EG8yFfOuVS9O7MBZ/lUTsuda3zrILY6GkqnUZ73wfARSjeH6WOECO', '0771234567', 1771581625);

-- Occasions
INSERT OR IGNORE INTO occasions (name, slug) VALUES ('Weddings', 'weddings');
INSERT OR IGNORE INTO occasions (name, slug) VALUES ('Anniversary', 'anniversary');
INSERT OR IGNORE INTO occasions (name, slug) VALUES ('Graduation', 'graduation');
INSERT OR IGNORE INTO occasions (name, slug) VALUES ('Birthday', 'birthday');
INSERT OR IGNORE INTO occasions (name, slug) VALUES ('Sympathy', 'sympathy');
INSERT OR IGNORE INTO occasions (name, slug) VALUES ('Get Well', 'get-well');
INSERT OR IGNORE INTO occasions (name, slug) VALUES ('Thank You', 'thank-you');
INSERT OR IGNORE INTO occasions (name, slug) VALUES ('Just Because', 'just-because');

-- Colors
INSERT OR IGNORE INTO colors (name, slug, hex_code) VALUES ('Red', 'red', '#DC2626');
INSERT OR IGNORE INTO colors (name, slug, hex_code) VALUES ('Pink', 'pink', '#EC4899');
INSERT OR IGNORE INTO colors (name, slug, hex_code) VALUES ('White', 'white', '#FFFFFF');
INSERT OR IGNORE INTO colors (name, slug, hex_code) VALUES ('Yellow', 'yellow', '#EAB308');
INSERT OR IGNORE INTO colors (name, slug, hex_code) VALUES ('Purple', 'purple', '#9333EA');
INSERT OR IGNORE INTO colors (name, slug, hex_code) VALUES ('Orange', 'orange', '#EA580C');
INSERT OR IGNORE INTO colors (name, slug, hex_code) VALUES ('Mixed', 'mixed', '#8B5CF6');

-- Products
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-1', 'Blush Harmony', 'blush-harmony', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 8750, 'tulips', '/home/flower1.avif', 1, 2, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-2', 'Sunshine Radiance', 'sunshine-radiance', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'sunflowers', '/home/flower2.avif', 1, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-3', 'RedRose Bliss', 'redrose-bliss-3', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower3.avif', 1, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-4', 'RedRose Bliss', 'redrose-bliss-4', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower4.avif', 1, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-5', 'RedRose Bliss', 'redrose-bliss-5', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower3.avif', 1, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-6', 'RedRose Bliss', 'redrose-bliss-6', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower2.avif', 1, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-7', 'RedRose Bliss', 'redrose-bliss-7', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower4.avif', 1, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-8', 'RedRose Bliss', 'redrose-bliss-8', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower1.avif', 0, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-9', 'RedRose Bliss', 'redrose-bliss-9', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower1.avif', 1, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-10', 'Sunshine Radiance', 'sunshine-radiance-10', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'sunflowers', '/home/flower2.avif', 1, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-11', 'RedRose Bliss', 'redrose-bliss-11', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower3.avif', 1, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-12', 'RedRose Bliss', 'redrose-bliss-12', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower4.avif', 1, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-13', 'RedRose Bliss', 'redrose-bliss-13', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower3.avif', 1, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-14', 'RedRose Bliss', 'redrose-bliss-14', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower2.avif', 1, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-15', 'RedRose Bliss', 'redrose-bliss-15', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower4.avif', 1, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-16', 'RedRose Bliss', 'redrose-bliss-16', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower1.avif', 0, 4, 10, 1, 1771581625);
INSERT OR IGNORE INTO products (id, name, slug, description, price, flower_type, product_image, in_stock, average_rating, total_reviews, is_active, created_at) VALUES ('FL-17', 'RedRose Bliss', 'redrose-bliss-17', 'A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.', 5750, 'roses', '/home/flower1.avif', 1, 4, 10, 1, 1771581625);

-- Product-Occasion links
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-1', 3);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-1', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-1', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-2', 3);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-2', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-2', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-3', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-3', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-4', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-4', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-5', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-5', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-6', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-6', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-7', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-7', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-8', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-8', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-9', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-9', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-10', 3);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-10', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-10', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-11', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-11', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-12', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-12', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-13', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-13', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-14', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-14', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-15', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-15', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-16', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-16', 2);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-17', 1);
INSERT OR IGNORE INTO product_occasions (product_id, occasion_id) VALUES ('FL-17', 2);

-- Product-Color links
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-1', 7);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-2', 1);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-3', 3);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-4', 3);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-5', 3);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-6', 3);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-7', 3);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-8', 3);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-9', 3);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-10', 1);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-11', 3);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-12', 3);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-13', 3);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-14', 3);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-15', 3);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-16', 3);
INSERT OR IGNORE INTO product_colors (product_id, color_id) VALUES ('FL-17', 3);

-- Event Types
INSERT OR IGNORE INTO event_types (name, slug, description, image) VALUES ('Weddings', 'weddings', 'Beautiful wedding floral arrangements', '/event/service1.png');
INSERT OR IGNORE INTO event_types (name, slug, description, image) VALUES ('Corporate Events', 'corporate-events', 'Professional floral designs for corporate events', '/event/service2.png');
INSERT OR IGNORE INTO event_types (name, slug, description, image) VALUES ('Private Celebrations', 'private-celebrations', 'Custom floral arrangements for private celebrations', '/event/service3.png');
INSERT OR IGNORE INTO event_types (name, slug, description, image) VALUES ('Workshops', 'workshops', 'Floral design workshops and classes', '/event/service4.png');

-- Events
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (1, 'Bridal Florals', 'bridal-florals', 'Cinnamon Gardens, Colombo | August 18, 2025', '/event/event-services/wedding/w1.avif', 1, 'Ethereal Garden Romance', 'This garden wedding in the heart of Colombo was designed to reflect elegance, intimacy, and natural beauty.', 'The floral concept focused on creating a serene, romantic atmosphere.', 1, 1, 1771581625);
INSERT OR IGNORE INTO event_story_images (event_id, src, sort_order) VALUES (1, '/event/event-services/wedding/image1.png', 0);
INSERT OR IGNORE INTO event_story_images (event_id, src, sort_order) VALUES (1, '/event/event-services/wedding/image1.png', 1);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (2, 'Ceremony Design', 'ceremony-design', 'Grand ceremony arches and aisle arrangements.', '/event/event-services/wedding/w2.avif', 1, 'Ethereal Garden Romance', 'This garden wedding was designed to reflect elegance.', 'The floral concept focused on romance.', 1, 1, 1771581625);
INSERT OR IGNORE INTO event_story_images (event_id, src, sort_order) VALUES (2, '/event/event-services/wedding/image1.png', 0);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (3, 'Reception Decor', 'reception-decor', 'Elegant centerpieces and floral installations.', '/event/event-services/wedding/w3.avif', 1, NULL, NULL, NULL, 1, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (4, 'Special Touches', 'special-touches', 'Boutonnières, corsages, and cake flowers.', '/event/event-services/wedding/w4.avif', 1, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (5, 'Bridal Party Florals', 'bridal-party-florals', 'Stunning bridal bouquets and bridesmaid arrangements.', '/event/event-services/wedding/w5.avif', 1, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (6, 'Ceremony Arrangements', 'ceremony-arrangements', 'Grand ceremony arches and aisle arrangements.', '/event/event-services/wedding/w6.avif', 1, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (7, 'Reception Centerpieces', 'reception-centerpieces', 'Elegant centerpieces and floral installations.', '/event/event-services/wedding/w7.avif', 1, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (8, 'Finishing Touches', 'finishing-touches', 'Boutonnières, corsages, and cake flowers.', '/event/event-services/wedding/w3.avif', 1, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (9, 'Conference Florals', 'conference-florals', 'Professional floral arrangements for conferences and seminars.', '/event/service2.png', 2, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (10, 'Product Launches', 'product-launches', 'Eye-catching installations for product launch events.', '/event/service2.png', 2, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (11, 'Gala Dinners', 'gala-dinners', 'Sophisticated centerpieces for corporate gala dinners.', '/event/service2.png', 2, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (12, 'Office Events', 'office-events', 'Elegant arrangements for office celebrations.', '/event/service2.png', 2, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (13, 'Birthday Parties', 'birthday-parties', 'Vibrant floral designs for memorable birthday celebrations.', '/event/service3.png', 3, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (14, 'Anniversaries', 'anniversaries', 'Romantic arrangements for anniversary milestones.', '/event/service3.png', 3, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (15, 'Baby Showers', 'baby-showers', 'Delicate florals for baby showers and gender reveals.', '/event/service3.png', 3, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (16, 'Special Occasions', 'special-occasions', 'Custom designs for graduations, retirements, and holidays.', '/event/service3.png', 3, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (17, 'Beginner Classes', 'beginner-classes', 'Learn the fundamentals of floral design.', '/event/service4.png', 4, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (18, 'Seasonal Workshops', 'seasonal-workshops', 'Create beautiful seasonal arrangements with expert guidance.', '/event/service4.png', 4, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (19, 'Bridal Masterclass', 'bridal-masterclass', 'Master the art of creating stunning bridal bouquets.', '/event/service4.png', 4, NULL, NULL, NULL, 0, 1, 1771581625);
INSERT OR IGNORE INTO events (id, title, slug, short_description, cover_image, event_type_id, story_title, story_paragraph_1, story_paragraph_2, is_featured, is_published, created_at) VALUES (20, 'Team Building', 'team-building', 'Corporate team building through creative floral design.', '/event/service4.png', 4, NULL, NULL, NULL, 0, 1, 1771581625);

-- Flowers
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (1, 'Temple Flowers', '/event/event-services/wedding/flowers/flower1.avif');
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (2, 'Garden Roses', '/event/event-services/wedding/flowers/flower2.avif');
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (3, 'Orchids', '/event/event-services/wedding/flowers/flower3.avif');
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (4, 'Peonies', '/event/event-services/wedding/flowers/flower2.avif');
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (5, 'Hydrangeas', '/event/event-services/wedding/flowers/flower3.avif');
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (6, 'Roses', '/event/event-services/wedding/flowers/flower2.avif');
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (7, 'Lilies', '/event/event-services/wedding/flowers/flower3.avif');
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (8, 'Baby''s Breath', '/event/event-services/wedding/flowers/flower2.avif');
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (9, 'Carnations', '/event/event-services/wedding/flowers/flower3.avif');
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (10, 'Ranunculus', '/event/event-services/wedding/flowers/flower3.avif');
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (11, 'Eucalyptus', '/event/event-services/wedding/flowers/flower2.avif');
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (12, 'Dahlias', '/event/event-services/wedding/flowers/flower3.avif');
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (13, 'Chrysanthemums', '/event/event-services/wedding/flowers/flower2.avif');
INSERT OR IGNORE INTO flowers (id, name, image) VALUES (14, 'Tulips', '/event/event-services/wedding/flowers/flower3.avif');

-- Event-Flower links
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (1, 1);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (1, 2);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (1, 3);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (2, 1);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (2, 4);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (2, 5);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (3, 1);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (3, 6);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (3, 7);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (4, 1);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (4, 8);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (4, 9);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (5, 1);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (5, 2);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (5, 10);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (6, 1);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (6, 11);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (6, 12);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (7, 1);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (7, 13);
INSERT OR IGNORE INTO event_flowers (event_id, flower_id) VALUES (7, 14);
