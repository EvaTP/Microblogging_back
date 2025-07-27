const express = require("express");
const prisma = require("../lib/prisma");
const router = express.Router();

// GET : TEST
router.get("/test", (req, res) => {
  console.log("✅ Route comments/test atteinte");
  res.send("Test route comments OK");
});

// GET : TOUS LES COMMENTS
router.get("/", async (req, res) => {
  try {
    const comments = await prisma.comments.findMany();
    res.json(comments);
  } catch (error) {
    console.error("Erreur GET /status:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET : LES COMMENTS BY ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }
  try {
    const comments = await prisma.comments.findUnique({
      where: { id },
    });

    if (!comments) {
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }
    res.json(comments);
  } catch (error) {
    console.error("Erreur GET /comments/:id", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST
router.post("/", async (req, res) => {
  const { comment, user_id, post_id } = req.body;
  if (!comment || !user_id || !post_id) {
    return res.status(400).json({
      error: "Les champs 'comment', 'user_id' et 'post_id' sont requis.",
    });
  }
  try {
    const newComment = await prisma.comments.create({
      data: {
        comment,
        user_id,
        post_id,
      },
    });

    res.status(201).json({
      message: "Commentaire créé avec succès",
      comment: newComment,
    });
  } catch (error) {
    console.error("Erreur POST /comments :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création du commentaire" });
  }
});

// PATCH
router.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const { comment, user_id, post_id } = req.body;

  // Vérifie qu'au moins un champ est fourni
  if (!comment && !user_id && !post_id) {
    return res.status(400).json({
      error:
        "Au moins un champ ('comment', 'user_id' ou 'post_id') est requis pour la mise à jour.",
    });
  }

  try {
    // Vérifie que le commentaire existe
    const commentToUpdate = await prisma.comments.findUnique({
      where: { id },
    });

    if (!commentToUpdate) {
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }

    // Création dynamique des champs à mettre à jour
    const updateData = {};
    if (comment) updateData.comment = comment;
    if (user_id) updateData.user_id = user_id;
    if (post_id) updateData.post_id = post_id;

    const updatedComment = await prisma.comments.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json({
      message: `Commentaire avec l'ID ${id} mis à jour.`,
      updated: updatedComment,
    });
  } catch (error) {
    console.error("Erreur PATCH /comments/:id", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.comments(400).json({ error: "ID invalide" });
  }

  try {
    // Vérifie d'abord si l'élément existe
    const commentToDelete = await prisma.comments.findUnique({
      where: { id },
    });

    if (!commentToDelete) {
      return res.comments(404).json({ error: "Commentaire non trouvé" });
    }

    // Supprime l'élément
    await prisma.comments.delete({
      where: { id },
    });

    res.json({ message: `Commentaire avec l'ID ${id} supprimé avec succès.` });
  } catch (error) {
    console.error("Erreur DELETE /comments/:id :", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression" });
  }
});

module.exports = router;
