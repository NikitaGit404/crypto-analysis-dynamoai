import React, { useEffect } from "react";
import { useCurrenciesStore } from "../store/currencyStore";
import { getHistoricalData, getHistoricalDataTimeRange } from "../services/api";
import { StoredHistoricalData } from "../type/coinsType";

const FilterTime: React.FC = () => {
  const {
    upToDays,
    setUpToDays,
    setStoredHistoricalData,
    selectedCurrenciesId,
    setIsLoading,
  } = useCurrenciesStore((state) => state);

  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [range, setRange] = React.useState<string>("6");
  const [showCustomDates, setShowCustomDates] = React.useState<boolean>(false);

  //fetch crypto data for custom dates
  const updateHistoricalDataCustomDate = async (start: string, end: string) => {
    try {
      setIsLoading(true);
      const tempData: any = {};
      for (const currencyId of selectedCurrenciesId) {
        const response = await getHistoricalDataTimeRange(
          currencyId,
          start,
          end
        );
        tempData[currencyId] = response;
      }
      setStoredHistoricalData(tempData);
    } catch (error) {
      console.error("Error fetching historical data", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    //fetch crypto data for past week, month or year
    const updateHistoricalData = async () => {
      const currencyIds = selectedCurrenciesId;
      const tempData: StoredHistoricalData = {};
      try {
        for (const currencyId of currencyIds) {
          const response = await getHistoricalData(currencyId, upToDays);
          tempData[currencyId] = response;
        }
        setStoredHistoricalData(tempData);
      } catch (error) {
        console.error("Error fetching historical data", error);
      }
    };
    if (showCustomDates) {
      if (startDate !== "" && endDate !== "") {
        const start = new Date(startDate).getTime() / 1000;
        const end = new Date(endDate).getTime() / 1000;
        if (start > end) {
          alert("Start date cannot be greater than end date");
          return;
        } else {
          updateHistoricalDataCustomDate(String(start), String(end));
        }
      } else {
        updateHistoricalData();
      }
    } else {
      updateHistoricalData();
      setStartDate("");
      setEndDate("");
    }
  }, [upToDays, selectedCurrenciesId, showCustomDates]);

  return (
    <>
      {selectedCurrenciesId.length !== 0 && (
        <div className="flex flex-row items-center justify-start w-3/4 my-2 space-x-10">
          <div className="flex flex-row items-center justify-center space-x-2">
            <label className="text-lg font-normal">Range: </label>
            <select
              className="px-2 py-1 border border-gray-300 rounded-md"
              value={range}
              // value={upToDays}
              onChange={(e) => {
                if (e.target.value === "custom") {
                  setShowCustomDates(true);
                } else {
                  setUpToDays(e.target.value);
                  setShowCustomDates(false);
                }
                setRange(e.target.value);
                // setUpToDays(e.target.value);
              }}
            >
              <option value="6">Week</option>
              <option value="29">Month</option>
              <option value="364">Year</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          {showCustomDates && (
            <div className="flex flex-row items-center space-x-2">
              <label className="text-lg font-normal">Custom Date Range: </label>
              <div className="space-x-4">
                <input
                  type="date"
                  value={startDate}
                  className="px-2 py-1 border border-gray-300 rounded-md"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
                <input
                  type="date"
                  value={endDate}
                  className="px-2 py-1 border border-gray-300 rounded-md"
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
              <div>
                <button
                  className="bg-gray-50 border border-gray-800 rounded-lg px-4 py-1 hover:bg-gray-200 disabled:cursor-not-allowed"
                  disabled={startDate === "" || endDate === ""}
                  onClick={() => {
                    if (startDate !== "" && endDate !== "") {
                      const start = new Date(startDate).getTime() / 1000;
                      const end = new Date(endDate).getTime() / 1000;
                      if (start > end) {
                        alert("Start date cannot be greater than end date");
                        return;
                      } else {
                        updateHistoricalDataCustomDate(
                          String(start),
                          String(end)
                        );
                      }
                    } else {
                      alert("Please enter start date and end date");
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FilterTime;
