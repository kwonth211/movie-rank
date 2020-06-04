import React, { useEffect, useContext } from "react"
import clsx from "clsx"
import { makeStyles, useTheme, Theme, createStyles, createMuiTheme, MuiThemeProvider, fade } from "@material-ui/core/styles"
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText, Badge, Button, IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"
import NotificationsIcon from "@material-ui/icons/Notifications"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MoreIcon from "@material-ui/icons/MoreVert"
import { Route, Link } from "react-router-dom"
import SearchIcon from "@material-ui/icons/Search"
import InputBase from "@material-ui/core/InputBase"
import UserContext from "./../context/userContext"
import useReactRouter from "use-react-router"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import Box from "@material-ui/core/Box"
import Popover from "@material-ui/core/Popover"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"

const drawerWidth = 240
const mobileMenuId = "primary-search-account-menu-mobile"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    grow: {
      flexGrow: 1,
      color: "primary",
      backgroundColor: "",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    link: {
      margin: theme.spacing(1, 1.5),
      textDecoration: "none",
      color: "white",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      // padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
)
const menuId = "primary-search-account-menu"
const LOGOUT = gql`
  mutation {
    logout
  }
`
export default function Header() {
  const classes = useStyles()
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
  const { history, location, match } = useReactRouter()
  const [logout, { data }] = useMutation(LOGOUT)

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (data?.logout) {
      localStorage.removeItem("token")
      setUser(null)
      alert("로그아웃에 성공했습니다")
    } else if (data?.logout === null) alert("로그아웃에 실패했습니다")
  }, [data, setUser])

  console.log("sdadas>>>", user)
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#660000",
        main: "#660000",
        dark: "#660000",
        contrastText: "#ffffff",
      },
      secondary: {
        light: "#ffffff",
        main: "#10234f",
        dark: "#1f1311",
        contrastText: "#eecf8f",
      },
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
                MainPage
              </Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
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
              {user?.token ? (
                <>
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div>
                        <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit" {...bindTrigger(popupState)}>
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
