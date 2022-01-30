type PropsType = {
	isOpen: boolean,
	onClick: (el: any) => void,
	ratio: number
}

export default ({ isOpen = false, ratio = 3, onClick }: PropsType) => (
	<button className={`${isOpen ? 'opened' : ''}`} onClick={onClick} style={{'--ratio': ratio} as React.CSSProperties}>
		<span />
		<span />
		<span />
	</button>
)
