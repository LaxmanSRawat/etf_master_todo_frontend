import {AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community'
import {AgGridReact} from 'ag-grid-react'
import { useMemo, useState, useEffect } from 'react'
import './tasks_table.css'

//Register all Community features
ModuleRegistry.registerModules([AllCommunityModule])

// Fetch data & update rowData state


const myTheme = themeQuartz.withParams({
    /* Low spacing = very compact */
    spacing: 2,
    /* Changes the color of the grid text */
    foregroundColor: 'rgba(255, 255, 255, 0.87)',
    /* Changes the color of the grid background */
    backgroundColor: ' #1a1a1a',
    /* Changes the header color of the top row */
    headerBackgroundColor: ' #1a1a1a',
    /* Changes the hover color of the row*/
    // rowHoverColor: 'rgb(216, 226, 255)',
});

function status_id_mapping(status_id) {
    switch (status_id) {
        case 1:
            return "Not Started"

        case 2:
            return "In Progress"

        case 3:
            return "Completed"

        case 4:
            return "Cancelled"

        case 5:
            return "Deleted"

        
    }
}

function priority_id_mapping(priority_id) {
    switch (priority_id) {
        case 1:
            return "Critical"

        case 2:
            return "High"

        case 3:
            return "Medium"

        case 4:
            return "Low"

        case 5:
            return "Lowest"

        
    }
}

 export default function GridExample () {

    //Row Data: The data to be Displayed
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/tasks') // Fetch data from server
            .then(result => result.json()) // Convert to JSON
            .then(rowData => setRowData(rowData)); // Update state of `rowData`
    }, [])

    const [colDefs, setColDefs] = useState([
        { field: "task_title" },
        { field: "task_description" },
        { field: "planned_start_date" },
        { field: "planned_end_date" },
        { field: "status", valueGetter: (p) => status_id_mapping(p.data.status_id)},
        { field: "priority", valueGetter: (p) => priority_id_mapping(p.data.priority_id)},
        { field: "is_completed",valueGetter: (p) => p.data.completed_on?true:false, editable:true, cellRenderer: 'agCheckboxCellRenderer', cellEditor: "agCheckboxCellEditor",}
    ]);

    const rowSelection = useMemo(() => {
        return {
            mode: 'singleRow',
        }
    },[])

    const pagination = true;
    const paginationPageSize = 500;
    const paginationPageSizeSelector = [200, 500, 1000];

    return (
        //Data Grid will fill the size of the parent container
        <div className='task_table'>
            <AgGridReact 
            rowData={rowData} 
            columnDefs={colDefs}
            rowSelection={rowSelection}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
            theme={myTheme} />
        </div>
    )



}

const CustomButtonComponent = (props) => {
    return <button onClick={() => window.alert('clicked') }>Push Me!</button>;
};

