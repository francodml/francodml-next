import styles from '../styles/about.module.css'

export default function About(){
	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<div style={{width: '250px', height: '250px', 'backgroundColor': 'teal'}}>Insert image here maybe</div>
				<h1>Franco D. M.</h1>
			</div>
			<div className={styles.main}>
				<p style={{'marginTop': '0px', textIndent: '25px'}}>
					Back when I was little, I was fascinated by the i386 computer we had at home. (It was already ancient by the time I used it but it still impressed me)
					<br/>Since then I've taught myself how to program, how to maintain systems, and how these systems work internally. I've aided and continue to aid my friends and family with their systems, and have a tendency to be the recipient of any questions regarding computers and programming.
					<br/>My most recent endeavours have involved desktop app development with C# on .NET Core (and a fair share of Discord bots), and this website here.
					<br/>Prior to this, I'd been leveraging the Lua scripting capabilities of Garry's Mod to create interactive experiences.
				</p>

				<p>I also dabble a bit in 3D modelling. My main tools for this are Blender 3D and the Substance suite.
					<br/>3D art is another one of my passions, as I find it easier to create concepts and iterate on them in a digital 3D environment than I would on paper.
					<br/>Most of my projects in this area focus on sci-fi through hard-surface or poly-based modelling, though I also incorporate non-destructive boolean design in some places.
				    <br/><br/>Given all of the above, I quickly developed a deep interest in video-game development, and it's something I aspire to do at some point in my career.
				</p>


				<p>Aside from all the computer science, I've also learned English by myself.
					<br/>I'm fully capable of fluent conversation, both in a personal and professional manner, at a near-native level.

				<p>I enrolled in university during 2021, and started my first year in 2022.
					<br/>With this I aim to solidify, certify and expand upon the systems-related knowledge I've gathered over the years as a video-game modder and independent programmer.
				</p>
				</p>
			</div>
		</div>
	)
}