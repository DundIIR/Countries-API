interface IProps {
	children: React.ReactNode
}

const List = ({ children }: IProps) => {
	return (
		<div
			className="grid 
      w-full 
      gap-12
      grid-cols-1
			px-8
      sm:grid-cols-2 
			sm:px-0
			sm:gap-10
			lg:grid-cols-3
      lg:gap-12
      xl:grid-cols-4
      xl:gap-14 mb-30">
			{children}
		</div>
	)
}

export default List
