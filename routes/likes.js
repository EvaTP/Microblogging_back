const express = require("express");
const prisma = require("../lib/prisma");
const router = express.Router();

router.get("/test", (req, res) => {
  console.log("✅ Route /likes/test atteinte");
  res.send("Test route likes OK");
});

// GET : TOUS LES LIKES
// router.get("/", async (req, res) => {
//   try {
//     const likes = await prisma.likes.findMany();
//     res.json(likes);
//   } catch (error) {
//     console.error("Erreur GET /likes:", error);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });

// GET POUR COMPOSANTT LIKE
router.get("/", async (req, res) => {
  const { user_id, post_id } = req.query;

  try {
    const filters = {};
    if (user_id) filters.user_id = parseInt(user_id);
    if (post_id) filters.post_id = parseInt(post_id);

    const likes = await prisma.likes.findMany({
      where: filters,
    });

    res.json(likes);
  } catch (error) {
    console.error("Erreur GET /likes:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET : LIKES BY ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }
  try {
    const status = await prisma.likes.findUnique({
      where: { id },
    });

    if (!status) {
      return res.status(404).json({ error: "Statut non trouvé" });
    }
    res.json(status);
  } catch (error) {
    console.error("Erreur GET /likes/:id", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST
router.post("/", async (req, res) => {
  const { user_id, post_id } = req.body;
  if (!user_id || !post_id) {
    return res.status(400).json({
      error: "Les champs 'user_id' et 'post_id' sont requis.",
    });
  }
  try {
    const newLike = await prisma.likes.create({
      data: {
        user_id,
        post_id,
      },
    });

    res.status(201).json(newLike);
  } catch (error) {
    console.error("Erreur POST /likes:", error);
    res.status(500).json({ error: "Erreur lors de la création du like" });
  }
});

// PATCH
router.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const { user_id, post_id } = req.body;

  try {
    // Vérifie que l'élément existe
    const likeToUpdate = await prisma.likes.findUnique({
      where: { id },
    });

    if (!likeToUpdate) {
      return res.status(404).json({ error: "Like non trouvé" });
    }

    const updatedLike = await prisma.likes.update({
      where: { id },
      data: {
        user_id,
        post_id,
      },
    });

    res.status(200).json({
      message: `Like avec l'ID ${id} mis à jour.`,
      updated: updatedLike,
    });
  } catch (error) {
    console.error("Erreur PATCH /routes/likes/:id", error);
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
    const likesToDelete = await prisma.likes.findUnique({
      where: { id },
    });

    if (!likesToDelete) {
      return res.status(404).json({ error: "Like non trouvé" });
    }

    // Supprime l'élément
    await prisma.likes.delete({
      where: { id },
    });

    res.json({ message: `Like avec l'ID ${id} supprimé avec succès.` });
  } catch (error) {
    console.error("Erreur DELETE /likes/:id :", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression" });
  }
});


router.get("/count/:postId", async (req, res) => {
  const postId = parseInt(req.params.postId);

  if (isNaN(postId)) {
    return res.status(400).json({ error: "postId invalide" });
  }

  try {
    const count = await prisma.likes.count({
      where: { post_id: postId },
    });

    res.json({ count });
  } catch (error) {
    console.error("Erreur GET /likes/count/:postId", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});








module.exports = router;
