import React from "react";
import Button from '@material-ui/core/Button';
type GreetingsProps = {
  name: string;
  mark: string;
};


function Greetings({ name, mark }: GreetingsProps) {
  return (
    <div>

    <Button variant="contained" color="primary">
      click me
    </Button>

    <div>
       {name} {mark}
    </div>
    </div>
  );
}

Greetings.defaultProps = {
  mark: "!"
};

export default Greetings;