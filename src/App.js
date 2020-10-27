import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import keyboardIcon from './img/keyboard-icon.png'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name : '',
      level : 'easy',
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
  }

  handleChangeName(event){
    this.setState({name : event.target.value});
  }

  handleChangeLevel(event){
    this.setState({level : event.target.value});
  }
  startGame(){
    console.log("Start Game");
  }

  render(){
    return (
      <div className="App">
        <Container>
          <div className="start-page">
            <Row>
              <img src={ keyboardIcon } alt='keyboard-icon' className="icon-awesome-keyboard my-auto" />
            </Row>
            <Row>
              <h1>fast fingers</h1>
            </Row>
            <Row>
              <p>------------- The ultimate typing game -------------</p>
            </Row>
            <Form>
              <Form.Group controlId="forName">
                <Form.Control value = {this.state.name} onChange={this.handleChangeName} type="text" placeholder="Enter your name" size="lg"/>
              </Form.Group>
              <Form.Group controlId="forLevel">
                <Form.Control value = {this.state.level} onChange={this.handleChangeLevel} as="select" size="lg">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Form.Control>
              </Form.Group>
            </Form>
            <Button variant="danger" onClick={this.startGame}>Start Game</Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
