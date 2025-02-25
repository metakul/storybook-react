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
    text: "Stake",
    icon: <UpgradeIcon />,
    to: Pages.Staking,
  },
  {
    text: "Swap",
    icon: <ShopTwoIcon />,
    to: Pages.Swap,
  },
  
];

export default navConfig;