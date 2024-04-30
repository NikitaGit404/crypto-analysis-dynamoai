import React from "react";
import Search from "./components/Search";
import Chart from "./components/Chart";
import FilterTime from "./components/FilterTime";

const App: React.FC = () => {
    return (
        <div className="flex flex-col space-x-10 items-center ">
            <Search></Search>
            <FilterTime></FilterTime>
            <Chart></Chart>
        </div>
    );
};

export default App;
