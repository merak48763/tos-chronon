import { useState } from "react";
import { useChrononInfo } from "./data/chrononInfo";
import { InfoDialog } from "./components/infoDialog";

function App() {
  const {ready} = useChrononInfo();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (<>
    {ready && <InfoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} chrononId={10} />}
    {ready ? <div><button onClick={() => setDialogOpen(true)}>Open Dialog</button></div> : <div>Loading...</div>}
  </>);
}

export default App;
