import { IoSearch } from 'react-icons/io5'
import { FC, JSX } from 'react'

interface IProps {
	search: string
	setSearch: (_: string) => void
}

const Search: FC<IProps> = ({ search, setSearch }): JSX.Element => {
	return (
		<label className="bg-ui px-8 py-4 w-full flex items-center rounded-md gap-6 shadow-brand  md:mb-0 md:w-80 lg:w-100">
			<IoSearch className="text-neutral-400" size="22px" />
			<input
				type="text"
				placeholder="Поиск страны"
				className="border-none outline-none text-text w-full text-sm"
				onChange={e => {
					setSearch(e.target.value)
				}}
				value={search}
			/>
		</label>
	)
}

export default Search
