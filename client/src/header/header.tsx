import React, { useEffect } from "react"
import clsx from "clsx"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText, Badge, Button, IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"
import NotificationsIcon from "@material-ui/icons/Notifications"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MoreIcon from "@material-ui/icons/MoreVert"
import { Link } from "react-router-dom"
import SearchIcon from "@material-ui/icons/Search"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import useReactRouter from "use-react-router"
import { useMutation } from "@apollo/react-hooks"
import Box from "@material-ui/core/Box"
import Popover from "@material-ui/core/Popover"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import gql from "./../graphql/query"
import { useRecoilState } from "recoil"
import { UserState } from "../atoms"
import { useQuery } from "@apollo/react-hooks"
import { useStyles } from "./style"
import { Search } from "./components/Search"
import "./../App.css"
import "./../index.css"

const mobileMenuId = "primary-search-account-menu-mobile"

const menuId = "primary-search-account-menu"

export default function Header() {
  const classes = useStyles()
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
  const { history, location, match } = useReactRouter()
  const [user, setUser] = useRecoilState(UserState)
  const [logout, { data }] = useMutation(gql.LOGOUT)
  const { data: userData } = useQuery(gql.ME)
  // const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (data?.logout) {
      localStorage.removeItem("token")
      setUser(null)
      alert("로그아웃에 성공했습니다")
    } else if (data?.logout === null) alert("로그아웃에 실패했습니다")
  }, [data, setUser])

  useEffect(() => {
    if (userData?.me) {
      setUser(userData.me)
    }
  }, [userData])

  const theme = createMuiTheme({
    palette: {
      primary: {
        // light: "#660000",
        // main: "#660000",
        // dark: "#660000",
        // contrastText: "#ffffff",
        light: "#ffffff",
        main: "#424242",
        dark: "#ffffff",
        contrastText: "#ffffff",
      },
      secondary: {
        light: "#ffffff",
        main: "#10234f",
        dark: "#1f1311",
        contrastText: "#eecf8f",
      },
    },
    typography: {
      fontFamily: "Noto Sans KR !important",
    },
  })
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              <Link className={classes.link} to="/">
                MOVOTE
              </Link>
            </Typography>

            <div style={{ marginRight: "430px", marginLeft: "30px" }}>
              <Button style={{ color: "white" }}>영화 대 영화</Button>
              <Button style={{ color: "white" }}>통계 보기</Button>
              <Button style={{ color: "white" }}>게시판</Button>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Search />

              {/* <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              /> */}
            </div>
            <div className={classes.grow} />

            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              {localStorage?.token ? (
                <>
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div>
                        <IconButton
                          edge="end"
                          aria-label="account of current user"
                          aria-controls={menuId}
                          aria-haspopup="true"
                          color="inherit"
                          {...bindTrigger(popupState)}
                          // onClick={handleProfileMenuOpen}
                        >
                          <AccountCircle />
                        </IconButton>
                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          <Box p={1}>
                            <Button>마이페이지</Button>
                          </Box>
                          <Box p={1}>
                            <Button
                              onClick={() => {
                                logout()
                              }}
                              color="primary"
                            >
                              로그아웃{" "}
                            </Button>
                          </Box>
                        </Popover>
                      </div>
                    )}
                  </PopupState>
                </>
              ) : (
                <Button
                  variant="outlined"
                  color="inherit"
                  className={classes.link}
                  onClick={() => {
                    history.push("/login")
                  }}
                >
                  로그인하기
                </Button>
              )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
          {/* <div style={{ marginLeft: "200px" }}>
            <Button style={{ color: "white" }}>영화 대 영화</Button>
            <Button style={{ color: "white" }}>통계 보기</Button>
            <Button style={{ color: "white" }}>게시판</Button>
          </div> */}
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
          </div>
          <Divider />
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </MuiThemeProvider>
    </div>
  )
}
