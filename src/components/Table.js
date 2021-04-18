import React, { useState } from "react";
import MaterialTable from 'material-table'

export const Table = (props) => {

    let data = props.users

    const col = [
        {
            title: 'Employee No', field: 'employeeno',
        },
        {
            title: 'Employee Name', field: 'employeename',
        },
        {
            title: 'Designation', field: 'designation',
        },
        {
            title: 'Department', field: 'department',
        },
        {
            title: 'Salary', field: 'salary',
        },

    ]


    return (

        <div>

            <MaterialTable
                title="Employee Table"
                data={data}
                columns={col}
                totalCount="1"
                actions={[

                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => {
                            props.deleteUser(rowData.id)

                        },
                        disabled: props.disabledAction
                    },

                ]}
                options={{
                    actionsColumnIndex: -1,
                    emptyRowsWhenPaging: true,
                    pageSize: props.pageSizeTab,
                    pageSizeOptions: [5, 10, 25, 50],
                    toolbar: false,
                    paging: true
                }}

            />
        </div>
    )
}

export default Table;