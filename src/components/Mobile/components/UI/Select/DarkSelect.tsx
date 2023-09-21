import { themeList } from "@/theme";
import i18n from "@/utils/i18n";
import {
    FormControlProps,
    InputLabel,
    MenuItem,
    FormControl as MuiFormControl,
    Select as MuiSelect,
} from "@material-ui/core";
import { SelectInputProps } from "@material-ui/core/Select/SelectInput";
import styled from "styled-components";

const theme = themeList["mobileT18"];

const StyledFormControl = styled(MuiFormControl)`
  border-radius: 8px;
  margin-right: 10px;
  border: 1px solid ${theme.tertiary};

  & label {
    color: #646973;
  }

  & .MuiSelect-root {
    overflow: visible;
    color: #ffffff !important;
  }

  & .MuiSvgIcon-root {
    color: ${theme.tertiary};
    transform: scale(1.3);
  }
`;

const StyledSelect = styled(MuiSelect)`
  height: 38px !important;
`;

export interface SelectItem {
    label: string;
    value: any;
}

type Props = {
    label: string;
    selectItem: SelectItem;
    handleChange: (newSelectItem: SelectItem) => void;
    selectItemList: SelectItem[];
    backgroundColor?: string;
} & FormControlProps;

const Select = ({
    label,
    selectItem,
    handleChange,
    selectItemList = [],
    backgroundColor = "#212937",
    ...others
}: Props) => {
    const handleSelectChange: SelectInputProps["onChange"] = (event) => {
        const selectedValue = event.target.value;
        const chosenSelectItem = selectItemList.find(
            (selectedItem) => selectedItem.value === selectedValue
        );

        handleChange(chosenSelectItem);
    };
    return (
        // @ts-ignore
        <StyledFormControl variant="outlined" {...others}>
            <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
            <StyledSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selectItem.value}
                onChange={handleSelectChange}
                label={label}
                style={{
                    background: backgroundColor,
                }}
            >
                {selectItemList.map((selectItem) => {
                    const { label, value } = selectItem;
                    return (
                        <MenuItem key={value} value={value}>
                            {i18n.t(`common.${selectItem.label}`)}
                        </MenuItem>
                    );
                })}
            </StyledSelect>
        </StyledFormControl>
    );
};

export default Select;
