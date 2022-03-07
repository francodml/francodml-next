import { MongoClient } from "mongodb";
import styles from  "../../styles/projects.module.scss";

export async function getStaticProps( { params } ) {
    const client = await MongoClient
        .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vql6v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
    const db = client.db();
    const projectsCollection = db.collection("projects");
    const pageinfo = await projectsCollection.find({ "page_path": params.project_name }).toArray();
    const project = pageinfo[0];

    return {
        props: {
            project:{
                id: project._id.toString(),
                name: project.name,
                subtitle: project.subtitle,
                content: project.longcontent || project.shortcontent,
                imagepath: project.image_path || null,
            }
        }
    }

}

export async function getStaticPaths() {
    const client = await MongoClient
        .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vql6v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
    const db = client.db();
    const projectsCollection = db.collection("projects");
    const indexinfo = await projectsCollection.distinct("page_path");


	return {
        paths: indexinfo.map( x => {
            return { params: { project_name: x } }
        }),
        fallback: false
    }
}

export default function ProjectDetails( props ) {

    let image_path = `url("/images/projects/${props.project.imagepath || props.project.name}.png")`;

	return (
		<div className={styles.projectContent}>
            <div className={styles.header} style={{backgroundImage: image_path.toLowerCase()}}>
                <div className={styles.headertext}>
                    <h1>{props.project.name}</h1>
                    <h2 className={styles.subtitle}>{props.project.subtitle}</h2>
                </div>
            </div>
            <p>{props.project.content}</p>
		</div>
	);
    
}