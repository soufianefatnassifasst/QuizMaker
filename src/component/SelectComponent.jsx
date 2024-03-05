import React from "react";

const SelectComponent = ({name, placeHolder, options,  register}) => {
    return (
        <select id={name} {...register(name)}>
            <option value="">{placeHolder}</option>
            {options.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </select>
    );
}

export default SelectComponent;
