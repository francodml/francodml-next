import { MongoClient } from "mongodb";

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
                content: project.content || project.shortcontent,
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

	return (
		<div>
            <h1>{props.project.name}</h1>
            <p>{props.project.subtitle}</p>
            <p>{props.project.content}</p>
		</div>
	);
    
}