import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import keyboardIcon from './img/keyboard-icon.png';
import dict from './dictionary.json';

import PlayerInfo from  './components/PlayerInfo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name : '',
      level : 1,
      startPage : true,
      gamePage : false,
      inputWord : '',
      gameWord : '',
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
  }

  componentDidUpdate(){
    if(this.state.inputWord === this.state.gameWord){
      this.setState({
        inputWord : '',
        level : (this.state.level + 0.01)
      });
      this.getGameWord();
    }
  }

  handleChangeName(event){
    this.setState({name : event.target.value});
  }

  handleChangeLevel(event){
    let level = parseFloat(event.target.value);
    this.setState({level : level});
  }

  handleInputWord = (event) => {
    this.setState({inputWord : event.target.value});
  }

  getGameWord = () => {
    let dictLength = dict.length;
    let newWord = dict[ Math.floor(Math.random() * dictLength)];
    if (this.state.level < 1.5) {
      do {
        newWord = dict[ Math.floor(Math.random() * dictLength)];
      } while(newWord.length > 4)
    }
    else if (this.state.level >= 1.5 && this.state.level < 2) {
      do {
        newWord = dict[ Math.floor(Math.random() * dictLength)];
      } while(newWord.length < 4 || newWord.length > 8)
    }
    else if (this.state.level >=2) {
      do {
        newWord = dict[ Math.floor(Math.random() * dictLength)];
      } while(newWord.length < 9)
    }
    this.setState({gameWord : newWord});
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
      this.getGameWord();
    }
  }

  render(){
    return (
      <div className="App">
        <Container>
          {
            this.state.startPage &&
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
            <div className="game-page">
              <Row>
                <Col>
                  <PlayerInfo
                    name = {this.state.name}
                    level = {this.state.level}
                  />
                </Col>
                <Col>
                  <div>Fast Fingers</div>
                  <div>Score : 00:30</div>
                </Col>
              </Row>
              <div>
                <div className="score-board">
                  Score Board
                </div>
                <div className="game-box">
                  <div className="game-timer">

                  </div>
                  <div className="game-word">
                    {this.state.gameWord}
                  </div>
                  <div className="game-input-wrapper">
                    <input type="text" value={this.state.inputWord} onChangeCapture={this.handleInputWord}></input> 
                  </div>
                </div>
              </div>
            </div>
          }
          </Container>
      </div>
    );
  }
}

export default App;
