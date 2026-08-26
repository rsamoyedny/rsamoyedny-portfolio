import ProjectData, { type Project } from "./ProjectData";

export default function FeaturedWork({ project }: { project: Project }) {
	return (
		<>
			<h2>Featured Project</h2>
			<ProjectData project={project} />
		</>
	)
}