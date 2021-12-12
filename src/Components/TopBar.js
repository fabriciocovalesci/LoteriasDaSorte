import * as React from "react";
import { Appbar } from "react-native-paper";

const TopBar = (props) => (
  <Appbar.Header>
    <Appbar.Content title="Minha Aposta" subtitle={props.subtitle} />
  </Appbar.Header>
);

export default TopBar;