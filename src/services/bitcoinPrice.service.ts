import axios from "axios"

export const getBitcoinPrice = async () => {
	const response = await axios.get(
		"https://api.kucoin.com/api/v1/market/candles?type=1day&symbol=BTC-USDT&startAt=1606071973"
	)

	if (!(response.status === 200)) {
		throw Error("failed to fetch the data")
	}
	return response.data
}
