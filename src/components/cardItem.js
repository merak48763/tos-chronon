import styled from "@emotion/styled";

const cardImageUrl = (sid, scid) => `https://merak48763.github.io/tool_data/image/chronon/${sid}_${scid}.png`;

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
      <CardImage src={`https://merak48763.github.io/tool_data/image/chronon/frame/${star}.png`} alt="" onClick={onClick} />
      <CardLabel>{id}</CardLabel>
    </CardWrapper>
  );
}

export { CardItem };
