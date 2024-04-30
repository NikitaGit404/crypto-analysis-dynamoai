import React, { useEffect } from "react";
import { getSupportedCurrencies } from "../services/api";
import { useCurrenciesStore } from "../store/currencyStore";
import { CoinsList } from "../type/coinsType";

const Search: React.FC = () => {
  const {
    selectedCurrenciesId,
    setSelectedCurrenciesId,
    colorMap,
    setColorMap,
  } = useCurrenciesStore((state) => state);

  const [searchValue, setSearchValue] = React.useState<string>("");
  const [allCurrencies, setAllCurrencies] = React.useState<CoinsList[]>([]);
  const [matchingCurrencies, setMatchingCurrencies] = React.useState<
    CoinsList[]
  >([]);

  //fetch all currencies when the component renders for the first time
  const getCurrencies = async () => {
    try {
      const response = await getSupportedCurrencies();
      setAllCurrencies(response);
    } catch (error) {
      console.error("Error fetching cryptocoins", error);
      alert("Error fetching cryptocoins");
    }
  };
  useEffect(() => {
    getCurrencies();
  }, []);

  //add new currency to the line chart
  const addCurrency = async () => {
    if (selectedCurrenciesId.includes(searchValue)) {
      alert("Currency already added");
    } else {
      if (
        !allCurrencies.find(
          (currency) =>
            currency.id === searchValue || currency.name === searchValue
        )
      ) {
        alert("Currency not supported");
        return;
      } else {
        setSelectedCurrenciesId([...selectedCurrenciesId, searchValue]);
        setSearchValue("");
        setMatchingCurrencies([]);
        const tempColorMap = { ...colorMap };
        tempColorMap[searchValue] = `rgba(${Math.random() * 255},${
          Math.random() * 255
        },${Math.random() * 255},0.6)`;
        setColorMap(tempColorMap); //assign specific color to every currency
      }
    }
  };
  return (
    <div className="relative w-3/4 mx-auto mt-2 flex flex-col items-center justify-start">
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Crypto Currency..."
          value={searchValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addCurrency();
            }
          }}
          onChange={(e) => {
            setSearchValue(e.target.value);
            if (e.target.value === "") {
              setMatchingCurrencies([]);
            } else {
              setMatchingCurrencies(
                allCurrencies.filter(
                  (currency) =>
                    currency.name
                      .toLowerCase()
                      .startsWith(e.target.value.toLowerCase()) ||
                    currency.symbol
                      .toLowerCase()
                      .startsWith(e.target.value.toLowerCase())
                )
              );
            }
          }}
        />

        <button
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          onClick={addCurrency}
        >
          Add
        </button>
      </div>
      {matchingCurrencies.length > 0 && (
        <ul className="w-full border border-gray-300 rounded-lg max-h-[20vh] overflow-y-auto absolute top-[6.5vh]">
          {matchingCurrencies.map((currency) => (
            <li
              key={currency.id}
              className="w-full py-2 px-4 text-sm text-gray-900 bg-gray-50 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSearchValue(currency.id);
                setMatchingCurrencies([]);
              }}
            >
              <span className="font-bold">{currency.symbol}</span> -{" "}
              {currency.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
