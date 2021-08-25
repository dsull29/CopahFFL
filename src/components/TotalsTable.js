import { useSortBy, useTable } from "react-table";

export default function TotalsTable({columns,data}) {
    // Use the useTable Hook to send the columns and data to build the table

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable(
        {
            columns,
            data
        },
        useSortBy
    );


    return (
        <table {...getTableProps()}>
            <thead style={styles.thead}>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render("Header")}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} style={isChampion(row) || isRunnerUp(row)}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()} style={styles.td}>
                                    {cell.render("Cell")}
                                </td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

}

function isChampion(row) {

     if (row.cells[12].value) {
        return styles.champion
     }
}
;

function isRunnerUp(row) {

    if (row.cells[11].value) {
       return styles.runnerup
    }
}
;

const styles = {
    thead: {
        backgroundColor: "green",
    },
    td: {
        padding: "10px",
        border: "dotted 1px black",
    },
    champion: {
        backgroundColor: "gold",
    },
    runnerup: {
        backgroundColor: "silver",
    },
};