//./components/typewriter.js
import React from 'react'
import styles from '../styles/typewriter.module.css'

const subtitles = [
	"Spent way too long setting up this navbar",
    "You can tell I'm not a designer, can't you?",
    "I upgraded Next and nothing broke. Impressive.",
    "What's this 'continuous integration' you speak of?",
];

const speed = 30;
const commaspeed = 300;
const periodspeed = 600;

export default class Typewriter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: "",
			i: 0
		};
	}

	componentDidMount() {
		const rand = Math.floor(Math.random()*subtitles.length)
		setTimeout(() => {
			this.typeWriter(subtitles[rand])
		},1500)
	}

	typeWriter(string) {
		if (this.state.i < string.length) {
			this.setState((state, props) => ({
				text: state.text.concat(string[state.i]),
				i: state.i+1
			}))
            let charSpeed = speed;

            switch (string[this.state.i-1]) {
                case ",":
                    charSpeed = commaspeed;
                    break;
                case "?":
                case ".":
                    charSpeed = periodspeed;
                    break;
                default:
                    break;
            }
			setTimeout(() => this.typeWriter(string), charSpeed)
		}
	}

	render () {
		return (
		<div className={styles.typewriter_container}>
			<p className={styles.subtitle}>{this.state.text}
				<span className={[styles.blinker, styles.blink].join(' ')}>║</span>
			</p>
		</div>
		)
	}

}