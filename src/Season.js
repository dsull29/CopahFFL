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

    const url = "https://script.google.com/macros/s/AKfycbxTAM8yFur_0_GkZarQ71ow_pDUCOdAKgg1MT3HdpDmi_JxfH7dIvBtjPTFVR5U-emMpQ/exec";

    const { data, isPending, error } = useFetch(url);

    const columns = useMemo(
        () => {
            if (data) {
                var array = [];
                // var tempColumns = ["Rank", "Owner", "Name", "Wins", "Losses", "Ties", "Points For", "Points Against", "Moves", "Playoffs", "RunnerUp", "Champion"];
                var tempColumns = data.columns
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
                console.log("seasons",data)
                for (let i = 0; i < data[year].length; i++) {
                    var rec = data[year][i]
                    array.push({
                        owner: rec[0],
                        name: rec[1],
                        w: rec[2],
                        l: rec[3],
                        t: rec[4],
                        pct: rec[5],
                        pf: rec[6],
                        pa: rec[7],
                        diff: rec[8].toFixed(2),
                        moves: rec[9],
                        finish: rec[10],
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
            <h2>Season Standings</h2>
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
                <div align="left"><pre>C - Champion    R - Runner Up    P - Playoffs</pre></div>
            </div>}
        </div>
    );
}


export default Home;