import Header from './components/Header'
import Main from './components/Main'
import { Route, Routes } from 'react-router-dom'
import { HomePage, Details, NotFound } from './pages'
import { useState } from 'react'
import { ICountryMini } from './types'

function App() {
	const [countries, setCountries] = useState<ICountryMini[]>([])

	return (
		<div className="flex flex-col gap-7">
			<Header></Header>
			<Main>
				<Routes>
					<Route path="/" element={<HomePage countries={countries} setCountries={setCountries} />} />

					<Route path="/country/:name" element={<Details />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Main>
		</div>
	)
}

export default App
