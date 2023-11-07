import { useState, useEffect, useMemo } from "react";
import {
    Button,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Chip,
    Typography
} from "@mui/material";
import styled from "@emotion/styled";
import { useChrononInfo } from "../data/chrononInfo";
import { instantSkillDesc, statusSkillDesc, triggeredSkillDesc } from "../data/translation";

const ChipDivider = ({label}) => (
  <Divider textAlign="left" sx={{mt: 1.2, mb: 0.8, fontWeight: 600, "&::before": {flex: "0 0 8px"}, "&>.MuiDivider-wrapper": {px: 0.3}}}>
    <Chip variant="outlined" color="primary" label={label} />
  </Divider>
);

const SkillList = styled.ul`
  margin: 0;
  padding-left: 20px;
  list-style-type: square;
`;

const LinkButton = props => (
  <Button size="small" color="secondary" variant="outlined" component="a" target="_blank" {...props} />
);

const InfoDialog = ({open, onClose, chrononId}) => {
  const [level, setLevel] = useState(1);
  const {getCardById, getSeriesNameById} = useChrononInfo();
  const displayingCard = useMemo(() => getCardById(chrononId), [chrononId, getCardById]);

  useEffect(() => {
    if(level > displayingCard.maxLevel) {
      setLevel(displayingCard.maxLevel);
    }
  }, [displayingCard, level]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="p">{displayingCard.name}</Typography>
        <Typography variant="caption" component="p">{displayingCard.nameEn}</Typography>
        <LinkButton sx={{my: 1, position: "absolute", right: 16, top: 12}} href={`https://merak48763.github.io/tool_data/image/chronon/full/${displayingCard.series}_${displayingCard.scid}.png`}>觀看卡圖</LinkButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>系列：{getSeriesNameById(displayingCard.series)}</Typography>
        <Typography>星數：{displayingCard.star} ★</Typography>
        <ChipDivider label="數值資料" />
        <Typography>進場FP：{displayingCard.initFp[level-1]}</Typography>
        <Typography>FP上限：{displayingCard.maxFp[level-1]}</Typography>
        <Typography>每次消除：+{displayingCard.fpCharge[level-1]} FP</Typography>
        <ChipDivider label="即時效果" />
        <SkillList>
          {displayingCard.instantSkill[level-1].map(s => (
            <li key={s.skill}>
              <Typography>{instantSkillDesc(s.skill, s.args)}</Typography>
            </li>
          ))}
        </SkillList>
        <ChipDivider label="回合效果" />
        <Typography sx={{mb: 0.5, ml: "auto"}}>消耗FP：{displayingCard.fpConsume}</Typography>
        <SkillList>
          {displayingCard.statusSkill[level-1].map(s => (
            <li key={s.skill}>
              <Typography>{statusSkillDesc(s.skill, s.args)}</Typography>
            </li>
          ))}
        </SkillList>
        <ChipDivider label="連動技能" />
        {displayingCard.triggeredSkill[level-1].map(s => (
          <Typography key={s.skill}>{triggeredSkillDesc(s.skill, s.args)}</Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Select size="small" sx={{mr: "auto", width: "100%", maxWidth: 100}} MenuProps={{
          anchorOrigin: {
            vertical: "top",
            horizontal: "left"
          },
          transformOrigin: {
            vertical: "bottom",
            horizontal: "left"
          }
        }} value={level} onChange={e => setLevel(e.target.value)}>
          {[1, 2, 3, 4, 5].map(lv => (
            <MenuItem key={lv} value={lv}>Lv. {lv}</MenuItem>
          ))}
        </Select>
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>
    </Dialog>
  );
}

export { InfoDialog };