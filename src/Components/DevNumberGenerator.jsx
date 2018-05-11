/* @flow ********************************************************************************************************
TODO:


**********************************************************************************************************/

import * as React from "react";
import $ from 'jquery'; 
import _ from "underscore";
import { Game } from "./Game";

type Props = {
    game: Game
};

type State = {

};


export class DevNumberGenerator extends React.Component<Props, State>{
    props: Props;
    state: State;
    defaultProps = {

    };
    constructor(props: Props){
        super(props);
        this.state= {

        }
    }
    render(){

        return (
            <div className="dev-number-generator">
            <input id="dev-number-input" type="textbox" >
            </input> 
            <button id="dev-number-button" onClick={() => this.buttonClicked()}>
                Generate
            </button> 

            </div>


        )

    }


    buttonClicked(){
        this.props.game.addItemToInventory("number", $("#dev-number-input").val());
    }


}





