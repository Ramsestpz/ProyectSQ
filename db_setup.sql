-- 1. LIMPIEZA Y REINICIO
DROP DATABASE IF EXISTS nutriplan;
CREATE DATABASE nutriplan;
USE nutriplan;

-- 2. ESTRUCTURA (Consolidada)
CREATE TABLE users
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100)        NOT NULL,
    email      VARCHAR(150) UNIQUE NOT NULL,
    password   VARCHAR(255)        NOT NULL,
    avatar_url VARCHAR(255),
    goal       ENUM ('lose_weight', 'maintain', 'gain_muscle') DEFAULT 'maintain',
    created_at TIMESTAMP                                       DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE nutrient_targets
(
    id              INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL,
    calories_target INT DEFAULT 2000,
    protein_target  INT DEFAULT 150,
    carbs_target    INT DEFAULT 250,
    fat_target      INT DEFAULT 70,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE meals
(
    id               INT AUTO_INCREMENT PRIMARY KEY,
    user_id          INT                                            NOT NULL,
    title            VARCHAR(150)                                   NOT NULL,
    description      TEXT,
    image_url        VARCHAR(255),
    calories         INT                                            NOT NULL,
    protein          INT                                            NOT NULL,
    carbs            INT                                            NOT NULL,
    fat              INT                                            NOT NULL,
    preparation_time INT,
    meal_type        ENUM ('Breakfast', 'Lunch', 'Dinner', 'Snack') NOT NULL,
    date             DATE                                           NOT NULL,
    is_vegetarian    BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE grocery_items
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT          NOT NULL,
    name       VARCHAR(150) NOT NULL,
    is_checked BOOLEAN   DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE daily_stats
(
    id              INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT  NOT NULL,
    date            DATE NOT NULL,
    weight          DECIMAL(5, 2),
    water_intake_ml INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_date (user_id, date)
);

-- 3. INSERCIÓN DE 10 USUARIOS (Avatares reales)
INSERT INTO users (name, email, password, avatar_url, goal)
VALUES ('Alejandro Pérez', 'ale.perez@email.com', 'hash123', 'https://i.pravatar.cc/150?u=1', 'gain_muscle'),
       ('Beatriz Soto', 'b.soto@email.com', 'hash123', 'https://i.pravatar.cc/150?u=2', 'lose_weight'),
       ('Carlos Ruiz', 'cruiz88@email.com', 'hash123', 'https://i.pravatar.cc/150?u=3', 'maintain'),
       ('Diana Luna', 'diana.luna@email.com', 'hash123', 'https://i.pravatar.cc/150?u=4', 'lose_weight'),
       ('Eduardo Gómez', 'edu.gomez@email.com', 'hash123', 'https://i.pravatar.cc/150?u=5', 'gain_muscle'),
       ('Fernanda Díaz', 'fer_diaz@email.com', 'hash123', 'https://i.pravatar.cc/150?u=6', 'maintain'),
       ('Gabriel Mora', 'gabo_mora@email.com', 'hash123', 'https://i.pravatar.cc/150?u=7', 'gain_muscle'),
       ('Helena Sanz', 'h.sanz@email.com', 'hash123', 'https://i.pravatar.cc/150?u=8', 'lose_weight'),
       ('Iván Torres', 'ivan_t@email.com', 'hash123', 'https://i.pravatar.cc/150?u=9', 'maintain'),
       ('Julia Rivas', 'julia.nutri@email.com', 'hash123', 'https://i.pravatar.cc/150?u=10', 'lose_weight');

-- 4. 10 TARGETS (Uno por usuario)
INSERT INTO nutrient_targets (user_id, calories_target, protein_target, carbs_target, fat_target)
SELECT id, 2000 + (id * 50), 120 + (id * 5), 200 + (id * 10), 60 + id
FROM users;

-- 5. 50 COMIDAS (Con fotos reales de Unsplash)
INSERT INTO meals (user_id, title, description, image_url, calories, protein, carbs, fat, preparation_time, meal_type,
                   date, is_vegetarian)
VALUES (1, 'Avena con Berries', 'Desayuno energético',
        'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=500', 400, 15, 60, 8, 10, 'Breakfast',
        '2024-06-01', 1),
       (1, 'Pechuga de Pollo', 'Con brócoli al vapor',
        'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500', 550, 45, 10, 12, 20, 'Lunch',
        '2024-06-01', 0),
       (1, 'Salmón Grill', 'Rico en Omega 3', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500', 600,
        35, 5, 25, 15, 'Dinner', '2024-06-01', 0),
       (2, 'Smoothie Verde', 'Espinaca y manzana', 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?w=500',
        250, 5, 45, 2, 5, 'Snack', '2024-06-01', 1),
       (2, 'Ensalada César', 'Versión ligera', 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500', 350,
        25, 15, 20, 15, 'Lunch', '2024-06-01', 0),
       (3, 'Tostadas de Aguacate', 'Con huevo poché',
        'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500', 450, 18, 30, 25, 10, 'Breakfast',
        '2024-06-01', 1),
       (3, 'Pasta Integral', 'Con salsa pomodoro', 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500',
        500, 15, 80, 10, 20, 'Dinner', '2024-06-01', 1),
       (4, 'Omelette de Claras', 'Con champiñones',
        'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=500', 200, 25, 5, 10, 12, 'Breakfast',
        '2024-06-01', 1),
       (4, 'Tacos de Pescado', 'Estilo ensenada', 'https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd?w=500',
        480, 30, 40, 15, 25, 'Lunch', '2024-06-01', 0),
       (5, 'Bowl de Quinoa', 'Con garbanzos tostados',
        'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=500', 520, 20, 70, 14, 30, 'Lunch', '2024-06-01',
        1),
       (6, 'Yogur Griego', 'Con nueces y miel', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500',
        300, 15, 25, 12, 5, 'Snack', '2024-06-02', 1),
       (7, 'Filete de Res', 'Corte magro con espárragos',
        'https://images.unsplash.com/photo-1546241072-48010ad28c2c?w=500', 700, 50, 5, 35, 20, 'Dinner', '2024-06-02',
        0),
       (8, 'Panqueques de Avena', 'Sin azúcar refinada',
        'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500', 420, 18, 55, 10, 15, 'Breakfast',
        '2024-06-02', 1),
       (9, 'Poke Bowl', 'Atún fresco y edamame', 'https://images.unsplash.com/photo-1546069901-eacef0df6022?w=500', 650,
        35, 60, 18, 15, 'Lunch', '2024-06-02', 0),
       (10, 'Sopa de Lentejas', 'Alta en hierro', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
        350, 22, 50, 5, 40, 'Dinner', '2024-06-02', 1),
-- Repeticiones para completar 50 con variaciones de usuario e IDs
       (1, 'Huevo con Jamón', 'Clásico', 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500', 320, 20,
        2, 22, 10, 'Breakfast', '2024-06-02', 0),
       (2, 'Arroz con Leche Fit', 'Postre saludable',
        'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500', 280, 8, 45, 4, 30, 'Snack', '2024-06-02',
        1),
       (3, 'Sándwich de Pavo', 'Pan de masa madre',
        'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500', 410, 25, 40, 12, 8, 'Lunch', '2024-06-02',
        0),
       (4, 'Hummus con Zanahoria', 'Snack vegano', 'https://images.unsplash.com/photo-1585238341267-1cfec2046a55?w=500',
        210, 7, 20, 10, 5, 'Snack', '2024-06-02', 1),
       (5, 'Hamburguesa de Lenteja', 'Con pan integral',
        'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500', 580, 22, 65, 18, 25, 'Lunch', '2024-06-02',
        1),
       (6, 'Burritos de Pollo', 'Con frijoles negros',
        'https://images.unsplash.com/photo-1584031036380-3fb6f2d51880?w=500', 620, 35, 55, 20, 15, 'Lunch',
        '2024-06-03', 0),
       (7, 'Trucha al Horno', 'Con finas hierbas', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500',
        450, 40, 2, 18, 25, 'Dinner', '2024-06-03', 0),
       (8, 'Bowl de Frutas', 'Papaya y piña', 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=500', 180,
        2, 40, 1, 5, 'Breakfast', '2024-06-03', 1),
       (9, 'Pollo al Curry', 'Con leche de coco', 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500',
        720, 38, 50, 30, 35, 'Lunch', '2024-06-03', 0),
       (10, 'Wrap de Atún', 'Con espinaca', 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500', 380,
        32, 25, 14, 10, 'Dinner', '2024-06-03', 0),
       (1, 'Espagueti de Calabacín', 'Zoodles con pesto',
        'https://images.unsplash.com/photo-1546548970-71785318a17b?w=500', 280, 8, 15, 22, 15, 'Dinner', '2024-06-04',
        1),
       (2, 'Shakshuka', 'Huevos en salsa roja', 'https://images.unsplash.com/photo-1590412200988-a436bb7050a4?w=500',
        410, 20, 30, 25, 25, 'Breakfast', '2024-06-04', 1),
       (3, 'Pollo Teriyaki', 'Con sésamo', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500', 590,
        42, 45, 12, 20, 'Lunch', '2024-06-04', 0),
       (4, 'Mix de Frutos Secos', 'Nueces y almendras',
        'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=500', 320, 10, 12, 28, 2, 'Snack', '2024-06-04',
        1),
       (5, 'Brochetas de Camarón', 'Al grill', 'https://images.unsplash.com/photo-1534400293293-997971507c92?w=500',
        400, 35, 5, 18, 15, 'Dinner', '2024-06-04', 0),
       (6, 'Crepas de Avena', 'Con fresas', 'https://images.unsplash.com/photo-1519676867240-f031ee04a113?w=500', 350,
        12, 45, 10, 15, 'Breakfast', '2024-06-05', 1),
       (7, 'Risotto de Hongos', 'Cremoso pero ligero',
        'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500', 550, 14, 75, 15, 30, 'Dinner',
        '2024-06-05', 1),
       (8, 'Ensalada de Garbanzo', 'Estilo mediterráneo',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500', 430, 18, 50, 16, 15, 'Lunch',
        '2024-06-05', 1),
       (9, 'Salmón Miso', 'Cocina fusión', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500', 580,
        36, 12, 28, 20, 'Dinner', '2024-06-05', 0),
       (10, 'Tofu Salteado', 'Con jengibre y soja', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
        400, 25, 20, 15, 20, 'Lunch', '2024-06-05', 1),
       (1, 'Arepas de Maíz', 'Con queso bajo en grasa',
        'https://images.unsplash.com/photo-1548943487-a2e4e43d4853?w=500', 350, 12, 50, 10, 15, 'Breakfast',
        '2024-06-06', 1),
       (2, 'Ternera con Papas', 'Guiso tradicional',
        'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=500', 650, 40, 45, 22, 45, 'Lunch',
        '2024-06-06', 0),
       (3, 'Chia Pudding', 'Con leche de almendras',
        'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=500', 280, 10, 30, 14, 5, 'Snack', '2024-06-06',
        1),
       (4, 'Sushi Roll', 'California roll fit', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
        450, 15, 70, 8, 40, 'Lunch', '2024-06-06', 0),
       (5, 'Sopa Minestrone', 'Vegetales variados', 'https://images.unsplash.com/photo-1547592115-385012217c14?w=500',
        250, 12, 35, 6, 35, 'Dinner', '2024-06-06', 1),
       (6, 'Pollo al Limón', 'Con espárragos grill',
        'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500', 480, 45, 8, 14, 25, 'Lunch', '2024-06-07',
        0),
       (7, 'Waffles de Proteína', 'Hechos con claras y whey',
        'https://images.unsplash.com/photo-1562436261-8ca66c66304d?w=500', 430, 35, 40, 12, 15, 'Breakfast',
        '2024-06-07', 1),
       (8, 'Pizza de Coliflor', 'Base saludable', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
        500, 20, 45, 18, 30, 'Dinner', '2024-06-07', 1),
       (9, 'Kebe Vegano', 'De trigo y soja', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500', 390,
        18, 45, 12, 40, 'Lunch', '2024-06-07', 1),
       (10, 'Yogur con Granola', 'Granola artesanal',
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500', 320, 14, 40, 10, 5, 'Breakfast',
        '2024-06-07', 1),
       (1, 'Lasagna de Berenjena', 'Sin pasta', 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500',
        420, 18, 30, 22, 50, 'Dinner', '2024-06-08', 1),
       (2, 'Bowl de Acai', 'Frutas tropicales', 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500',
        450, 8, 75, 10, 10, 'Breakfast', '2024-06-08', 1),
       (3, 'Atún con Costra de Sésamo', 'Sellado al fuego',
        'https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?w=500', 520, 48, 5, 25, 15, 'Dinner',
        '2024-06-08', 0),
       (4, 'Edamame al Vapor', 'Con sal de mar', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500',
        150, 12, 10, 6, 10, 'Snack', '2024-06-08', 1),
       (5, 'Paella de Mariscos', 'Versión reducida en aceite',
        'https://images.unsplash.com/photo-1534080564607-c98752441051?w=500', 680, 30, 95, 12, 55, 'Lunch',
        '2024-06-08', 0);

-- 6. 50 ITEMS DE LISTA DE COMPRAS (Repartidos en IDs)
INSERT INTO grocery_items (user_id, name, is_checked)
VALUES (1, 'Avena en hojuelas', 0),
       (1, 'Leche de almendras', 1),
       (1, 'Whey Protein', 0),
       (1, 'Plátanos', 1),
       (1, 'Arándanos', 0),
       (2, 'Espinaca fresca', 0),
       (2, 'Manzana verde', 1),
       (2, 'Pechuga de pollo', 0),
       (2, 'Limones', 0),
       (2, 'Aceite de oliva', 1),
       (3, 'Pan integral', 1),
       (3, 'Aguacate hass', 0),
       (3, 'Huevos orgánicos', 1),
       (3, 'Pasta integral', 0),
       (3, 'Salsa tomate', 0),
       (4, 'Champiñones', 0),
       (4, 'Claras de huevo', 1),
       (4, 'Tilapia', 0),
       (4, 'Tortillas maíz', 0),
       (4, 'Cilantro', 1),
       (5, 'Quinoa real', 0),
       (5, 'Garbanzos secos', 1),
       (5, 'Tofu firme', 0),
       (5, 'Salsa soja', 0),
       (5, 'Brócoli', 1),
       (6, 'Nueces', 0),
       (6, 'Miel pura', 1),
       (6, 'Yogur griego sin azúcar', 0),
       (6, 'Frijol negro', 0),
       (6, 'Tortillas trigo', 1),
       (7, 'Solomillo res', 0),
       (7, 'Espárragos', 1),
       (7, 'Sal rosa', 0),
       (7, 'Pimienta negra', 0),
       (7, 'Ajo fresco', 1),
       (8, 'Fresas frescas', 0),
       (8, 'Papaya', 1),
       (8, 'Piña gold', 0),
       (8, 'Stevia', 1),
       (8, 'Harina coco', 0),
       (9, 'Atún fresco', 0),
       (9, 'Arroz sushi', 1),
       (9, 'Vinagre arroz', 0),
       (9, 'Alga nori', 0),
       (9, 'Jengibre', 1),
       (10, 'Lentejas pardina', 0),
       (10, 'Zanahorias', 1),
       (10, 'Cebolla morada', 0),
       (10, 'Tomate cherry', 1),
       (10, 'Queso feta', 0);

-- 7. 50 REGISTROS DE ESTADÍSTICAS DIARIAS (Historial de 5 días para los 10 usuarios)
-- Usuario 1-10 por 5 fechas diferentes
INSERT INTO daily_stats (user_id, date, weight, water_intake_ml)
SELECT u.id, d.fecha, 70 + u.id + (RAND() * 2), 1500 + (RAND() * 2000)
FROM users u
         CROSS JOIN (SELECT '2024-06-01' as fecha
                     UNION
                     SELECT '2024-06-02'
                     UNION
                     SELECT '2024-06-03'
                     UNION
                     SELECT '2024-06-04'
                     UNION
                     SELECT '2024-06-05') d;

-- CONSULTA FINAL DE PRUEBA
SELECT 'OK' as Status, COUNT(*) as Total_Meals
FROM meals;
