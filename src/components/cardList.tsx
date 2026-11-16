import { useState } from "react";
import type { FC } from "react";
import styled from "@emotion/styled";

import { CardItem } from "./cardItem";
import { InfoDialog } from "./infoDialog";
import { useChrononInfo } from "../data/chrononInfo";
import type { ChrononCard } from "../data/chrononInfo";

const CardListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

interface CardListProps {
  filteredCards: ChrononCard[],
}

export const CardList: FC<CardListProps> = ({filteredCards}) => {
  const {ready} = useChrononInfo();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [displayingId, setDisplayingId] = useState(1);

  return ready && (<>
    <CardListContainer>
      {filteredCards.map(c => (
        <CardItem key={c.id} id={c.id} sid={c.series} scid={c.scid} star={c.star} onClick={() => {
          setDisplayingId(c.id);
          setIsDialogOpen(true);
        }} />
      ))}
    </CardListContainer>
    <InfoDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} chrononId={displayingId} />
  </>);
}
