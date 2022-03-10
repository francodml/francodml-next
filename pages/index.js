import Head from 'next/head'
import ProjectList from '../components/project-list'
import { MongoClient } from "mongodb";

export async function getStaticProps() {
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vql6v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );

    const db = client.db();
    const projectsCollection = db.collection("projects");
    const projects = await projectsCollection.find().toArray();

    client.close();

    return {
        props: {
            projects: projects.map((project) => ({
                id: project._id.toString(),
                name: project.name,
                imagepath: project.image_path || null,
                subtitle: project.subtitle,
                shortcontent: project.shortcontent,
				pagepath: project.name.toString().toLowerCase().replace(/ /g, "_")
            }))
        }
    }
}

export default function Index( props ) {
	return (
		<main>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
      		</Head>
			<div className="index-content">
				<div id="index-ramble">
					<h1>Hey, I'm Franco.</h1>
					<p>
                        I'm an aspiring software developer from Argentina, currently working on personal projects.
                        <br/>You'll find some of my work detailed below, or you can check me out at <a href="https://github.com/francodml">GitHub</a>.
                    </p>
				</div>
                <ProjectList projects={props.projects}/>
                 <h2 style={{alignSelf: 'center'}}>As this page is under development, this list is not complete. The data here will be expanded upon shortly 😊</h2>

			</div>
		</main>
	)
}