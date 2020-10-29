import React from 'react';
import './displayScore.css';

class DisplayScore extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            score : this.props.score,
        }
    }

    render(){
        let minutes = Math.floor(this.props.score/6000);
        let seconds = Math.floor(this.props.score/100)%60;
        if(seconds < 10){ 
            seconds = `0${Math.floor(this.props.score/100)%60}`;
        }
        return(
            <div>
                {`${minutes}:${seconds}`}
            </div>
        );
    }
}

export default DisplayScore;