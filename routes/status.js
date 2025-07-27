// console.log("status.js chargé");

const express = require("express");
const prisma = require("../lib/prisma");
const router = express.Router();

// TEST
router.get("/test", (req, res) => {
  console.log("✅ Route /status/test atteinte");
  res.send("Test route status OK");
});

// GET : TOUS LES STATUS
router.get("/", async (req, res) => {
  try {
    const status = await prisma.status.findMany();
    res.json(status);
  } catch (error) {
    console.error("Erreur GET /status:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET : STATUS BY ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }
  try {
    const status = await prisma.status.findUnique({
      where: { id },
    });

    if (!status) {
      return res.status(404).json({ error: "Statut non trouvé" });
    }
    res.json(status);
  } catch (error) {
    console.error("Erreur GET /status/:id", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST
router.post("/", async (req, res) => {
  const { role, role_id } = req.body;
  if (!role) {
    return res.status(400).json({ error: "Le champ 'role' est requis" });
  }
  try {
    const newStatus = await prisma.status.create({
      data: {
        role,
        role_id: role_id ?? null,
      },
    });

    res.status(201).json(newStatus);
  } catch (error) {
    console.error("Erreur POST /status:", error);
    res.status(500).json({ error: "Erreur lors de la création du status" });
  }
});

// PATCH
router.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const { role, role_id } = req.body;

  try {
    // Vérifie que l'élément existe
    const statusToUpdate = await prisma.status.findUnique({
      where: { id },
    });

    if (!statusToUpdate) {
      return res.status(404).json({ error: "Statut non trouvé" });
    }

    const updatedStatus = await prisma.status.update({
      where: { id },
      data: {
        role: role ?? statusToUpdate.role,
        role_id: role_id !== undefined ? role_id : statusToUpdate.role_id,
      },
    });

    res.status(200).json({
      message: `Statut avec l'ID ${id} mis à jour.`,
      updated: updatedStatus,
    });
  } catch (error) {
    console.error("Erreur PATCH /routes/status/:id", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  try {
    // Vérifie d'abord si l'élément existe
    const statusToDelete = await prisma.status.findUnique({
      where: { id },
    });

    if (!statusToDelete) {
      return res.status(404).json({ error: "Status non trouvé" });
    }

    // Supprime l'élément
    await prisma.status.delete({
      where: { id },
    });

    res.json({ message: `Status avec l'ID ${id} supprimé avec succès.` });
  } catch (error) {
    console.error("Erreur DELETE /status/:id :", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression" });
  }
});

module.exports = router;
