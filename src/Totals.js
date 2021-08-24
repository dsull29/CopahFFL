import { useMemo, useState } from "react";
import TotalsTable from "./components/TotalsTable";
// import BasicTable from "./components/BasicTable";
import useFetch from "./useFetch";

const Totals = () => {
    // const [parsed, setParsed] = useState(false);
    // const [columns, setColumns] = useState([]);
    // const [columns, setColumns] = useState([])
    // const [year, setYear] = useState(2020);

    const url = "https://script.google.com/macros/s/AKfycbxgs-DrXBIjhgVZeOevCOHtrzvRRRFAVyuaFly8to7Lw4uYut8IrjqWZ4UG3yX9N3bQbA/exec";

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
                        wins: rec[2],
                        losses: rec[3],
                        ties: rec[4],
                        pointsfor: rec[5].toFixed(2),
                        pointsagainst: rec[6].toFixed(2),
                        moves: rec[7],
                        playoffs: rec[8],
                        runnerup: rec[9],
                        champion: rec[10],
                        winpct: rec[11].toFixed(3),
                        avgfinish: rec[12].toFixed(2),
                    })
                }
                return array
            }
        },
        [data]
    );

    return (
        <div className="content">
            <h2>COPAH FFL Totals</h2>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {data && <div>
                <TotalsTable columns={columns} data={records}/>
            </div>}
        </div>
    );
}


export default Totals;