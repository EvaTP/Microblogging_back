const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/test", (req, res) => {
  console.log("✅ Route /likes/test atteinte");
  res.send("Test route likes OK");
});

// GET : TOUS LES LIKES
router.get("/", async (req, res) => {
  try {
    const likes = await prisma.likes.findMany();
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
// router.patch("/:id", async (req, res) => {
//   const id = parseInt(req.params.id);

//   if (isNaN(id)) {
//     return res.status(400).json({ error: "ID invalide" });
//   }

//   const { role, role_id } = req.body;

//   try {
//     // Vérifie que l'élément existe
//     const statusToUpdate = await prisma.status.findUnique({
//       where: { id },
//     });

//     if (!statusToUpdate) {
//       return res.status(404).json({ error: "Statut non trouvé" });
//     }

//     const updatedStatus = await prisma.status.update({
//       where: { id },
//       data: {
//         role: role ?? statusToUpdate.role,
//         role_id: role_id !== undefined ? role_id : statusToUpdate.role_id,
//       },
//     });

//     res.status(200).json({
//       message: `Statut avec l'ID ${id} mis à jour.`,
//       updated: updatedStatus,
//     });
//   } catch (error) {
//     console.error("Erreur PATCH /routes/status/:id", error);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });

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
    await prisma.status.delete({
      where: { id },
    });

    res.json({ message: `Like avec l'ID ${id} supprimé avec succès.` });
  } catch (error) {
    console.error("Erreur DELETE /likes/:id :", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression" });
  }
});

module.exports = router;
