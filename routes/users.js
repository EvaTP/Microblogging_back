const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();

const prisma = new PrismaClient();

// ROUTE GET
router.get("/", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    console.error("Erreur GET /users:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ROUTE POST
router.post("/", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    status_id,
    url_userpicture,
    user_biography,
  } = req.body;
  try {
    const NewUser = await prisma.users.create({
      data: {
        firstname,
        lastname,
        email,
        password,
        status_id,
        url_userpicture,
        user_biography,
      },
    });
    res.status(201).json(NewUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création de l’adopter" });
  }
});

// PATCH /users/:id
router.patch("/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10); // Assure-toi que l'id est bien un nombre
  const {
    firstname,
    lastname,
    email,
    password,
    status_id,
    url_userpicture,
    user_biography,
  } = req.body;

  try {
    // Vérifie que l'id est un nombre valide
    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID utilisateur invalide." });
    }

    // Mise à jour dans la base de données
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        firstname,
        lastname,
        email,
        password,
        status_id,
        url_userpicture,
        user_biography,
        updated_at: new Date(),
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Erreur PATCH /users/:id :", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    res.status(500).json({ error: error.message || "Erreur serveur." });
  }
});

// route PUT ( a tester dans thunder)
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const updatedUser = await prisma.users.update({
      // attention: modèle singulier "user"
      where: { id: id }, // clé primaire 'id' (pas user_id)
      data: data,
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide." });
  }
  try {
    await prisma.users.delete({
      where: { id: id },
    });
    res.json({ message: "Utilisateur supprimé.e avec succès" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
});

module.exports = router;
