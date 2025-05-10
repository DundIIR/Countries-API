import { FC, JSX } from 'react'

interface IInfoItem {
	title: string
	description: string
}

interface IProps {
	img: string
	title: string
	info?: IInfoItem[]
	onClick?: () => void
}

const Card: FC<IProps> = ({ img, title, info = [], onClick }): JSX.Element => {
	return (
		<div className="bg-ui shadow-brand rounded-md cursor-pointer overflow-hidden" onClick={onClick}>
			<img
				src={img}
				alt={title}
				className="block w-full h-40 shadow-brand object-center dark:brightness-80 dark:hover:brightness-95 transition-all duration-300"
			/>
			<div className="py-8 px-6">
				<h3 className="font-extrabold mb-3">{title}</h3>
				<ul className="text-sm">
					{info.map(el => (
						<li key={el.title}>
							<span className="font-semibold">{el.title}: </span>
							{el.description}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Card
