import Image from 'next/image';
import styles from '../styles/project-list.module.scss';
import Link from 'next/link';

const ProjectListing = ({ project }) => {

    let image_path = `url("/images/projects/${project.imagepath || project.name}.png")`;

    return (
        <Link href="/projects/[id]" as={`/projects/${project.pagepath}`}>
        <div className={styles.ProjectListing}>
            <div className={styles.banner} style={{backgroundImage: image_path.toLowerCase()}}>
                <div className={styles.banner_content}>
                    <h1 className={styles.title}>
                            {project.name}
                    </h1>
                    <h2 className={styles.subtitle}>
                        {project.subtitle}
                    </h2>
                </div>
            </div>
            <div className="content">
                {project.shortcontent}
            </div>
        </div>
        </Link>
    );
  };
  export default ProjectListing;