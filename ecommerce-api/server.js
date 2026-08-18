const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

// ==================================================
// DUMMY DATA USERS
// ==================================================

let users = [
  {
    id: 1,
    name: "admin",
    email: "admin@miyoot.com",
    password: "admin123",
    role: "admin",
  },
];

// ==================================================
// DUMMY DATA PRODUCTS
// ==================================================

let products = [
  {
    id: 1,
    brand: "adidas",
    name: "Botanical Flowers T-Shirt",
    price: 349000,
    image: "/Images/products/f1.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 2,
    brand: "adidas",
    name: "Blossom Breeze T-Shirt",
    price: 349000,
    image: "/Images/products/f2.jpg",
    category: "tshirt",
    rating: 4,
  },
  {
    id: 3,
    brand: "adidas",
    name: "Floral Essence T-Shirt",
    price: 349000,
    image: "/Images/products/f3.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 4,
    brand: "adidas",
    name: "Vivid Vines T-Shirt",
    price: 349000,
    image: "/Images/products/f4.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 5,
    brand: "adidas",
    name: "Lush Petals T-Shirt",
    price: 349000,
    image: "/Images/products/f5.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 6,
    brand: "adidas",
    name: "Hibiscus Hues T-Shirt",
    price: 349000,
    image: "/Images/products/f6.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 7,
    brand: "adidas",
    name: "Daisy Drifters Pants",
    price: 349000,
    image: "/Images/products/f7.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 8,
    brand: "adidas",
    name: "Ethereal Bloom T-Shirts",
    price: 349000,
    image: "/Images/products/f8.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 9,
    brand: "adidas",
    name: "Light Blue Shirt",
    price: 349000,
    image: "/Images/products/n1.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 10,
    brand: "adidas",
    name: "Gray Shirt",
    price: 349000,
    image: "/Images/products/n2.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 11,
    brand: "adidas",
    name: "Original White Shirt",
    price: 349000,
    image: "/Images/products/n3.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 12,
    brand: "adidas",
    name: "Vivid Vines T-Shirt",
    price: 349000,
    image: "/Images/products/n4.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 13,
    brand: "adidas",
    name: "Denim T-Shirt",
    price: 349000,
    image: "/Images/products/n5.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 14,
    brand: "adidas",
    name: "Light Gray Short",
    price: 349000,
    image: "/Images/products/n6.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 15,
    brand: "adidas",
    name: "Soft Brown Shirt",
    price: 349000,
    image: "/Images/products/n7.jpg",
    category: "tshirt",
    rating: 5,
  },
  {
    id: 16,
    brand: "adidas",
    name: "Original Black T-Shirts",
    price: 349000,
    image: "/Images/products/n8.jpg",
    category: "tshirt",
    rating: 5,
  },
];

// ==================================================
// DUMMY DATA ORDERS
// ==================================================

let orders = [];

// ==================================================
// USERS API
// ==================================================

// GET ALL USERS
// GET http://localhost:5001/users
//
// GET USER BERDASARKAN EMAIL
// GET http://localhost:5001/users?email=contoh@gmail.com

app.get("/users", (req, res) => {
  const { email } = req.query;

  // Jika ada query email
  if (email) {
    const filteredUsers = users.filter(
      (user) =>
        user.email.toLowerCase() ===
        email.trim().toLowerCase()
    );

    return res.json(filteredUsers);
  }

  // Jika tidak ada query email
  res.json(users);
});

// ==================================================
// REGISTER USER
// ==================================================

// POST http://localhost:5001/users

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

  // Validasi
  if (!name || !email || !password) {
    return res.status(400).json({
      message:
        "Nama, email, dan password wajib diisi.",
    });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  // Cek apakah email sudah digunakan
  const existingUser = users.find(
    (user) =>
      user.email.toLowerCase() === cleanEmail
  );

  if (existingUser) {
    return res.status(409).json({
      message: "Email sudah digunakan.",
    });
  }

  // ID otomatis
  const newId = users.length
    ? Math.max(...users.map((user) => user.id)) + 1
    : 1;

  // User baru selalu role USER
  const newUser = {
    id: newId,
    name: cleanName,
    email: cleanEmail,
    password: password,
    role: "user",
  };

  users.push(newUser);

  console.log("");
  console.log(
    "======================================"
  );
  console.log("USER BARU BERHASIL REGISTER");
  console.log(
    "======================================"
  );
  console.log(newUser);
  console.log(
    "======================================"
  );
  console.log("");

  res.status(201).json({
    message: "Registrasi berhasil.",
    user: newUser,
  });
});

// ==================================================
// PRODUCTS API
// ==================================================

// GET ALL PRODUCTS

app.get("/api/products", (req, res) => {
  res.json(products);
});

// ==================================================
// ADD PRODUCT
// ==================================================

