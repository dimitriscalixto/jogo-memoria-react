import { GridItemType } from '../../types/gridItemType';
import * as C from './styles';
import b7svg from '../../svgs/b7.svg'
import { items } from '../../data/items';
type Props = {
  item:GridItemType;
  onClick: () => void;
}

export const GridItem = ({item,onClick} : Props) => {
  return (
    <C.container onClick={onClick}>
      {!item.permanentShown && !item.shown &&
        <C.Icon src={b7svg}></C.Icon>
      }
      {
        (item.permanentShown || item.shown) && item.item !== null &&
            <C.Icon src={items[item.item].icon}></C.Icon>
      }
    </C.container>
  );
}