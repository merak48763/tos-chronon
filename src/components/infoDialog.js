import { useState, useEffect, useMemo, useRef } from "react";
import {
  Container,
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
  Slider,
  Tooltip,
  Typography
} from "@mui/material";
import {
  ImageOutlined as ImageIcon,
  DescriptionOutlined as ListIcon,
  CalculateOutlined as CalculatorIcon
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { useConfig } from "../config/provider";
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
  const {getCardById, getSeriesNameById} = useChrononInfo();
  const displayingCard = useMemo(() => getCardById(chrononId), [chrononId, getCardById]);

  const levelList = useMemo(() => {
    return [...Array(displayingCard.maxLevel)].map((_, i) => i + 1);
  }, [displayingCard]);

  useEffect(() => {
    if(level > displayingCard.maxLevel) {
      setLevel(displayingCard.maxLevel);
    }
  }, [displayingCard, level]);

  const [showingArtwork, setShowingArtwork] = useState(true);
  useEffect(() => {
    if(open) {
      setShowingArtwork(false);
    }
  }, [open]);

  const {saveData} = useConfig();
  // An in-memory holder to prevent disk caching of current artwork
  const preloadedArtworkRef = useRef(new Image());
  useEffect(() => {
    if(!saveData && open) {
      preloadedArtworkRef.current.src = `https://merak48763.github.io/tool_data/image/chronon/full/${displayingCard.series}_${displayingCard.scid}.png`;
    }
  }, [displayingCard, saveData, open]);

  const [calculatorMode, setCalculatorMode] = useState(false);
  const [levelRange, setCalculatorLevels] = useState([1, 2]);
  useEffect(() => {
    if(levelRange[1] > displayingCard.maxLevel) {
      if(levelRange[0] >= displayingCard.maxLevel) {
        setCalculatorLevels([1, displayingCard.maxLevel]);
      }
      else {
        setCalculatorLevels([levelRange[0], displayingCard.maxLevel]);
      }
    }
  }, [displayingCard, levelRange]);

  const sliderMarks = useMemo(() => {
    return levelList.map(lv => ({
      value: lv,
      label: lv === 1 ? "Lv. 1" : lv === displayingCard.maxLevel ? `Lv. ${lv}` : undefined
    }));
  }, [levelList, displayingCard.maxLevel]);

  const handleSliderChange = (_, newValue, activeThumb) => {
    if(!Array.isArray(newValue)) {
      return;
    }
    if(activeThumb === 0) {
      setCalculatorLevels([Math.min(newValue[0], levelRange[1] - 1), levelRange[1]]);
    }
    else {
      setCalculatorLevels([levelRange[0], Math.max(newValue[1], levelRange[0] + 1)]);
    }
  }

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
          {calculatorMode ? (<>
            <ChipDivider label="設定等級" />
            <Slider size="small" color="secondary" sx={{width: 300, maxWidth: "80%", ml: 2}} marks={sliderMarks} value={levelRange} min={1} max={displayingCard.maxLevel} step={1} onChange={handleSliderChange} valueLabelFormat={value => `Lv. ${value}`} valueLabelDisplay="auto" />
            <ChipDivider label="強化素材" />
            <Typography>琉璃：{displayingCard.exp[levelRange[1]-1] - displayingCard.exp[levelRange[0]-1]} 個</Typography>
            <ChipDivider label="能力變化" />
            <Typography>WIP</Typography>
          </>) : (<>
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
          </>)}
        </DialogContent>
      )}
      <DialogActions>
        {!showingArtwork && (
          <Container sx={{mr: "auto"}} fixed disableGutters>
            <Tooltip placement="top-start" title={calculatorMode ? "顯示一般資料" : "顯示計算機"}>
              <IconButton disabled={process.env.NODE_ENV === "production"} onClick={() => setCalculatorMode(!calculatorMode)}>
                {calculatorMode ? <ListIcon /> : <CalculatorIcon />}
              </IconButton>
            </Tooltip>
            {!calculatorMode && (
              <Select size="small" sx={{width: "100%", maxWidth: 100, ml: 1}} MenuProps={{
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                transformOrigin: {
                  vertical: "bottom",
                  horizontal: "left"
                }
              }} value={level} onChange={e => setLevel(e.target.value)}>
                {levelList.map(lv => (
                  <MenuItem key={lv} value={lv}>Lv. {lv}</MenuItem>
                ))}
              </Select>
            )}
          </Container>
        )}
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>
    </Dialog>
  );
}

export { InfoDialog };