app.post("/api/products", (req, res) => {
  const newProduct = {
    id: products.length
      ? Math.max(
          ...products.map(
            (product) => product.id
          )
        ) + 1
      : 1,

    ...req.body,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// ==================================================
// DELETE PRODUCT
// ==================================================

app.delete("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  const index = products.findIndex(
    (product) => product.id === productId
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const deletedProduct = products.splice(
    index,
    1
  );

  res.json({
    message: "Product deleted",
    product: deletedProduct[0],
  });
});

// ==================================================
// ORDERS API
// ==================================================

// GET SEMUA ORDERS
// GET http://localhost:5001/orders

app.get("/orders", (req, res) => {
  res.json(orders);
});

// ==================================================
// GET ORDER BERDASARKAN ID
// ==================================================

// GET http://localhost:5001/orders/1

app.get("/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);

  const order = orders.find(
    (order) => order.id === orderId
  );

  if (!order) {
    return res.status(404).json({
      message: "Pesanan tidak ditemukan.",
    });
  }

  res.json(order);
});

// ==================================================
// GET ORDERS BERDASARKAN USER
// ==================================================

// GET
// http://localhost:5001/orders/user/email@gmail.com

app.get("/orders/user/:email", (req, res) => {
  const email = decodeURIComponent(
    req.params.email
  );

  const userOrders = orders.filter(
    (order) =>
      order.userEmail &&
      order.userEmail.toLowerCase() ===
        email.toLowerCase()
  );

  res.json(userOrders);
});

// ==================================================
// CREATE ORDER / CHECKOUT
// ==================================================

// POST http://localhost:5001/orders

app.post("/orders", (req, res) => {
  try {
    const orderData = req.body;

    // Validasi dasar
    if (!orderData) {
      return res.status(400).json({
        message: "Data pesanan kosong.",
      });
    }

    // ID order otomatis
    const newId = orders.length
      ? Math.max(
          ...orders.map(
            (order) => order.id
          )
        ) + 1
      : 1;

    const newOrder = {
      id: newId,

      ...orderData,

      createdAt: new Date().toISOString(),

      status:
        orderData.status ||
        "Sedang Diproses",
    };

    orders.push(newOrder);

    console.log("");
    console.log(
      "======================================"
    );
    console.log("PESANAN BARU");
    console.log(
      "======================================"
    );
    console.log(newOrder);
    console.log(
      "======================================"
    );
    console.log("");

    res.status(201).json({
      success: true,
      message: "Pesanan berhasil dibuat.",
      order: newOrder,
    });
  } catch (error) {
    console.error(
      "Error membuat pesanan:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Terjadi kesalahan saat membuat pesanan.",
    });
  }
});

// ==================================================
// UPDATE STATUS ORDER
// ==================================================

// PUT
// http://localhost:5001/orders/1/status

app.put(
  "/orders/:id/status",
  (req, res) => {
    const orderId = parseInt(
      req.params.id
    );

    const { status } = req.body;

    const order = orders.find(
      (order) => order.id === orderId
    );

    if (!order) {
      return res.status(404).json({
        message:
          "Pesanan tidak ditemukan.",
      });
    }

    order.status = status;

    res.json({
      success: true,
      message:
        "Status pesanan berhasil diperbarui.",
      order: order,
    });
  }
);

// ==================================================
// DELETE ORDER
// ==================================================

// DELETE
// http://localhost:5001/orders/1

app.delete("/orders/:id", (req, res) => {
  const orderId = parseInt(
    req.params.id
  );

  const index = orders.findIndex(
    (order) => order.id === orderId
  );

  if (index === -1) {
    return res.status(404).json({
      message:
        "Pesanan tidak ditemukan.",
    });
  }

  const deletedOrder = orders.splice(
    index,
    1
  );

  res.json({
    success: true,
    message:
      "Pesanan berhasil dihapus.",
    order: deletedOrder[0],
  });
});

// ==================================================
// TEST SERVER
// ==================================================

app.get("/", (req, res) => {
  res.json({
    message:
      "Miyoot API Server berjalan.",
    port: PORT,
  });
});

// ==================================================
// JALANKAN SERVER
// ==================================================

app.listen(PORT, () => {
  console.log(
    "======================================"
  );

  console.log(
    "        MIYOOT API SERVER"
  );

  console.log(
    "======================================"
  );

  console.log(
    `Server berjalan di http://localhost:${PORT}`
  );

  console.log("");

  console.log("ADMIN");

  console.log(
    "Email    : admin@miyoot.com"
  );

  console.log(
    "Password : admin123"
  );

  console.log("");

  console.log("ENDPOINT");

  console.log(
    "Users    : http://localhost:5001/users"
  );

  console.log(
    "Products : http://localhost:5001/api/products"
  );

  console.log(
    "Orders   : http://localhost:5001/orders"
  );

  console.log(
    "======================================"
  );
});