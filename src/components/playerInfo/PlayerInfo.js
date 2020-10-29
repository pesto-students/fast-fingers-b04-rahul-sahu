import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlayerInfo.css';

import iconPerson from './../../img/icon-person.png';
import iconGamepad from './../../img/icon-gamepad.png';


class PlayerInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            level : ''
        }
    }

    render(){
        let level = '';
        if(this.props.level < 1.5){
            level = 'EASY';
        }
        else if (this.props.level >= 1.5 && this.props.level < 2){
            level = 'MEDIUM';
        }
        else if (this.props.level <= 2){
            level = 'HARD';
        }
        return (
            <div className="player-info">
                <div className="name-wrapper">
                    <img src={iconPerson} alt='icon-player' className='icon-person'/>
                    <div className="player-info-name"> Player : {this.props.name}</div>
                </div>
                <div className="name-wrapper">
                    <img src={iconGamepad} alt='icon-gamepad' className='icon-person'/>
                    <div className="player-info-name"> Level : {level}</div>
                </div>
            </div>
        );
    }
}

export default PlayerInfo;