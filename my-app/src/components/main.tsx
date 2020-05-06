import * as React from "react";
import { useState, useRef, useCallback } from "react";
import {
  Button,
  AppBar,
  IconButton,
  Typography,
  Toolbar,
} from "@material-ui/core/";
import { prependOnceListener } from "cluster";
type GreetingsProps = {
  name: string;
  mark: string;
  count: number;
};
interface IGreertingProps {}

function Greetings({ name, mark, count }: GreetingsProps) {
  const [first, setFirst] = useState<number>(Math.random() * 9);
  const [second, setsecond] = useState(Math.random() * 9);
  const [value, setValue] = useState(Math.random() * 9);
  const inputEl = useRef(null);
  // const [value, setValue] = useState(Math.random() * 9)
  // const [value, setValue] = useState(Math.random() * 9)

  const onSubmitForm = (e: React.FormEvent) => {
    // e,preventDefault()
    // const input = inputEl.current
  };
  return (
    <div>
      {name} {mark}
    </div>
  );
}

Greetings.defaultProps = {
  mark: "!",
};

export default Greetings;
