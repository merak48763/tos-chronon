import {
  ToggleButton,
  IconButton,
  Tooltip,
  Radio,
  Typography,
} from "@mui/material";
import { RefreshOutlined as ResetIcon } from "@mui/icons-material";
import { useChrononInfo } from "../data/chrononInfo";
import styled from "@emotion/styled";

const FilterWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-flow: column nowrap;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const TagGroupContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  &:not(:last-of-type) {
    margin-bottom: 12px;
  }
`;

const TagButton = styled(ToggleButton)`
  padding: 6px 8px;
  margin: 4px;
  width: 10em;
`;

const TagGroup = ({selectedValues, availableValues, displayValues, onChange, active, onToggle}) => {
  const handleOnChange = (_, toggledKey) => {
    const index = selectedValues?.indexOf(toggledKey) ?? -1;
    if(selectedValues && index >= 0) {
      const newValue = [...selectedValues];
      newValue.splice(index, 1);
      onChange?.(newValue);
      onToggle(newValue.length > 0);
    }
    else {
      const newValue = selectedValues ? selectedValues.concat(toggledKey) : [toggledKey];
      onChange(newValue);
      onToggle(true);
    }
  }

  return (
    <TagGroupContainer>
      {availableValues.map((v, i) => (
        <TagButton key={v} value={v} onChange={handleOnChange} selected={selectedValues.indexOf(v) >= 0} color={active ? "primary" : "standard"} disableRipple>{displayValues[i]}</TagButton>
      ))}
    </TagGroupContainer>
  );
}

const Filter = ({selectedValues, availableValues, displayValues, onChange, active, onToggle, title}) => {
  return (
    <FilterWrapper>
      <TitleWrapper>
        <Radio size="small" checked={active} onClick={() => onToggle(selectedValues.length > 0 && !active)} disableRipple />
        <Typography variant="h6" component="div" sx={{mr: 3}}>{title}</Typography>
        <Tooltip title="清除">
          <IconButton onClick={() => {
            onChange([]);
            onToggle(false);
          }}>
            <ResetIcon />
          </IconButton>
        </Tooltip>
      </TitleWrapper>
      <TagGroup selectedValues={selectedValues} availableValues={availableValues} displayValues={displayValues} onChange={onChange} active={active} onToggle={onToggle} />
    </FilterWrapper>
  );
}

const StarFilter = ({value, onChange, active, onToggle}) => (
  <Filter selectedValues={value} onChange={onChange} availableValues={[1, 2, 3]} displayValues={["1 ★", "2 ★", "3 ★"]} active={active} onToggle={onToggle} title="顯示指定星數" />
)

const SeriesFilter = ({value, onChange, active, onToggle}) => {
  const {series} = useChrononInfo();
  return (
    <Filter selectedValues={value} onChange={onChange} availableValues={series.map(s => s.id)} displayValues={series.map(s => s.name)} active={active} onToggle={onToggle} title="顯示指定系列" />
  );
}

export { StarFilter, SeriesFilter };
