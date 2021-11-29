import React from "react"
import styled from "@emotion/styled"

const Item = styled.li`
	margin: 0 0.5rem;
	padding: 1rem 0;
	border-bottom: 1px solid #ddd;
	display: flex;
`
const StarIcon = styled.div`
	width: auto;
	height: 100%;
	padding: 0.5rem;
`
interface ICoinItemProps
	extends React.DetailedHTMLProps<
		React.LiHTMLAttributes<HTMLLIElement>,
		HTMLLIElement
	> {
	name: string
	baseCurrency: string
	isPinned: boolean
}
const CoinItem: React.FC<ICoinItemProps> = ({
	name,
	baseCurrency,
	isPinned,
	...props
}) => {
	return (
		<Item {...props}>
			<StarIcon>
				<i
					className="fa fa-star"
					style={{
						fontSize: "2rem",
						color: isPinned ? "#fc0" : "#ddd",
					}}></i>
			</StarIcon>
			<div>
				<h3>{name}</h3>
				<p>{baseCurrency}</p>
			</div>
		</Item>
	)
}

export default CoinItem
