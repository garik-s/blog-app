const Post = require('../models/Posts');
const { Sequelize } = require('sequelize');

exports.getPosts = async (req, res) => {
  const { page = 1, limit = 2, searchQuery = "" } = req.query;


  try {
    const posts = await Post.findAll({
      where: {
        title: {
          [Sequelize.Op.like]: `%${searchQuery}%`,
        },
      },
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [["id", "ASC"]],
    });

    const totalPosts = await Post.count({
      where: {
        title: {
          [Sequelize.Op.like]: `%${searchQuery}%`,
        },
      },
    });

    res.json({
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({ title, content });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByPk(req.params.id);
    if (post) {
      post.title = title;
      post.content = content;
      await post.save();
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      await post.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
