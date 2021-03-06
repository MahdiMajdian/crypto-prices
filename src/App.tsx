import React, { useEffect, useRef, useState } from "react"
import { getCoinList } from "./services/coinList.service"
import { getBitcoinPrice } from "./services/bitcoinPrice.service"
import { ICoin } from "./types"
import _ from "lodash"
import "../node_modules/react-vis/dist/style.css"
import {
	XYPlot,
	LineSeries,
	HorizontalGridLines,
	YAxis,
	XAxis,
	VerticalGridLines,
} from "react-vis"
import CoinItem from "./components/CoinItem/CoinItem"
import { useContainerDimensions } from "./hooks/useContainerDimensions"
import { MainPage, Header, Container, Card } from "./components/UI"

let data: { x: number; y: number }[] = []
const localPinList = JSON.parse(localStorage.getItem("pins")!)

function App() {
	const [error, setError] = useState<any>()
	const [isLoading, setIsLoading] = useState(false)

	const [coinList, setCoinList] = useState<ICoin[]>([])
	const [bitcoinPrices, setBitcoinPrices] = useState<string[][]>([])
	const [pinList, setPinList] = useState<ICoin[]>(localPinList)

	const graphRef = useRef<HTMLDivElement>(null)
	const { width, height } = useContainerDimensions(graphRef)

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

	useEffect(() => {
		const result = bitcoinPrices.map((item, index) => {
			return { x: index, y: +item[2] }
		})
		data = result
	}, [bitcoinPrices])

	const itemClickHandler = (item: ICoin) => {
		setPinList((prev) => {
			const existingItem = _.find(prev, (o) => _.isEqual(item, o))
			let state
			if (existingItem !== undefined) {
				state = prev.filter((i) => !_.isEqual(i, item))
			} else {
				state = [...prev, item]
			}
			localStorage.setItem("pins", JSON.stringify(state))
			return state
		})
	}

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
				<Card>
					{error === null ? (
						<ul>
							{pinList.map((item) => (
								<CoinItem
									key={Math.random()}
									name={item.name}
									baseCurrency={item.baseCurrency}
									isPinned
									onClick={() => itemClickHandler(item)}
								/>
							))}
							{coinList
								.filter((item) => {
									const result = _.find(pinList, (o) =>
										_.isEqual(item, o)
									)
									return result === undefined
								})
								.map((item) => (
									<CoinItem
										key={Math.random()}
										name={item.name}
										baseCurrency={item.baseCurrency}
										isPinned={false}
										onClick={() => itemClickHandler(item)}
									/>
								))}
						</ul>
					) : (
						<h4 style={{ padding: "1rem 0", textAlign: "center" }}>
							Some thing went wrong:
							<pre>{JSON.stringify(error, null, 2)}</pre>
						</h4>
					)}
				</Card>
				<Card ref={graphRef}>
					<XYPlot
						height={height - 32}
						width={width - 32}
						stroke="red"
						animation>
						<HorizontalGridLines />
						<VerticalGridLines />

						<YAxis title="Price" />
						<XAxis title="Date" />
						<LineSeries animation data={data} />
					</XYPlot>
				</Card>
			</Container>
		</MainPage>
	)
}

export default App
