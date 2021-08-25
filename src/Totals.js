import { useMemo, useState } from "react";
import TotalsTable from "./components/TotalsTable";
// import BasicTable from "./components/BasicTable";
import useFetch from "./useFetch";

const Totals = () => {
    // const [parsed, setParsed] = useState(false);
    // const [columns, setColumns] = useState([]);
    // const [columns, setColumns] = useState([])
    // const [year, setYear] = useState(2020);

    const url = "https://script.google.com/macros/s/AKfycbxqxkKKl1FzuedrRS_BfGQQMu57zb7iEX4dMwLZFaXEx6OGqWVw_UfsDoQ8FlZyQRYAbg/exec";

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
                for (let i = 0; i < data["Totals"].length; i++) {
                    var rec = data["Totals"][i]
                    array.push({
                        owner: rec[0],
                        seasons: rec[1],
                        w: rec[2],
                        l: rec[3],
                        t: rec[4],
                        pct: rec[5],
                        pf: rec[6].toFixed(2),
                        pa: rec[7].toFixed(2),
                        diff: rec[8].toFixed(2),
                        moves: rec[9],
                        playoffs: rec[10],
                        copahbowl: rec[11],
                        championships: rec[12]
                    })
                }
                return array
            }
        },
        [data]
    );

    return (
        <div className="content">
            <h2>All Time Standings</h2>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {data && <div>
                <TotalsTable columns={columns} data={records}/>
            </div>}
        </div>
    );
}


export default Totals;