import Select from 'react-select'
import { Props } from 'react-select'

type OptionType = {
	value: string
	label: string
}

type CustomSelectProps = Props<OptionType, false>

const CustomSelect = ({ ...rest }: CustomSelectProps) => {
	return (
		<Select
			className="w-50"
			styles={{
				input: styles => ({
					...styles,
					color: 'var(--color-text)',
					fontFamily: 'var(--font-brand)',
				}),
				control: styles => ({
					...styles,
					backgroundColor: 'var(--colors-ui-base)',
					border: 'none',
					boxShadow: 'var(--shadow-brand)',
					padding: '8px 20px',
					fontSize: 'var(--text-sm)',
					borderRadius: 'var(--radius-md)',
				}),
				menu: styles => ({
					...styles,
					backgroundColor: 'var(--colors-ui-base)',
					borderRadius: 'var(--radius-md)',
					boxShadow: 'var(--shadow-brand)',
					border: 'none',
					padding: '8px 0px',
				}),
				option: (styles, state) => ({
					...styles,
					cursor: 'pointer',
					padding: '4px 24px',
					fontSize: 'var(--text-sm)',
					fontFamily: 'var(--font-brand)',
					color: state.isSelected ? 'var(--color-neutral-400)' : 'var(--colors-text)',
					backgroundColor: 'transparent',
					'&:active': {
						backgroundColor: 'transparent', // Убирает фон при клике
					},
				}),
				singleValue: styles => ({
					...styles,
					color: 'var(--color-text)',
				}),
				placeholder: styles => ({
					...styles,
					color: 'var(--colors-text)',
					fontFamily: 'var(--font-brand)',
				}),
				indicatorSeparator: styles => ({
					...styles,
					display: 'none',
				}),
				dropdownIndicator: () => ({
					color: 'var(--color-text)',
					'& svg': {
						width: '16px', // Ширина иконки
						height: '16px', // Высота иконки
					},
				}),
			}}
			placeholder="Выберите регион"
			noOptionsMessage={({ inputValue }) => (inputValue ? 'Страна не найдена' : 'Начните вводить название')}
			isClearable
			{...rest}
		/>
	)
}

export default CustomSelect
