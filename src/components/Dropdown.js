import React from "react";
import NativeSelect from '@material-ui/core/NativeSelect';
const Dropdown = (props) => {

    const items = props.items.map((ctrl) => (
        <option key={ctrl.value} value={ctrl.value}>
            {ctrl.name}
        </option>
    ));
   
    return (
        <div>
            <NativeSelect fullWidth id="select" name={props.deptmentname} onChange={props.onDepartmentChange}>
                <option value="">Select {props.deptmentname}</option>
                {items}
            </NativeSelect>
        </div>
    );
};

export default Dropdown;