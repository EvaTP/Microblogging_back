// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Route pour l'authentification
router.post("/login", async (req, res) => {
  try {
    const { firstName, password } = req.body;

    // Validation des données
    if (!firstName || !password) {
      return res.status(400).json({
        message: "Prénom et mot de passe requis",
      });
    }

    // Recherche de l'utilisateur par prénom
    const user = await prisma.user.findFirst({
      where: {
        firstName: firstName.trim(),
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Identifiants invalides",
      });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Identifiants invalides",
      });
    }

    // Authentification réussie - retourner les données user (sans le mot de passe)
    const userResponse = {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
      // ajoutez d'autres champs selon votre modèle
    };

    res.status(200).json({
      message: "Authentification réussie",
      user: userResponse,
    });
  } catch (error) {
    console.error("Erreur lors de l'authentification:", error);
    res.status(500).json({
      message: "Erreur serveur lors de l'authentification",
    });
  }
});

module.exports = router;
