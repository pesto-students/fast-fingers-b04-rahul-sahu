import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import keyboardIcon from './img/keyboard-icon.png';

import WordGame from './components/wordGame/wordGame';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name : '',
      level : 1,
      startPage : true,
      gamePage : false,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
  }

  handleChangeName(event){
    this.setState({name : event.target.value});
  }

  handleChangeLevel(event){
    let level = parseFloat(event.target.value);
    this.setState({level : level});
  }

  startGame = () => {
    if(this.state.name === ''){
      alert("Please enter the name")
    }
    else{
      this.setState({
        startPage : false,
        gamePage : true
      });
    }
}

  render(){
    return (
      <div className="App">
        <Container>
          {
            this.state.startPage &&
            <div className="start-page">
              <div className="keyboard-icon">
                <img src={ keyboardIcon } alt='keyboard-icon' className="icon-awesome-keyboard my-auto" />
              </div>
              <div className="game-header">
                <h1>fast fingers</h1>
              </div>
              <div className="game-sub-header">
                <p>------------- The ultimate typing game -------------</p>
              </div>
              <Form className="input-form">
                <Form.Group controlId="forName">
                  <Form.Control className="name-input" value = {this.state.name} onChange={this.handleChangeName} type="text" placeholder="Enter your name" size="lg"/>
                </Form.Group>
                <Form.Group controlId="forLevel">
                  <Form.Control value = {this.state.level} onChange={this.handleChangeLevel} as="select" size="lg">
                    <option value={1}>Easy</option>
                    <option value={1.5}>Medium</option>
                    <option value={2}>Hard</option>
                  </Form.Control>
                </Form.Group>
              </Form>
              <Button variant="danger" onClick={this.startGame}>Start Game</Button>
            </div>
        
          }
          {
            this.state.gamePage &&
            <WordGame
              name = {this.state.name}
              level = {this.state.level}
            />
            }
          </Container>
      </div>
    );
  }
}

export default App;
