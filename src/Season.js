import { useMemo, useState } from "react";
import SortingTable from "./components/SortingTable";
import Totals from "./Totals";
// import BasicTable from "./components/BasicTable";
import useFetch from "./useFetch";

const Home = () => {
    // const [parsed, setParsed] = useState(false);
    // const [columns, setColumns] = useState([]);
    // const [columns, setColumns] = useState([])
    const [year, setYear] = useState(2020);

    const url = "https://script.google.com/macros/s/AKfycbwhqOY0secls5WtwntQp-0-UCcXZO9Dp_D0_6Vs6_O_IGCB9e2PyfVhlRif4X2ui52ChA/exec";

    const { data, isPending, error } = useFetch(url);

    const columns = useMemo(
        () => {
            if (data) {
                var array = [];
                var tempColumns = ["Rank", "Owner", "Name", "Wins", "Losses", "Ties", "Points For", "Points Against", "Moves", "Playoffs", "RunnerUp", "Champion"];
                //var tempColumns = data.columns
                for (let i = 0; i < tempColumns.length; i++) {
                    var field = tempColumns[i]
                    var fieldLow = field.toString()
                    fieldLow = fieldLow.replace(/\s/g, '');
                    array.push({
                        Header: field,
                        accessor: fieldLow.toLowerCase()
                    })
                }
                return array
            }
        },
        [data]
    );

    const records = useMemo(
        () => {
            if (data) {
                var array = [];

                // const { year, rec } = data.seasons[0]
                for (let i = 0; i < data[year].length; i++) {
                    var rec = data[year][i]
                    array.push({
                        rank: rec[0],
                        name: rec[1],
                        wins: rec[2],
                        losses: rec[3],
                        ties: rec[4],
                        pointsfor: rec[5],
                        pointsagainst: rec[6],
                        moves: rec[7],
                        playoffs: rec[8],
                        runnerup: rec[9],
                        champion: rec[10],
                        owner: rec[11]


                    })
                }
                return array
            }
        },
        [year, data]
    );

    function createSelectItems() {
        let seasons = [];
        for (let season = 2020; season > 2000; season--) {
            seasons.push(<option key={season} value={season}>{season}</option>);
        }
        return seasons;
    }

    return (
        <div className="content">
            <h2>COPAH FFL Season History</h2>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {data && <div>
                {/* <BasicTable columns={columns} data={records} /> */}
                <div align="right">
                    <form>
                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}>
                            {createSelectItems()}
                        </select>
                    </form>
                </div>
                <SortingTable columns={columns} data={records} />
            </div>}
        </div>
    );
}


export default Home;