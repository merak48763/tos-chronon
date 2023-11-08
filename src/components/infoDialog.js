import { useState, useEffect, useMemo } from "react";
import {
    Button,
    IconButton,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Chip,
    Tooltip,
    Typography
} from "@mui/material";
import {
  ImageOutlined as ImageIcon,
  FormatListBulletedOutlined as ListIcon
} from "@mui/icons-material";
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

const ArtworkImg = styled.img`
  width: 100%;
`;

const InfoDialog = ({open, onClose, chrononId}) => {
  const [level, setLevel] = useState(1);
  const [showingArtwork, setShowingArtwork] = useState(true);
  const {getCardById, getSeriesNameById} = useChrononInfo();
  const displayingCard = useMemo(() => getCardById(chrononId), [chrononId, getCardById]);

  useEffect(() => {
    if(level > displayingCard.maxLevel) {
      setLevel(displayingCard.maxLevel);
    }
  }, [displayingCard, level]);

  useEffect(() => {
    if(open) {
      setShowingArtwork(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="p">{displayingCard.name}</Typography>
        <Typography variant="caption" component="p">{displayingCard.nameEn}</Typography>
        <Tooltip title={showingArtwork ? "顯示資料" : "顯示卡圖"}>
          <IconButton sx={{my: 1, position: "absolute", right: 12, top: 6}} color="secondary" onClick={() => setShowingArtwork(!showingArtwork)}>
            {showingArtwork ? <ListIcon /> : <ImageIcon />}
          </IconButton>
        </Tooltip>
      </DialogTitle>
      {showingArtwork ? (
        <DialogContent sx={{p: 0}} dividers>
          <ArtworkImg src={`https://merak48763.github.io/tool_data/image/chronon/full/${displayingCard.series}_${displayingCard.scid}.png`} alt="" />
        </DialogContent>
      ) : (
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
      )}
      <DialogActions>
        {!showingArtwork && (
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
        )}
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>
    </Dialog>
  );
}

export { InfoDialog };
