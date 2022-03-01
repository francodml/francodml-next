import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/navbar.module.css'
import React, {useEffect} from 'react'

export default function Navbar () {
	const router = useRouter();
	const [scrolled, setScrolled] = React.useState(false);
	const navbarRef = React.useRef();
	
    const handleScroll = () => {
        const offset = window.scrollY;
		const { offsetTop } = navbarRef.current

        if (offset >= offsetTop) {
            setScrolled(true);
        }
        else {
            setScrolled(false);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
    }, [])

	return (
	<nav ref={navbarRef} className={scrolled ? [styles.sticky, styles.navbar].join(' ') : styles.navbar}>
		<div className={styles.navlinks}>
			<Link href="/"><a className={router.asPath === "/" ? styles.active : undefined}>Home</a></Link>
			<Link href="/about"><a className={router.asPath === "/about" ? styles.active : undefined}>About</a></Link>
		</div>

		<div className={styles.externlinks}>
			<a href="https://github.com/francodml">Github</a>
		</div>
	</nav>
	)
}