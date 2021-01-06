const express = require("express");
const router = express.Router();
const { validate, Customer } = require("../modules/customer");

// ROUTES

// GET route
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Customer not found");
  res.send(customer);
});

// POST route
router.post("/", async (req, res) => {
  // validate the customer
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    isVIP: req.body.isVIP,
    phone: req.body.phone,
  });

  const result = await customer.save();
  res.status(201).send(result);
});

// PUT route
router.put("/:id", async (req, res) => {
  // validate the customer
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isVIP: req.body.isVIP, phone: req.body.phone },
    { new: true }
  );
  if (!customer) return res.status(404).send("Customer not found");

  res.send(customer);
});

// DELETE route
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("Customer not found");
  res.send(customer);
});


module.exports = router;
