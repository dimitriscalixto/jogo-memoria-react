import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png';
import RestartIcon from './svgs/restart.svg';
import { InfoItem } from './components/infoItem';
import { Button } from './components/button';
import { useEffect, useState } from 'react';
import { GridItemType } from './types/gridItemType';
import { items } from './data/items';
import { GridItem } from './components/gridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';
const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter(item => item.shown === true);
      if (opened.length === 2) {
        let tmpGrid = [...gridItems];
        if (opened[0].item === opened[1].item) {
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          }, 1000)
        }
        setMoveCount(moveCount => moveCount + 1);
      }
    }
  }, [shownCount, gridItems])
  useEffect(() => resetAndCreateGrid(), []);
  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed])
  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];

      if (tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }

      setGridItems(tmpGrid);
    }
  }
  useEffect(()=>{
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){
      setPlaying(false);
    }
  },[moveCount,gridItems])
  const resetAndCreateGrid = () => {
    // Passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      });
    }
    // 2.2 - preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }

    // 2.3 - jogar no state
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
            <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
            <InfoItem label="Movimentos" value={moveCount.toString()} />
          </C.InfoArea>
          <Button icon={RestartIcon} label='Reiniciar' onClick={resetAndCreateGrid} />
        </C.Info>
        <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index) => (
              <GridItem
                key={index}
                item={item}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </C.Grid>
        </C.GridArea>
      </C.Container>
    </div>
  )
}
export default App;