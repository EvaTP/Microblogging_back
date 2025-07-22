INSERT INTO status (role)
VALUES
('admin'),
('user');

INSERT INTO users (firstname, lastname, email, password, status_id, user_biography)
VALUES 
  ('Eva', 'Tharrats', 'eva@travelers.com', 'mdpHashEva', 2, 'J’adore les volcans d’Islande.'),
  ('Ahmed', 'Ayari', 'ahmed@travelers.com', 'mdpHashAhmed', 1, 'Toujours entre deux avions ✈️.'),
  ('Camille', 'Lebigot', 'camille@travelers.com', 'mdpHashCamille', 1, 'En quête du plus beau coucher de soleil 🌅.');


INSERT INTO posts (description, url_pictures, user_id, hashtag, created_at, updated_at) VALUES
('Coucher de soleil magique à Santorin 🌅', 'https://picsum.photos/id/201/600/400', 1, '#santorini #sunset #travel', '2025-07-01', '2025-07-01'),
('Rizières de Bali sous la pluie ☔️', 'https://picsum.photos/id/202/600/400', 2, '#bali #nature #wanderlust', '2025-07-02', '2025-07-02'),
('Road trip à travers la Californie 🚗🇺🇸', 'https://picsum.photos/id/203/600/400', 3, '#california #roadtrip #usa', '2025-07-03', '2025-07-03'),
('Perdu dans les ruelles de Chefchaouen 🔵', 'https://picsum.photos/id/204/600/400', 1, '#morocco #bluecity #travelgram', '2025-07-04', '2025-07-04'),
('Safari au Kenya – Lions en liberté 🦁', 'https://picsum.photos/id/205/600/400', 2, '#kenya #safari #africa', '2025-07-05', '2025-07-05'),
('Randonnée matinale au Machu Picchu 🏞️', 'https://picsum.photos/id/206/600/400', 3, '#peru #machupicchu #trek', '2025-07-06', '2025-07-06'),
('Tokyo by night – Lumières et néons ✨', 'https://picsum.photos/id/207/600/400', 1, '#tokyo #japan #cityscape', '2025-07-07', '2025-07-07'),
('Journée détente sur une plage des Maldives 🏝️', 'https://picsum.photos/id/208/600/400', 2, '#maldives #beachlife #paradise', '2025-07-08', '2025-07-08'),
('Découverte des temples d’Angkor Wat 🛕', 'https://picsum.photos/id/209/600/400', 3, '#cambodia #angkorwat #culture', '2025-07-09', '2025-07-09'),
('Escapade en Laponie – aurores boréales 💚', 'https://picsum.photos/id/210/600/400', 1, '#lapland #northernlights #snow', '2025-07-10', '2025-07-10');



INSERT INTO comments (comment, user_id, post_id) VALUES
('Magnifique photo, ça donne envie de voyager !', 2, 1),
('J''y étais aussi l''an dernier, magique !', 3, 2),
('La route 66 en van, quel rêve !', 1, 3),
('Chefchaouen est sur ma bucket list 🔵', 2, 4),
('Wow, ces lions sont impressionnants !', 3, 5),
('Incroyable, quelle vue depuis le sommet !', 1, 6),
('Tokyo est vraiment une ville unique ✨', 2, 7),
('Le paradis existe vraiment 🏝️', 3, 8),
('Tellement chargé d''histoire… merci du partage 🙏', 1, 9),
('Les aurores boréales sont sur ma liste depuis toujours ! 💚', 2, 10);

INSERT INTO likes (user_id, post_id) VALUES
(1, 7),
(2, 4),
(3, 5),
(1, 6),
(2, 2);
