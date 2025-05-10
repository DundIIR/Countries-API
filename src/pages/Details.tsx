import { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { filterByCode, searchByCountry } from '../API/config'
import axios from 'axios'
import { ICountry, ICountryMini } from '../types'

interface InfoItem {
	title: string
	description: string
}

const Details = () => {
	const { name } = useParams()
	const navigate = useNavigate()

	const [country, setCountry] = useState<ICountry | undefined>(undefined)
	const [borderCountry, setBorderCountry] = useState<ICountryMini[] | null>(null)
	const [infoCountry, setInfoCountry] = useState<InfoItem[]>([])

	useEffect(() => {
		const fetchCountry = async () => {
			try {
				const response = await axios.get<ICountry[]>(searchByCountry(name))
				const res = response.data.find(c => c.name.common == name)
				setCountry(res)
			} catch (error) {
				console.error('Ошибка запроса страны:', error)
			}
		}

		fetchCountry()
	}, [name])

	useEffect(() => {
		const fetchBorderCountry = async (codes: string[]) => {
			try {
				const response = await axios.get(filterByCode(codes))
				console.log(response.data)
				setBorderCountry(response.data)
			} catch (error) {
				console.error('Ошибка запроса страны:', error)
			}
		}

		if (country) {
			const firstNativeName = Object.values(country.name?.nativeName || {})[0]?.common || 'Нет данных'

			const newInfo: InfoItem[] = [
				{
					title: 'Оригинальное название',
					description: firstNativeName,
				},
				{
					title: 'Население',
					description: country.population?.toLocaleString() || 'Нет данных',
				},
				{
					title: 'Регион',
					description: country.region || 'Нет данных',
				},
				{
					title: 'Субрегион',
					description: country.subregion || 'Нет данных',
				},
				{
					title: country.capital?.length > 1 ? 'Столицы' : 'Столица',
					description: country.capital?.join(', ') || 'Нет данных',
				},
				{
					title: 'Верхний домен',
					description: country.tld?.join(', ') || 'Нет данных',
				},
				{
					title: 'Валюта',
					description: country.currencies
						? Object.values(country.currencies)
								.map(c => c.name)
								.join(', ')
						: 'Нет данных',
				},
				{
					title: 'Языки',
					description: country.languages ? Object.values(country.languages).join(', ') : 'Нет данных',
				},
			]

			fetchBorderCountry(country?.borders || [])
			setInfoCountry(newInfo)
		}
	}, [country])
	return (
		<div>
			<button
				className="flex gap-2 items-center rounded-md px-8 py-2 shadow-brand bg-ui text-text mb-15 cursor-pointer"
				onClick={() => {
					navigate(-1)
				}}>
				<IoArrowBack />
				Назад
			</button>
			{infoCountry && country && (
				<section className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-10">
					<img
						src={country.flags?.svg}
						alt={country.flags?.alt || `Флаг ${country.name?.common}`}
						className="block w-full max-h-60 md:max-h-75 lg:max-h-96 object-center object-fill shadow-brand dark:brightness-80"
					/>

					<div className="flex flex-col gap-6 xl:gap-10">
						<h1 className="text-2xl lg:text-4xl font-extrabold">
							{country.translations?.rus.common || country.name.common || 'Нет данных'}
						</h1>

						<ul className="text-sm md:text-md grid grid-cols-1 md:grid-cols-2 gap-2">
							{infoCountry.map((el, index) => (
								<li key={index} className={index === 4 ? 'mb-8 md:mb-0' : ''}>
									<span className="font-semibold">{el.title}: </span>
									{el.description}
								</li>
							))}
						</ul>

						{borderCountry && borderCountry.length ? (
							<div className="flex flex-col gap-4 md:flex-row">
								<h2 className="text-md md:text-lg font-semibold text-nowrap">Соседние страны:</h2>

								<div className="flex w-full gap-2 flex-wrap">
									{borderCountry.map(c => (
										<button
											key={c.name.common}
											className="grow gap-2  rounded-md  shadow-brand bg-ui text-text text-xs text-center py-1 px-4 w-auto cursor-pointer"
											onClick={() => {
												navigate(`/country/${c.name.common}`)
											}}>
											{c.translations.rus.common}
										</button>
									))}
								</div>
							</div>
						) : (
							<span className="text-md md:text-lg text-nowrap font-semibold">Нет соседних стран</span>
						)}
					</div>
				</section>
			)}
		</div>
	)
}

export default Details
