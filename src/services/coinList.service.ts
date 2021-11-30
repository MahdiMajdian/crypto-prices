import axios from "axios"

export const getCoinList = async () => {
	const response = await axios.get(
		"https://api.kucoin.com/api/v1/symbols?market=USDS"
	)

	if (!(response.status === 200)) {
		throw Error("failed to fetch the data")
	}
	return response.data
}
