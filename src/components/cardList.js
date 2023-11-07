import { useState } from "react";
import { CardItem } from "./cardItem";
import { InfoDialog } from "./infoDialog";
import { useChrononInfo } from "../data/chrononInfo";
import styled from "@emotion/styled";

const CardListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const CardList = ({filteredCards}) => {
  const {ready} = useChrononInfo();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [displayingId, setDisplayingId] = useState(1);

  return ready && (<>
    <CardListContainer>
      {filteredCards.map(c => (
        <CardItem key={c.id} id={c.id} sid={c.series} scid={c.scid} onClick={() => {
          setDisplayingId(c.id);
          setIsDialogOpen(true);
        }} />
      ))}
    </CardListContainer>
    <InfoDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} chrononId={displayingId} />
  </>);
}

export { CardList };
