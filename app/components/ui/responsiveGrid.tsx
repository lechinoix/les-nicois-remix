import "./responsiveGrid.css"

type PropsType ={ items: { component: any; props: {}; key: string }[] };

export default ({ items }: PropsType) => (
	<div className="responsive-grid">
		{items.map(item => (
			<div className="responsive-grid__item" key={item.key}>
				<div className="responsive-grid__item-content">
					<item.component {...item.props} />
				</div>
			</div>
		))}
	</div>
)
