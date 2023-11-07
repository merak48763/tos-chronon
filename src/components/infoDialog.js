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
import { useChrononInfo } from "../data/chrononInfo";
import { instantSkillDesc, statusSkillDesc, triggeredSkillDesc } from "../data/translation";

const StyledDivider = props => (
  <Divider textAlign="left" sx={{mt: 1.2, mb: 0.6, color:"primary.dark", fontWeight: 600, "&::before": {flex: "0 0 5px"}}} {...props}/>
);

const LinkChip = props => (
  <Chip variant="outlined" sx={{mt: 0.6, cursor: "pointer"}} component="a" target="_blank" {...props} />
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
        {displayingCard.name}
      </DialogTitle>
      <DialogContent dividers>
        <Typography>系列：{getSeriesNameById(displayingCard.series)}</Typography>
        <Typography>星數：{displayingCard.star} ★</Typography>
        <LinkChip href={`https://merak48763.github.io/tool_data/image/chronon/full/${displayingCard.series}_${displayingCard.scid}.png`} label="觀看卡圖" />
        <StyledDivider>FP 資料</StyledDivider>
        <Typography>進場初始值：{displayingCard.initFp[level-1]}</Typography>
        <Typography>上限：{displayingCard.maxFp[level-1]}</Typography>
        <Typography>每次消除填充量：{displayingCard.fpCharge[level-1]}</Typography>
        <StyledDivider>即時效果</StyledDivider>
        {displayingCard.instantSkill[level-1].map(s => (
          <Typography key={s.skill}>{instantSkillDesc(s.skill, s.args)}</Typography>
        ))}
        <StyledDivider>回合效果</StyledDivider>
        <Typography sx={{mb: 0.5}}>消耗FP：{displayingCard.fpConsume}</Typography>
        {displayingCard.statusSkill[level-1].map(s => (
          <Typography key={s.skill}>{statusSkillDesc(s.skill, s.args)}</Typography>
        ))}
        <StyledDivider>連動技能</StyledDivider>
        {displayingCard.triggeredSkill[level-1].map(s => (
          <Typography key={s.skill}>{triggeredSkillDesc(s.skill, s.args)}</Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Select size="small" sx={{mr: "auto", width: "100%", maxWidth: 100}} value={level} onChange={e => setLevel(e.target.value)}>
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
