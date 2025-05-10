import { useState, useEffect } from 'react'
import { IoMoon, IoMoonOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Header = () => {
	const [theme, setTheme] = useState('light')

	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

	useEffect(() => {
		document.body.setAttribute('data-theme', theme)
	}, [theme])

	return (
		<header className="shadow-brand bg-ui">
			<div className="container">
				<div className="flex justify-between items-center py-4">
					<Link to="/" className="text-sm md:text-md font-extrabold text-text">
						Путешествуй по карте!
					</Link>
					<div className="flex justify-between items-center text-sm gap-2 w-[110px]" onClick={toggleTheme}>
						{theme === 'light' ? <IoMoonOutline size="14px" /> : <IoMoon size="14px" />}
						<span>{theme === 'light' ? 'Светлая' : 'Темная'} тема</span>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
