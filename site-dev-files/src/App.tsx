import { useState, useEffect } from 'react'
import './App.css'
import * as projectJSON from './projects.json'

type image = {
  src: string,
  alt: string
}

type link = {
  href: string,
  text: string
}

type project = {
  title: string,
  image: image | null,
  tags: string[] | null,
  description: string,
  role: string,
  link: link | null
};

function ProjectData({ project }: { project: project }) {
  return (
    <div className="project med-background">
      <h3>{project.title}</h3>
      {project.image ? <img src={project.image.src} alt={project.image.alt} /> : <></>}
      {project.tags ? <ul>
        {project.tags.map((tag, index) => {
          return (
            <li key={index}>
              {tag}
            </li>
          )
        })}
      </ul> : <></>}
      <p className="description">{project.description}</p>
      <p className="role">{project.role}</p>
      {project.link ? <a href={project.link.href}>{project.link.text}</a> : <></>}
    </div>
  )
}

function FeaturedWork({ project }: { project: project }) {
  return (
    <>
      <h2>Featured Project</h2>
      <ProjectData project={project} />
    </>
  )
}

function ProjectsList({ projects }: { projects: project[] | null }) {
  return (
    <>
      <h2>Other Projects</h2>
      <ul>
        {projects?.map((project, index) => {
          return (
            <li key={index}>
              <ProjectData project={project} />
            </li>
          )
        })}
      </ul>
    </>
  )
}

function App() {
  const [featuredProject, setFeaturedProject] = useState<project | null>(null);
  const [projectsList, setProjectsList] = useState<project[] | null>(null);

  useEffect(() => {
    setFeaturedProject(projectJSON.featuredProject as project);
    setProjectsList(projectJSON.projectsList as project[]);
  }, [])

  return (
    <>
      <header>
        <h1>Ryan Samoyedny's Portfolio</h1>
      </header>
      <nav>
        <ul>
          <li><a href="#about-me">About Me</a></li>
          <li><a href="#featured-project">Featured Project</a></li>
          <li><a href="#other-projects">Other Projects</a></li>
          <li><a href="#links">Links</a></li>
        </ul>
      </nav>
      <main>
        <section id="about-me">
          <h2>About Me</h2>
          <div className='med-background'>
            <p>Hello! I'm Ryan Samoyedny, a Game Design and Development Student at RIT. I have interests in web development, game programming, and 3D art. I have experience in Unity, Unreal Enging, MonoGame, Maya, Blender, Vite, and React. For languages, I have used: C#, C++, Python, HTML, CSS, JavaScript, TypeScript, and Blueprints Visual Scripting for past projects.</p>
            <p>Outside of games, I like to crochet and knit. I'm also the Vice President for <a href="https://campusgroups.rit.edu/han/home/">Hooks and Needles</a> at RIT.</p>
          </div>
        </section>
        {featuredProject ? <section id="featured-project">
          <FeaturedWork project={featuredProject} />
        </section> : <></>}
        {projectsList ? <section id="other-projects">
          <ProjectsList projects={projectsList} />
        </section> : <></>}
      </main>
      <footer id="links">
        <ul>
          <li><a href="https://github.com/rsamoyedny">GitHub</a></li>
          <li><a href="https://ry313.itch.io/">itch.io</a></li>
          <li><a href="https://www.linkedin.com/in/rsamoyedny/">LinkedIn</a></li>
          <li><a href="https://docs.google.com/document/d/10kD735E6_40acvlUz19-Lwtp1zcuFUmJMMnXnfeY4LI/export?format=pdf&attachment=false">My Resume</a></li>
        </ul>
      </footer>
    </>
  )
}

export default App
