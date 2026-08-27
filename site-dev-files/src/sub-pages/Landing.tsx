import { useState, useEffect } from 'react'
import './styles/Landing.css'
import * as projectJSON from '../assets/projects.json'
import ProjectData, { type Project } from '../components/ProjectData';

export default function Landing() {
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[] | null>(null);

  useEffect(() => {
    setFeaturedProject(projectJSON.featuredProject as Project);
    setProjectsList(projectJSON.projectsList as Project[]);
  }, [])

  return (
    <div id='landing'>
      <header id='landing__header'>
        <h1>Ryan Samoyedny's Portfolio</h1>
      </header>
      <nav id='landing__nav'>
        <ul>
          <li><a href="#landing__about-me">About Me</a></li>
          <li><a href="#landing__featured-project">Featured Project</a></li>
          <li><a href="#landing__other-projects">Other Projects</a></li>
          <li><a href="#landing__links">Links</a></li>
        </ul>
      </nav>
      <main id='landing__main'>
        <section id="landing__about-me">
          <h2>About Me</h2>
          <div id='landing__bio' className='med-background'>
            <p>Hello! I'm Ryan Samoyedny, a Game Design and Development Student at RIT. I have interests in web development, game programming, and 3D art. I have experience in Unity, Unreal Enging, MonoGame, Maya, Blender, Vite, and React. For languages, I have used: C#, C++, Python, HTML, CSS, JavaScript, TypeScript, and Blueprints Visual Scripting for past projects.</p>
            <p>Outside of games, I like to crochet and knit. I'm also the Vice President for <a href="https://campusgroups.rit.edu/han/home/">Hooks and Needles</a> at RIT.</p>
          </div>
        </section>
        {featuredProject ? <section id="landing__featured-project">
          <h2>Featured Project</h2>
          <ProjectData project={featuredProject} />
        </section> : <></>}
        {projectsList ? <section id="landing__other-projects">
          <h2>Other Projects</h2>
          <ul>
            {projectsList?.map((project, index) => {
              return (
                <li key={index}>
                  <ProjectData project={project} />
                </li>
              )
            })}
          </ul>
        </section> : <></>}
      </main>
      <footer id="landing__footer">
        <ul>
          <li><a href="https://github.com/rsamoyedny" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://ry313.itch.io/" target="_blank" rel="noopener noreferrer">itch.io</a></li>
          <li><a href="https://www.linkedin.com/in/rsamoyedny/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://docs.google.com/document/d/10kD735E6_40acvlUz19-Lwtp1zcuFUmJMMnXnfeY4LI/export?format=pdf&attachment=false" target="_blank" rel="noopener noreferrer">My Resume</a></li>
        </ul>
      </footer>
    </div>
  )
}