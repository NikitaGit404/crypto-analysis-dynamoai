import axios from "axios";
import { CoinsList, HistoricalData } from "../type/coinsType";

export const getSupportedCurrencies = async (): Promise<CoinsList[]> => {
    const options = {
        method: "GET",
        url: `${process.env.REACT_APP_BASE_API}/coins/list`,
        params: { vs_currency: "usd", days: "1", interval: "daily" },
        headers: {
            accept: "application/json",
            "x-cg-demo-api-key": process.env.REACT_APP_API_KEY,
        },
    };
    try {
        const response = await axios.request<CoinsList[]>(options);
        return response.data;
    } catch (error) {
        console.error("Error fetching cryptocoins", error);
        alert(error);
        throw error;
    }
};

export const getHistoricalData = async (coinId: string, upToDays: string) => {
    const options = {
        method: "GET",
        url: `${process.env.REACT_APP_BASE_API}/coins/${coinId}/market_chart`,
        params: {
            vs_currency: "usd",
            days: upToDays,
            interval: "daily",
            precision: "2",
        },
        headers: {
            accept: "application/json",
            "x-cg-demo-api-key": process.env.REACT_APP_API_KEY,
        },
    };
    try {
        const response = await axios.request<HistoricalData>(options);
        return response.data;
    } catch (error) {
        console.error("Error fetching historical data", error);
        alert(error);
        throw error;
    }
};

export const getHistoricalDataTimeRange = async (
    coinId: string,
    fromDate: string,
    toDate: string,
) => {
    const options = {
        method: "GET",
        url: `${process.env.REACT_APP_BASE_API}/coins/${coinId}/market_chart/range`,
        params: {
            vs_currency: "usd",
            from: fromDate,
            to: toDate,
            precision: "2",
        },
        headers: {
            accept: "application/json",
            "x-cg-demo-api-key": process.env.REACT_APP_API_KEY,
        },
    };
    try {
        const response = await axios.request<HistoricalData>(options);
        return response.data;
    } catch (error) {
        console.error("Error fetching historical data", error);
        alert(error);
        throw error;
    }
};
