console.log("✅ Route /register chargée");

const express = require("express");
const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");
const router = express.Router();

// POST : Enregistrement d'un nouvel utilisateur
router.post("/", async (req, res) => {
  // Ajoutez ceci au début de votre route POST
  console.log("🔍 Tentative de connexion à la base de données...");
  const {
    firstname,
    lastname,
    email,
    password,
    user_biography,
    url_userpicture,
  } = req.body;

  // Vérification des champs requis
  if (!firstname || !lastname || !email || !password) {
    return res
      .status(400)
      .json({ error: "Tous les champs requis ne sont pas fournis." });
  }

  try {
    // Vérifie si un utilisateur avec le même email existe déjà
    // const existingUser = await prisma.users.findUnique({
    //   where: { email },
    // });

    // if (existingUser) {
    //   return res
    //     .status(409)
    //     .json({ error: "Un utilisateur avec cet email existe déjà." });
    // }

    // Récupération du status 'user' (on donne le statut USER par défaut)
    const userStatus = await prisma.status.findFirst({
      where: { role: "user" },
    });

    if (!userStatus) {
      return res
        .status(500)
        .json({ error: "Statut 'user' introuvable dans la base de données." });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = await prisma.users.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        user_biography: user_biography || "",
        status_id: userStatus.role,
        url_userpicture:
          url_userpicture || "http://localhost:3000/pictures/user_avatar.png",
      },
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès.",
      user: {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        user_biography: newUser.user_biography,
        status_id: newUser.status_id,
      },
    });
  } catch (error) {
    console.error("Erreur POST /register :", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la création de l'utilisateur." });
  }
});

module.exports = router;
