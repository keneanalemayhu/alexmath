-- db/schema.sql

CREATE TABLE waiters (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price > 0),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  waiter_id INTEGER REFERENCES waiters(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  food_id INTEGER REFERENCES foods(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  total_price INTEGER GENERATED ALWAYS AS (quantity * (SELECT price FROM foods WHERE id = food_id)) STORED
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  method TEXT CHECK (method IN ('cash', 'card', 'mobile', 'unpaid')),
  amount INTEGER NOT NULL CHECK (amount >= 0),
  created_at TIMESTAMP DEFAULT NOW()
);