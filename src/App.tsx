import { Grid, GridItem, Show } from "@chakra-ui/react";
import GameGrid from "./components/GameGrid";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        sm: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area={"nav"}>
        <Navbar />
      </GridItem>

      <Show above="sm">
        <GridItem area={"aside"} bg={"gold"}>
          Aside
        </GridItem>
      </Show>

      <GridItem area={"main"} bg={"dodgerblue"}>
        <GameGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
