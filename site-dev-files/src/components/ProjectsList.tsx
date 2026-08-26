import ProjectData, { type Project } from "./ProjectData"

export default function ProjectsList({ projects }: { projects: Project[] | null }) {
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