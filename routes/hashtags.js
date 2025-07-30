const express = require("express");
const prisma = require("../lib/prisma");
const router = express.Router();

// GET : TEST
router.get("/test", (req, res) => {
  console.log("✅ Route hashtags/test atteinte");
  res.send("Test route comments OK");
});

// GET : TOUS LES HASHTAGS
router.get("/", async (req, res) => {
  try {
    const comments = await prisma.hashtags.findMany();
    res.json(comments);
  } catch (error) {
    console.error("Erreur GET /status:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET : LES HASHTAGS BY ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }
  try {
    const hashtags = await prisma.hashtags.findUnique({
      where: { id },
    });

    if (!hashtags) {
      return res.status(404).json({ error: "Hashtag non trouvé" });
    }
    res.json(hashtags);
  } catch (error) {
    console.error("Erreur GET /hashtag/:id", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST
router.post("/", async (req, res) => {
  const { label } = req.body;
  if (!label) {
    return res.status(400).json({
      error: "Le champ 'label' est requis.",
    });
  }
  try {
    const newHashtag = await prisma.hashtags.create({
      data: {
        label,
      },
    });

    res.status(201).json({
      message: "Hashtag créé avec succès",
      // comment: newHashtag,
      hashtag: {
        id: newHashtag.id,
        label: newHashtag.label,
      },
    });
  } catch (error) {
    console.error("Erreur POST /hasthtags :", error);
    res.status(500).json({ error: "Erreur lors de la création du hashtag" });
  }
});

// PATCH
router.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const { label } = req.body;

  // Vérifie que le champ "label" est fourni
  if (!label) {
    return res.status(400).json({
      error: "Le champ 'label' est requis pour la mise à jour.",
    });
  }

  try {
    // Vérifie que le hashtag existe
    const hashtagToUpdate = await prisma.hashtags.findUnique({
      where: { id },
    });

    if (!hashtagToUpdate) {
      return res.status(404).json({ error: "Hashtag non trouvé" });
    }

    // Création dynamique des champs à mettre à jour
    const updateData = {};
    if (label) updateData.label = label;

    const updatedHashtag = await prisma.hashtags.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json({
      message: `Hashtag avec l'ID ${id} mis à jour.`,
      updated: updatedHashtag,
    });
  } catch (error) {
    console.error("Erreur PATCH /hashtags/:id", error);
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
    const hashtagToDelete = await prisma.hashtags.findUnique({
      where: { id },
    });

    if (!hashtagToDelete) {
      return res.comments(404).json({ error: "Commentaire non trouvé" });
    }

    // Supprime l'élément
    await prisma.hashtags.delete({
      where: { id },
    });

    res.json({ message: `Hashtag avec l'ID ${id} supprimé avec succès.` });
  } catch (error) {
    console.error("Erreur DELETE/hashtags/:id :", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression" });
  }
});

router.get("/byHashtag/:hashtag", async (req, res) => {
  const { hashtag } = req.params;
  try {
    const posts = await prisma.posts.findMany({
      where: {
        hashtag: hashtag,
      },
      include: {
        comments: true,
        likes: true,
        users: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Erreur lors de la récupération des posts par hashtag :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});





module.exports = router;
