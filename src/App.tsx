import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png';

const App = () => {
  return (
    <div>
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
              <img src={logoImage} width="200" alt=""></img>
          </C.LogoLink>
          <C.InfoArea>
            ...
          </C.InfoArea>
          <button>Reiniciar</button>
        </C.Info>
        <C.GridArea>
            ....
        </C.GridArea>
      </C.Container>
    </div>
  )
}

export default App;