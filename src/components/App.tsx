import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams
} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import MuiContainer from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import OperationEditor from "components/OperationEditor";
import { BL_ROOT_OP_CODE, ID } from "api/operation";

const AppContainer = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiContainer);

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6">Gates Playground</Typography>
        </Toolbar>
      </AppBar>
      <AppContainer>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to={BL_ROOT_OP_CODE} />
            </Route>
            <Route path="/:opCode" component={OpEditorWithRoute} />
          </Switch>
        </Router>
      </AppContainer>
    </>
  );
}

function OpEditorWithRoute() {
  const { opCode: routeId } = useParams<{ opCode: ID }>();
  const id = routeId || BL_ROOT_OP_CODE; //if routeId is empty (i.e. ''), use root;
  return <OperationEditor opId={id} />;
}
