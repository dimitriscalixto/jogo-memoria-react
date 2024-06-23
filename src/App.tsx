import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png';
import RestartIcon from './svgs/restart.svg';
import { InfoItem } from './components/infoItem';
import { Button } from './components/button';
import { useEffect, useState } from 'react';
import { GridItemType } from './types/gridItemType';
import { Item } from './data/items';
const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);
  useEffect(() => resetAndCreateGrid(), []);

  const resetAndCreateGrid = () => {
    // Passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < (Item.length * 2); i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      });
    }

    setGridItems(tmpGrid)

    setPlaying(true);
  }
  return (
    <div>
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
            <img src={logoImage} width="200" alt=""></img>
          </C.LogoLink>
          <C.InfoArea>
            <InfoItem label="Tempo" value="00:00" />
            <InfoItem label="Movimentos" value="0" />
          </C.InfoArea>
          <Button icon={RestartIcon} label='Reiniciar' onClick={resetAndCreateGrid} />
        </C.Info>
        <C.GridArea>
          <C.Grid>

          </C.Grid>
        </C.GridArea>
      </C.Container>
    </div>
  )
}

export default App;