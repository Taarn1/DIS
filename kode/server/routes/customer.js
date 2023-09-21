const express = require("express");
const customerRoutes = express.Router();

const cookieParser = require("cookie-parser");
customerRoutes.use(cookieParser());

const customers = require("../db/customers");

// CRUD endpoints (fra sidst)

customerRoutes.get("/", (req, res) => {
  res.send(customers);
});

customerRoutes.post("/", (req, res) => {
  const newCustomer = req.body;
  customers.push(newCustomer);

  res.status(201).json(newCustomer);
});

customerRoutes.put("/:username", (req, res) => {
  const username = req.params.username;
  const updatedCustomer = req.body;

  const customerIndex = customers.findIndex(
    (customer) => customer.username === username
  );

  if (customerIndex === -1) {
    return res.status(404).json({ message: "Kunde blev ikke fundet" });
  }

  customers[customerIndex] = updatedCustomer;
  res.json(updatedCustomer);
});

customerRoutes.delete("/:username", (req, res) => {
  const username = req.params.username;

  const customerIndex = customers.findIndex(
    (customer) => customer.username === username
  );

  if (customerIndex === -1) {
    return res.status(404).json({ message: "Kunde blev ikke fundet" });
  }

  customers.splice(customerIndex, 1);
  res.json({ message: "Kunde slettet" });
});

// Cookie implementering:

customerRoutes.post("/login", (req, res) => {
  // Søg efter bruger i customers.js
  const customer = customers.find(
    (customer) => customer.username === req.body.username && customer.password === req.body.password
  );
  if (customer) {
    // Send cookie med brugernavn tilbage til klienten
    return res.cookie("userAuth", customer.username, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 uge
    }).status(200).json({ message: "Login succesfuldt" });
  } else {
    // Ellers send besked med statuskode..
    return res.status(401).json({ message: "Login mislykkedes" });
  }
});

// Beskyttet
customerRoutes.get("/protected", (req, res) => {
  const authCookie = req.cookies.userAuth;
  
  if (!authCookie) {
    return res.status(401).send("Ingen authentication cookie.");
  }
  
  // Tjek om authCookie brugernavn matcher med en bruger fra customer.js
  // Hvis det matcher, giv adgang til routen.
  const customer = customers.find((customer) => customer.username === authCookie);
  if(customer) {
  
  res.send("Velkommen");

  } else {
    res.status(401).send("Ugyldig authentication cookie.");
  }
});

// localStorage eksempel

customerRoutes.post("/localstorage", (req, res) => {
  const { username, password } = req.body;

  const user = customers.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(401).json({
      success: false,
      message: "Forkert brugernavn eller adgangskode",
    });
  }
});

module.exports = customerRoutes;
