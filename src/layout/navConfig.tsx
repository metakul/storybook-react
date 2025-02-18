import HomeIcon from '@mui/icons-material/Home';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import { Pages } from '../Datatypes/enums';


export const navConfig = [
  {
    text: "Home",
    icon: <HomeIcon />,
    to: "/",
  },
  {
    text: "Staking",
    icon: <UpgradeIcon />,
    to: Pages.Staking,
  },
  {
    text: "Buy & Sell",
    icon: <ShopTwoIcon />,
    to: Pages.Swap,
  },
  
];

export default navConfig;