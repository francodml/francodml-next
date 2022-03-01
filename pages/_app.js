import '../styles/styles.css'
import Layout from '../components/layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Head> 
				<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
			</Head>
			<div className="content">
				<Component {...pageProps}/>
			</div>
		</Layout>
	)
}

export default MyApp
