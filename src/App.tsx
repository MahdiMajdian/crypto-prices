import React from "react"
import styled from "@emotion/styled"

const MainPage = styled.main`
	color: #555;
	background-color: #eee;
	height: 100vh;
`
const Header = styled.header`
	position: fixed;
	height: 6rem;
	width: 100%;
	display: flex;
	align-items: center;
	background: #ffffff;
	padding: 0 4rem;
`
const Title = styled.p`
	font-size: 2rem;
`
const Container = styled.div`
	height: 100%;
	width: 100%;
	padding: 6rem 1rem 0 1rem;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`
const Card = styled.div`
	background-color: white;
	border-radius: 4px;
	box-shadow: 2px 2px 4px #aaa;
	margin: 1rem;
	flex: 1 1 15rem;
	&:nth-child(2) {
		flex: 3 1 30rem;
	}
`

function App() {
	return (
		<MainPage>
			<Header>
				<Title>Crypto</Title>
			</Header>
			<Container>
				<Card>ddd</Card>
				<Card>ddd</Card>
			</Container>
		</MainPage>
	)
}

export default App
