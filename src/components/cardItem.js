import styled from "@emotion/styled";

const cardImageUrl = (sid, scid) => `https://merak48763.github.io/tool_data/image/chronon/${sid}_${scid}.png`;

const CardWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  text-align: center;
  width: 60px;
  margin: 8px 12px;
`;

const CardImage = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
`;

const CardLabel = styled.div`
  background-color: rgb(50 50 50);
  color: white;
  font-family: Roboto;
`;

const CardItem = ({id, sid, scid, onClick}) => {
  return (
    <CardWrapper>
      <CardImage src={cardImageUrl(sid, scid)} alt={`時光牌 #${id}`} onClick={onClick} />
      <CardLabel>{id}</CardLabel>
    </CardWrapper>
  );
}

export { CardItem };
