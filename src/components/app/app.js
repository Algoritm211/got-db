import React from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../services/gotService";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./app.css";
import HousesItem from "../pages/housesItem";
import CharacterPage from "../pages/characterPage";
import { CharacterItem, HousesPage } from "../pages";

class App extends React.Component {
  gotService = new GotService();

  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <BrowserRouter>
        <div className="app">
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>
                <RandomChar />
              </Col>
            </Row>
            <Switch>
              <Route
                path="/"
                exact
                component={() => {
                  return <h3 className="welcome-message">Welcome to GOT DB</h3>;
                }}
              />
              <Route path="/characters/" exact component={CharacterPage} />
              <Route path="/books/" component={CharacterPage} />
              <Route path="/houses/" exact component={HousesPage} />
              <Route
                path="/houses/:id/"
                component={({ match }) => {
                  const { id } = match.params;
                  return <HousesItem houseId={id} />;
                }}
              />
              <Route
                path="/characters/:id/"
                component={({ match }) => {
                  const { id } = match.params;
                  return <CharacterItem charId={id} />;
                }}
              />
              <Redirect to={'/'} />
              {/* <BooksPage /> */}
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
