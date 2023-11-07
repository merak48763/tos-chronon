import { useChrononInfo } from "./data/chrononInfo";
import { CardList } from "./components/cardList";
import { LoadingDialog } from "./components/loadingDialog";
import styled from "@emotion/styled";

const AppWrapper = styled.div`
  padding: 16px;
  padding-bottom: 120px;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

function App() {
  const {ready} = useChrononInfo();

  return (
    <AppWrapper>
      {ready && <CardList />}
      <LoadingDialog open={!ready} />
    </AppWrapper>
  );
}

export default App;
