interface IProps {
	children: React.ReactNode
}

const Main = ({ children }: IProps) => {
	return <div className="container flex flex-col gap-7 ">{children}</div>
}

export default Main
