export type CoinsList = {
    id: string;
    symbol: string;
    name: string;
};

export type HistoricalData = {
    market_caps: [];
    prices: [];
    total_volumes: [];
};

export type StoredHistoricalData = {
    [key: string]: HistoricalData;
};
