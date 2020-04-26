import React from "react";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';


type GreetingsProps = {
  name: string;
  mark: string;
};




function Greetings({ name, mark }: GreetingsProps) {
  return (


    <div>
      <AppBar position="static">
        {/* <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
    </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar> */}
      </AppBar>
      <div>

        <Button variant="contained" color="primary">
          click me
      </Button>

        <div>
          {name} {mark}
        </div>
      </div>
    </div>
  );
}

Greetings.defaultProps = {
  mark: "!"
};

export default Greetings;