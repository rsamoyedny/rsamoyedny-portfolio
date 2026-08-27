import "./styles/ProjectData.css"

export type Image = {
  src: string,
  alt: string
}

export type Link = {
  href: string,
  text: string
}

export type Project = {
  title: string,
  image: Image | null,
  tags: string[] | null,
  description: string,
  role: string,
  link: Link | null
};

export default function ProjectData({ project }: { project: Project }) {
  return (
    <div className="project-data med-background">
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
      {project.link ? <a href={project.link.href} target="_blank" rel="noopener noreferrer">{project.link.text}</a> : <></>}
    </div>
  )
}