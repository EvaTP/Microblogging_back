const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient();
  /////.  routes.  et en desous de ta page tu met " 
module.exports = router; 

// créer une route post router.get
// router.get('/posts', async (req, res) => {
//   try {
//     const posts = await prisma.posts.findMany({
//       include: {
//         comments: true,
//         likes: true
//       }
//     })
//     res.status(200).json(posts)
//   } catch (error) {
//     console.error('Erreur lors de la récupération des posts :', error)
//     res.status(500).json({ error: 'Erreur serveur lors de la récupération des posts.' })
//   }
// })

router.get('/', async (req, res) => {
  try {
    const posts = await prisma.posts.findMany()
    res.json(posts)
    // res.status(200).json(posts)
  } catch (error) {
    console.error('Erreur Prisma :', error)
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des posts.' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { description, url_pictures, user_id, hashtag } = req.body

    const post = await prisma.posts.create({
      data: {
        description,
        url_pictures,
        user_id: user_id ? parseInt(user_id) : null,
        hashtag,
        created_at: new Date(),
        updated_at: new Date(),
      },
    })

    res.status(200).json(post)
  } catch (error) {
    console.error('Erreur lors de la création du post :', error)
    res.status(500).json({ error: 'Erreur serveur lors de la création du post.' })
  }
})


router.put('/:id', async (req, res) => {
  try {
    const postId = parseInt(req.params.id)
    const { description, url_pictures, user_id, hashtag } = req.body

    const updatedPost = await prisma.posts.update({
      where: { id: postId },
      data: {
        description,
        url_pictures,
        user_id: user_id ? parseInt(user_id) : null,
        hashtag,
        updated_at: new Date()
      }
    })

    res.status(200).json(updatedPost)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du post (PUT) :', error)
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour.' })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const postId = parseInt(req.params.id)
    const updates = req.body

    if (updates.user_id) {
      updates.user_id = parseInt(updates.user_id)
    }

    updates.updated_at = new Date()

    const updatedPost = await prisma.posts.update({
      where: { id: postId },
      data: updates
    })

    res.status(200).json(updatedPost)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du post (PATCH) :', error)
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour.' })
  }
})


router.delete('/:id', async (req, res) => {
  try {
    const postId = parseInt(req.params.id)

    // Vérifie si le post existe avant de le supprimer (optionnel mais recommandé)
    const existingPost = await prisma.posts.findUnique({
      where: { id: postId }
    })

    if (!existingPost) {
      return res.status(404).json({ error: 'Post non trouvé.' })
    }

    // Suppression du post
    await prisma.posts.delete({
      where: { id: postId }
    })

    res.status(200).json({ message: `Post avec l'id ${postId} supprimé avec succès.` })
  } catch (error) {
    console.error('Erreur lors de la suppression du post :', error)
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du post.' })
  }
})
