import Navbar from './navbar'
import Head from 'next/head'
import Typewriter from './typewriter'
import { useRouter } from 'next/router'

export default function Layout({ children }) {

    const router = useRouter();

	return(
		<div>
			<Head>
				<title>Franco's projects and whatnot</title>
			</Head>
			<div className="header">
				<h1>[franco's pRojects and whatnot]</h1>
				{router.asPath === "/" ? <Typewriter/> : null }
			</div>
			<Navbar/>
			{children}
		</div>
	)
}