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
      <h2>Featured Work</h2>
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
  const [featuredWork, setFeaturedWork] = useState<project | null>(null);
  const [projectsList, setProjectsList] = useState<project[] | null>(null);

  useEffect(() => {
    setFeaturedWork(projectJSON.featuredWork as project);
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
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, est quaerat. Soluta, mollitia excepturi consectetur porro repellat quod eos dolorum? Dolor a tenetur ipsa, ut rem aliquam dolorem obcaecati numquam iste repellat.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, est quaerat. Soluta, mollitia excepturi consectetur porro repellat quod eos dolorum? Dolor a tenetur ipsa, ut rem aliquam dolorem obcaecati numquam iste repellat.</p>
          </div>
        </section>
        {featuredWork ? <section id="featured-project">
          <FeaturedWork project={featuredWork} />
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
          <li><a href="">My Resume</a></li>
        </ul>
      </footer>
    </>
  )
}

export default App
