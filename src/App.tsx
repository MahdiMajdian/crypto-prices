import React, { useEffect, useRef, useState } from "react"
import { getCoinList } from "./services/coinList.service"
import { getBitcoinPrice } from "./services/bitcoinPrice.service"
import { ICoin } from "./types"
import _ from "lodash"
import "../node_modules/react-vis/dist/style.css"

import { MainPage, Header, Container, Card } from "./components/UI"

function App() {
	const [error, setError] = useState<any>()
	const [isLoading, setIsLoading] = useState(false)
	const [coinList, setCoinList] = useState<ICoin[]>([])
	const [bitcoinPrices, setBitcoinPrices] = useState<string[][]>([])

	useEffect(() => {
		const fetchCoinList = async () => {
			try {
				setIsLoading(true)
				const coinList = await getCoinList()
				setIsLoading(false)
				setCoinList(coinList.data)
				setError(null)
			} catch (e) {
				setIsLoading(false)
				setError(e)
			}
		}
		const fetchBitcoinPrice = async () => {
			try {
				setIsLoading(true)
				const bitcoinPrice = await getBitcoinPrice()
				setIsLoading(false)
				setBitcoinPrices(bitcoinPrice.data)
				setError(null)
			} catch (e) {
				setIsLoading(false)
				setError(e)
			}
		}
		fetchCoinList()
		fetchBitcoinPrice()

		const interval = setInterval(() => {
			fetchCoinList()
			fetchBitcoinPrice()
		}, 100000)
		return () => clearInterval(interval)
	}, [])

	if (isLoading) {
		return (
			<MainPage>
				{" "}
				<h1> Loading... </h1>
			</MainPage>
		)
	}

	return (
		<MainPage>
			<Header>
				<p style={{ fontSize: "2rem" }}>Crypto</p>
			</Header>
			<Container>
				<Card></Card>
				<Card></Card>
			</Container>
		</MainPage>
	)
}

export default App
