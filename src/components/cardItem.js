import styled from "@emotion/styled";

import frame1 from "../images/frame1.png";
import frame2 from "../images/frame2.png";
import frame3 from "../images/frame3.png";
const frames = new Map([
  [1, frame1],
  [2, frame2],
  [3, frame3]
]);

const cardImageUrl = (sid, scid) => `https://merak48763.github.io/tool_data/image/chronon/${sid}_${scid}.png`;

const frameImageUrl = star => frames.get(star);

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  text-align: center;
  width: 60px;
  margin: 8px 12px;
`;

const CardImage = styled.img`
  cursor: pointer;
  &:first-of-type {
    width: 60px;
    height: 60px;
  }
  &:not(:first-of-type) {
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
  }
`;

const CardLabel = styled.div`
  background-color: rgb(50 50 50);
  color: white;
  font-family: Roboto;
`;

const CardItem = ({id, sid, scid, star, onClick}) => {
  return (
    <CardWrapper>
      <CardImage src={cardImageUrl(sid, scid)} alt="" />
      <CardImage src={frameImageUrl(star)} alt="" onClick={onClick} />
      <CardLabel>{id}</CardLabel>
    </CardWrapper>
  );
}

export { CardItem };
