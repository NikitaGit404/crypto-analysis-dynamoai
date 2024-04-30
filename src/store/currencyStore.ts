import { create } from "zustand";
import { StoredHistoricalData } from "../type/coinsType";

type CurrenciesStore = {
    selectedCurrenciesId: string[];
    setSelectedCurrenciesId: (selectedCurrenciesId: string[]) => void;
    upToDays: string;
    setUpToDays: (upToDays: string) => void;
    storedHistoricalData: StoredHistoricalData;
    setStoredHistoricalData: (historicalData: StoredHistoricalData) => void;
    colorMap: { [key: string]: string };
    setColorMap: (colorMap: { [key: string]: string }) => void;
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void;
};

export const useCurrenciesStore = create<CurrenciesStore>((set) => ({
    selectedCurrenciesId: [],
    setSelectedCurrenciesId: (selectedCurrenciesId) =>
        set({ selectedCurrenciesId }),
    upToDays: "6",
    setUpToDays: (upToDays) => set({ upToDays }),
    storedHistoricalData: {} as StoredHistoricalData,
    setStoredHistoricalData: (storedHistoricalData) =>
        set({ storedHistoricalData }),
    colorMap: {},
    setColorMap: (colorMap) => set({ colorMap }),
    isLoading: false,
    setIsLoading: (isLoading)=> set({isLoading})
}));
