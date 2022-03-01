import ProjectListing from "./project-listing";
import styles from '../styles/project-list.module.scss';

const ProjectList = (props) => {
  return (
    <div className={styles.ProjectList}>
      {props.projects.map((project) => (
        <ProjectListing project={project} key={project.id} />
      ))}
    </div>
  );
};
export default ProjectList;