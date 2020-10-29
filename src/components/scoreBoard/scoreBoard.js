import React from 'react';

class ScoreBoard extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let scoreList = this.props.scoreList;
        let display = [];
        for(let i = 0; i < scoreList.length; i++){
            display.push(<div>Game {i}: {scoreList[i]}</div>);
        }
        return(
            <div>
                {display}
            </div>
        );
    }
}
export default ScoreBoard;