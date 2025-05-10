import axios from 'axios'
import { ALL_COUNTRIES } from '../API/config.ts'
import { useEffect, useState } from 'react'
import Controls from '../components/Controls'
import List from '../components/List.tsx'
import Card from '../components/Card.tsx'
import { useNavigate } from 'react-router-dom'
import { ICountryMini } from '../types.ts'

interface IProps {
	countries: ICountryMini[]
	setCountries: React.Dispatch<React.SetStateAction<ICountryMini[]>>
}

const HomePage = ({ countries, setCountries }: IProps) => {
	const navigate = useNavigate()

	const [filteredCountries, setFilteredCountries] = useState(countries)

	const handleSearch = (search: string, region: string) => {
		let data = [...countries]

		if (region) {
			data = data.sort((c1, c2) => c2.population - c1.population)
		}

		// if (region) {
		// 	data = data.filter(c => c.region.toLowerCase().includes(region))
		// }

		if (search) {
			search = search.toLowerCase().trim()

			data = data.filter(c => {
				return c.name.common.toLowerCase().includes(search) || c.translations.rus.common.toLowerCase().includes(search)
			})
		}

		setFilteredCountries(data)
	}

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response = await axios.get<ICountryMini[]>(ALL_COUNTRIES)
				setCountries(response.data)
				setFilteredCountries(response.data)
			} catch (error) {
				console.error('Ошибка запроса списка стран:', error)
			}
		}

		if (!countries.length) {
			fetchCountries()
		}
	}, [])

	console.log(countries)

	return (
		<>
			<Controls onSearch={handleSearch} count={filteredCountries.length} />
			<List>
				<>
					{filteredCountries.map((country: ICountryMini) => {
						const countryInfo = {
							img: country.flags.png,
							title: country.translations.rus.common,
							info: [
								{
									title: 'Население',
									description: country.population.toLocaleString(),
								},
								{
									title: 'Регион',
									description: country.region,
								},
								{
									title: country.capital.length > 1 ? 'Столицы' : 'Столица',
									description: country.capital.join(', '),
								},
							],
						}

						return <Card key={country.name.common} {...countryInfo} onClick={() => navigate(`/country/${country.name.common}`)} />
					})}
				</>
			</List>
		</>
	)
}

export default HomePage
