// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");
const router = express.Router();

// console.log("🔍 Import prisma:", typeof prisma);
// console.log("🔍 Prisma object:", prisma);
// console.log("✅ Route /auth chargée");
// console.log("🔍 Prisma initialisé:", prisma ? "OUI" : "NON");

// Route pour l'authentification
router.post("/login", async (req, res) => {
  try {
    const { firstname, password } = req.body;
    console.log(firstname, password);
    // Validation des données
    if (!firstname || !password) {
      return res.status(400).json({
        message: "Prénom et mot de passe requis",
      });
    }

    // Recherche de l'utilisateur par prénom
    const user = await prisma.users.findFirst({
      where: {
        firstname: firstname.trim(),
      },
      // chaque post, like ou comment contient aussi ses relations imbriquées :
      include: {
        posts: {
          include: {
            likes: true, // Facultatif : les likes du post
            comments: true, // Facultatif : les commentaires du post
          },
        },
        likes: {
          include: {
            posts: true,
            users: true,
          },
        },
        comments: {
          include: {
            posts: true, // Post associé à chaque commentaire
          },
        },
      },
    });
    // console.log(user);

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

    // Authentification réussie - retourner les données user dans sa page DASHBOARD (sans le mot de passe)
    const userResponse = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      url_userpicture: user.url_userpicture,
      posts: user.posts || [],
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

// router.post("/login", async (req, res) => {
//   console.log("🔍 === DÉBUT LOGIN ===");
//   console.log("🔍 Body reçu:", req.body);

//   try {
//     const { firstname, password } = req.body;

//     // Validation des données
//     if (!firstName || !password) {
//       console.log("❌ Données manquantes");
//       return res.status(400).json({
//         message: "Prénom et mot de passe requis",
//       });
//     }

//     console.log("🔍 Recherche utilisateur avec firstName:", firstName);

//     // Recherche de l'utilisateur par prénom
//     const user = await prisma.user.findFirst({
//       where: {
//         firstName: firstName.trim(),
//       },
//     });

//     console.log("🔍 Utilisateur trouvé:", user);

//     if (!user) {
//       console.log("❌ Utilisateur non trouvé");
//       return res.status(401).json({
//         message: "Identifiants invalides",
//       });
//     }

//     console.log("🔍 Comparaison mot de passe...");
//     console.log("🔍 Password fourni:", password);
//     console.log("🔍 Password en DB:", user.password);

//     // Vérification du mot de passe
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     console.log("🔍 Mot de passe valide:", isPasswordValid);

//     if (!isPasswordValid) {
//       console.log("❌ Mot de passe invalide");
//       return res.status(401).json({
//         message: "Identifiants invalides",
//       });
//     }

//     // Authentification réussie
//     const userResponse = {
//       id: user.id,
//       firstName: user.firstName,
//       email: user.email,
//     };

//     console.log("✅ Authentification réussie");
//     res.status(200).json({
//       message: "Authentification réussie",
//       user: userResponse,
//     });
//   } catch (error) {
//     console.error("❌ ERREUR COMPLÈTE:", error);
//     console.error("❌ Stack trace:", error.stack);
//     res.status(500).json({
//       message: "Erreur serveur lors de l'authentification",
//     });
//   }

//   console.log("🔍 === FIN LOGIN ===");
// });

module.exports = router;
