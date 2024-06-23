import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png';
import RestartIcon from './svgs/restart.svg';
import { InfoItem } from './components/infoItem';
import { Button } from './components/button';
const App = () => {
  const resetAndCreateGrid = () => {

  }
  return (
    <div>
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
              <img src={logoImage} width="200" alt=""></img>
          </C.LogoLink>
          <C.InfoArea>
            <InfoItem label= "Tempo" value="00:00"/>
            <InfoItem label= "Movimentos" value="0"/>
          </C.InfoArea>
          <Button icon={RestartIcon} label='Reiniciar' onClick={resetAndCreateGrid}/>
        </C.Info>
        <C.GridArea>
            ....
        </C.GridArea>
      </C.Container>
    </div>
  )
}

export default App;