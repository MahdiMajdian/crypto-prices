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
				const coinList = await getCoinList()

				setCoinList(coinList.data)
			} catch (e) {}
		}
		const fetchBitcoinPrice = async () => {
			try {
				const bitcoinPrice = await getBitcoinPrice()

				setBitcoinPrices(bitcoinPrice.data)
			} catch (e) {}
		}
		fetchCoinList()
		fetchBitcoinPrice()

		const interval = setInterval(() => {
			fetchCoinList()
			fetchBitcoinPrice()
		}, 100000)
		return () => clearInterval(interval)
	}, [])

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
