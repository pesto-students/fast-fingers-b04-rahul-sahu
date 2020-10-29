import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './wordGame.css';
import PlayerInfo from  './../playerInfo/PlayerInfo';
import DisplayScore from './../displayScore/displayScore';
import dict from './../../dictionary.json';
import { Row, Col } from 'react-bootstrap';
import ScoreBoard from './../scoreBoard/scoreBoard';

class WordGame extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            name : '',
            level : 1,
            inputWord : '',
            gameWord : '',
            timeLeftString : '04:00',
            timeLeft : 400,
            score : 0,
            scoreList : [],
            gameWordPage : false,
            gameOverPage : true,
        };
    }

    componentDidMount(){
        this.setState({
            name : this.props.name,
            level : this.props.level,
        });
        this.getGameWord();
        this.refreshTimer();
    }

    componentDidUpdate(){
        if(this.state.inputWord === this.state.gameWord){
          this.setState({
            inputWord : '',
            level : (this.state.level + 0.01),
            score : this.state.score + this.state.timeLeft,
            timeLeft : 400,
          });
          this.getGameWord();
        }
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

    refreshTimer(){
        const timer = setInterval(() => {
            this.setState({
                timeLeft : this.state.timeLeft - 8
            })
            let timeLeft = this.state.timeLeft;
            let seconds = Math.floor(this.state.timeLeft/100);
            let milliSeconds = this.state.timeLeft % 100;
            if(milliSeconds < 10){
                milliSeconds = `0${milliSeconds}`;
            }
            if(timeLeft <= 0){
                this.setState({
                    timeLeftString : `${seconds}:${milliSeconds}`
                })
                clearInterval(timer);
                this.gameOver();
            }
            this.setState({
                timeLeftString : `${seconds}:${milliSeconds}`
            })
        }, 80)
    }

    gameOver(){
      this.state.scoreList.push(this.state.score);
      this.setState({
        gameWordPage : false,
        gameOverPage : true
      })
    }
    
    restartGame = () => {
      this.setState({
        gameWordPage : true,
        gameOverPage : false,
        timeLeft : 400
      })
      this.refreshTimer();
      this.getGameWord();
    }

    setTimeLimit(){
        let timeLeft = this.state.gameWord.length/this.state.level;
    }
    render(){
        return(
            <div className="game-page">
              <div className="game-page-header">
                <div className="player-info-wrapper">
                  <PlayerInfo
                    name = {this.state.name}
                    level = {this.state.level}
                  />
                </div>
                <div className="score-info-wrapper">
                  <div>Fast Fingers</div>
                  <div>
                    <DisplayScore score = {this.state.score} />
                  </div>
                </div>
              </div>
              <Row>
                <Col className="score-board" sm={2}>
                  <ScoreBoard scoreList = {this.state.scoreList}></ScoreBoard>
                </Col>
                <Col className="game-box" sm={10}>
                  {
                    this.state.gameWordPage &&
                    <div>
                      <div className="game-timer">
                        <div className="base-timer">
                            <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <g className="base-timer__circle">
                                    <circle className="base-timer__path-elapsed" cx={50} cy={50} r={45} />
                                </g>
                            </svg>
                            <span id="base-timer-label" class="base-timer__label">
                                {this.state.timeLeftString}
                            </span>
                        </div>
                      </div>
                      <div className="game-word">
                        {this.state.gameWord}
                      </div>
                      <div className="game-input-wrapper">
                        <input className="game-input-word" type="text" value={this.state.inputWord} onChangeCapture={this.handleInputWord}></input> 
                      </div>
                    </div>
                  }
                  {
                    this.state.gameOverPage && 
                    <div>
                      <h1>Game Over</h1>
                      <div className="over-score-display">You score : {this.state.score}</div>
                      <div onClick={this.restartGame} className="retry">Retry</div>
                      <div className="quit" onClick={this.props.quitGame} >Quit Game</div>
                    </div>
                  }
                </Col>
              </Row>
            </div>
          
        );
    }
}

export default WordGame;