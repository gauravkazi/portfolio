const Project = require('../models/Project');

// @desc    Get all projects (public)
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project (admin only)
const createProject = async (req, res) => {
  try {
    const { title, stack, description, bullets, githubLink, liveLink, order } = req.body;
    const project = await Project.create({
      title,
      stack,
      description,
      bullets,
      githubLink,
      liveLink,
      order,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project (admin only)
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { title, stack, description, bullets, githubLink, liveLink, order } = req.body;
    project.title = title ?? project.title;
    project.stack = stack ?? project.stack;
    project.description = description ?? project.description;
    project.bullets = bullets ?? project.bullets;
    project.githubLink = githubLink ?? project.githubLink;
    project.liveLink = liveLink ?? project.liveLink;
    project.order = order ?? project.order;

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project (admin only)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await project.deleteOne();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };