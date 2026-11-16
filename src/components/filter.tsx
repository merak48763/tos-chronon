import styled from "@emotion/styled";
import { RefreshOutlined as ResetIcon } from "@mui/icons-material";
import type { ToggleButtonProps } from "@mui/material";
import { IconButton, Radio, ToggleButton, Tooltip, Typography } from "@mui/material";
import type { FC, ReactNode } from "react";
import { useEffect } from "react";

import { groupedSkillFilterIds, groupedSkillFilterNames, useChrononInfo } from "../data/chrononInfo";

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

interface FilterBaseProps {
  onChange?: (values: number[]) => void;
  active: boolean;
  onToggle?: (value: boolean) => void;
}

interface TagGroupProps extends FilterBaseProps {
  selectedValues: number[];
  availableValues: number[];
  displayValues: ReactNode[];
}

const TagGroup: FC<TagGroupProps> = (
  { selectedValues, availableValues, displayValues, onChange, active, onToggle },
) => {
  const handleOnChange: ToggleButtonProps["onChange"] = (_, toggledKey) => {
    const index = selectedValues.indexOf(toggledKey) ?? -1;
    if (selectedValues && index >= 0) {
      const newValue = [...selectedValues];
      newValue.splice(index, 1);
      onChange?.(newValue);
      onToggle?.(newValue.length > 0);
    } else {
      const newValue = selectedValues ? selectedValues.concat(toggledKey) : [toggledKey];
      onChange?.(newValue);
      onToggle?.(true);
    }
  };

  return (
    <TagGroupContainer>
      {availableValues.map((v, i) => (
        <TagButton
          key={v}
          value={v}
          onChange={handleOnChange}
          selected={selectedValues.indexOf(v) >= 0}
          color={active ? "primary" : "standard"}
          disableRipple
        >
          {displayValues[i]}
        </TagButton>
      ))}
    </TagGroupContainer>
  );
};

interface MultigroupFilterProps extends FilterBaseProps {
  selectedValues: number[];
  groupedAvailableValues: number[][];
  groupedDisplayValues: ReactNode[][];
  title: ReactNode;
}

const MultigroupFilter: FC<MultigroupFilterProps> = (
  { selectedValues, groupedAvailableValues, groupedDisplayValues, onChange, active, onToggle, title },
) => {
  useEffect(() => {
    if (selectedValues.length === 0) {
      onToggle?.(false);
    }
  }, [selectedValues, onToggle]);

  return (
    <FilterWrapper>
      <TitleWrapper>
        <Radio
          size="small"
          checked={active}
          onClick={() => onToggle?.(selectedValues.length > 0 && !active)}
          disableRipple
        />
        <Typography variant="h6" component="div" sx={{ mr: 3 }}>{title}</Typography>
        <Tooltip title="清除">
          <IconButton onClick={() => onChange?.([])}>
            <ResetIcon />
          </IconButton>
        </Tooltip>
      </TitleWrapper>
      {groupedAvailableValues.map((availableValues, i) => (
        <TagGroup
          key={i}
          selectedValues={selectedValues}
          availableValues={availableValues}
          displayValues={groupedDisplayValues[i]}
          onChange={onChange}
          active={active}
          onToggle={onToggle}
        />
      ))}
    </FilterWrapper>
  );
};

interface FilterProps extends FilterBaseProps {
  selectedValues: number[];
  availableValues: number[];
  displayValues: ReactNode[];
  title: ReactNode;
}

const Filter: FC<FilterProps> = (
  { selectedValues, availableValues, displayValues, onChange, active, onToggle, title },
) => {
  useEffect(() => {
    if (selectedValues.length === 0) {
      onToggle?.(false);
    }
  }, [selectedValues, onToggle]);

  return (
    <MultigroupFilter
      selectedValues={selectedValues}
      groupedAvailableValues={[availableValues]}
      groupedDisplayValues={[displayValues]}
      onChange={onChange}
      active={active}
      onToggle={onToggle}
      title={title}
    />
  );
};

interface WrappedFilterProps extends FilterBaseProps {
  value: number[];
}

export const StarFilter: FC<WrappedFilterProps> = ({ value, onChange, active, onToggle }) => (
  <Filter
    selectedValues={value}
    onChange={onChange}
    availableValues={[1, 2, 3]}
    displayValues={["1 ★", "2 ★", "3 ★"]}
    active={active}
    onToggle={onToggle}
    title="顯示指定星數"
  />
);

export const SeriesFilter: FC<WrappedFilterProps> = ({ value, onChange, active, onToggle }) => {
  const { series } = useChrononInfo();
  return (
    <Filter
      selectedValues={value}
      onChange={onChange}
      availableValues={series.map(s => s.id)}
      displayValues={series.map(s => s.name)}
      active={active}
      onToggle={onToggle}
      title="顯示指定系列"
    />
  );
};

export const AbilityCategoryFilter: FC<WrappedFilterProps> = ({ value, onChange, active, onToggle }) => (
  <MultigroupFilter
    selectedValues={value}
    onChange={onChange}
    groupedAvailableValues={groupedSkillFilterIds}
    groupedDisplayValues={groupedSkillFilterNames}
    active={active}
    onToggle={onToggle}
    title="篩選特殊能力"
  />
);
