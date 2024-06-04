import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const SelectItem = ({ label, value, handleChange, options, icon }) => {
    console.log("options", options);
    return (
        <Box sx={{ minWidth: 120, textTransform:"capitalize"}}>
            <FormControl fullWidth>
                <InputLabel
                    id="demo-simple-select-label"
                    sx={{ display: "flex", gap: "5px",justifyContent:"center",alignItems:"center" }}
                >
                    <span>{icon}</span>
                    <span>{label}</span>
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={`${icon}${label}`}
                    onChange={handleChange}
                >
                    {options.map((item) => {
                        console.log(item);
                        return <MenuItem className="capitalize" value={item}>{item}</MenuItem>;
                    })}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectItem;
