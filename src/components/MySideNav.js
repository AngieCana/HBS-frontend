import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SmartToyIcon from '@mui/icons-material/SmartToy';


// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useNavigate } from "react-router";

function MySideNav() {
  const sideBar = {
    height: '80%',
    width: '5%',
    backgroundColor: 'mediumblue',
    marginTop: '10vh',   
  }
  const navigate = useNavigate();
   // Function to calculate and set the SideNav height based on content
  
  return (
    <div className="sidebar">
    <SideNav
    style={sideBar}
      onSelect={(selected) => {
        console.log(selected);
        if(selected === 'home'){
          navigate('/')
        } else if(selected === 'cart'){
          navigate('/cart')
        } else if(selected === 'login'){
          navigate('/signin')
        } else if(selected === 'about'){
          navigate('/about');
        }
      }}
    
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon>
            <b><HomeIcon style={{ fontSize: 20 }} /></b>
          </NavIcon>
          <NavText><b>Home</b></NavText>
        </NavItem>
        <NavItem eventKey="cart">
          <NavIcon>
            <ShoppingCartIcon style={{ fontSize: 20 }} />
          </NavIcon>
          <NavText><b>Cart</b></NavText>
        </NavItem>
        <hr/>
        <h6>In Progress</h6>
        <NavItem eventKey="login">
          <NavIcon>
            <LoginIcon style={{ fontSize: 20 }} />
          </NavIcon>
          <NavText><b>Sign In</b></NavText>
        </NavItem>
        <NavItem eventKey="about">
          <NavIcon>
            <HelpOutlineIcon style={{ fontSize: 20 }} />
          </NavIcon>
          <NavText><b>About</b></NavText>
        </NavItem>
        <NavItem eventKey="cards">
          <NavIcon>
            <SmartToyIcon style={{ fontSize: 20 }} />
          </NavIcon>
          <NavText><b>Cards</b></NavText>
            <NavItem eventKey="card-supplies">
              <NavText>Card Supplies</NavText>
            </NavItem>
            <NavItem eventKey="trading-cards">
              <NavText>Trading Cards</NavText>
            </NavItem>
        </NavItem>
        
      </SideNav.Nav>
      
    </SideNav>
    </div>
  );
}


export default MySideNav;
