import React, { useEffect } from "react";
import { useCurrenciesStore } from "../store/currencyStore";

interface InfoModalProps {
    clickedDatasetIndex: number;
    setClickedDatasetIndex: React.Dispatch<React.SetStateAction<number>>;
    clickedDataIndex: number;
    setClickedDataIndex: React.Dispatch<React.SetStateAction<number>>;
}

const InfoModal: React.FC<InfoModalProps> = ({
    clickedDatasetIndex,
    setClickedDatasetIndex,
    clickedDataIndex,
    setClickedDataIndex,
}) => {
    const { selectedCurrenciesId, storedHistoricalData } = useCurrenciesStore(
        (state) => state,
    );
    const [showModal, setShowModal] = React.useState<boolean>(false);

    useEffect(() => {
        if (clickedDatasetIndex !== -1 && clickedDataIndex !== -1) {
            setShowModal(true);
        }
    }, [clickedDatasetIndex, clickedDataIndex]);

    const selectedUnixTime =
        storedHistoricalData[selectedCurrenciesId[clickedDatasetIndex]].prices[
            clickedDataIndex
        ][0];

    const date = new Date(selectedUnixTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return (
        <div
            className={` ${
                showModal ? "" : "hidden"
            } overflow-y-auto flex flex-col bg-gray-900 bg-opacity-50 overflow-x-hidden fixed top-0 left-0 right-0 bottom-0 z-50 justify-center items-center w-full h-[100%] max-h-full`}
        >
            <div className="relative p-4 mx-auto w-full sm:w-4/5 md:w-2/3 lg:w-1/3">
                <div className="relative bg-gray-200 rounded-lg shadow ">
                    <div className="flex items-center justify-between p-4 md:px-5 md:pb-0 md:pt-5 rounded-t ">
                        <h3 className="text-xl font-normal text-gray-900 ">
                            <span className="font-semibold">
                                {selectedCurrenciesId[
                                    clickedDatasetIndex
                                ].toUpperCase()}
                            </span>{" "}
                            on {`${month}-${day}-${year}`}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                            onClick={() => {
                                setShowModal(false);
                                setClickedDatasetIndex(-1);
                                setClickedDataIndex(-1);
                            }}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-500 grid grid-cols-2">
                            <span className="font-semibold">Price :</span>$
                            {
                                storedHistoricalData[
                                    selectedCurrenciesId[clickedDatasetIndex]
                                ].prices[clickedDataIndex][1]
                            }
                        </p>

                        <p className="text-base leading-relaxed text-gray-500 grid grid-cols-2">
                            <span className="font-semibold">Market Cap :</span>
                            {
                                storedHistoricalData[
                                    selectedCurrenciesId[clickedDatasetIndex]
                                ].market_caps[clickedDataIndex][1]
                            }
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 grid grid-cols-2">
                            <span className="font-semibold">Volume :</span>
                            {
                                storedHistoricalData[
                                    selectedCurrenciesId[clickedDatasetIndex]
                                ].total_volumes[clickedDataIndex][1]
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
