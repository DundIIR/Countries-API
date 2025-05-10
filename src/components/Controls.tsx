import { useState, useEffect } from 'react'
import Search from './Search'
import CustomSelect from './CustomSelect'
import type { SingleValue } from 'react-select'

type OptionType = {
	value: string
	label: string
}

const options: OptionType[] = [
	{ value: 'africa', label: 'Африка' },
	{ value: 'america', label: 'Америка' },
	{ value: 'asia', label: 'Азия' },
	{ value: 'europe', label: 'Европа' },
	{ value: 'oceania', label: 'Океания' },
]

interface IProps {
	onSearch: (search: string, region: string) => void
	count: number
}

const Controls = ({ onSearch, count }: IProps) => {
	const [search, setSearch] = useState('')
	const [region, setRegion] = useState<SingleValue<OptionType>>(null)

	useEffect(() => {
		console.log(region)
		onSearch(search, region?.value || '')
	}, [search, region])

	return (
		<div className="flex flex-col items-start gap-10 md:flex-row md:justify-between">
			<Search search={search} setSearch={setSearch} />
			<div className="flex gap-4 items-center md:flex-row-reverse">
				<CustomSelect options={options} value={region} onChange={setRegion} />
				{!!count && (
					<p className="text-sm md:text-md ml-5 mr-auto md:none">
						Найдено: <span className="font-semibold">{count}</span>
					</p>
				)}
			</div>
		</div>
	)
}

export default Controls
