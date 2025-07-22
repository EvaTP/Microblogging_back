const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// GET : TOUS LES STATUS
router.get("/test", (req, res) => {
  console.log("✅ Route /routes/status/test atteinte");
  res.send("Test route status OK");
});

router.get("/", async (req, res) => {
  try {
    const status = await prisma.status.findMany();
    res.json(status);
  } catch (error) {
    console.error("Erreur GET /status:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
