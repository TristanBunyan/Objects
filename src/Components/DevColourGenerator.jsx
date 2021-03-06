/* @flow ********************************************************************************************************
TODO:


**********************************************************************************************************/

import * as React from "react";
import $ from 'jquery'; 
import _ from "underscore";
import { Game } from "./Game";
import {IColourDefinition} from "../Interfaces/IVariableDefinition"
import { ColourVar } from "../Classes/ColourVar";

type Props = {
    game: Game
};

type State = {

};


export class DevColourGenerator extends React.Component<Props, State>{
    props: Props;
    state: State;
    static defaultProps = {

    };
    constructor(props: Props){
        super(props);
        this.state= {

        }
    }
    render(){

        return (
            <div className="dev-number-generator">
            <h4>Colours</h4>

            R<input id="dev-red-input" type="textbox" defaultValue="5">
            </input>
            <br /> 
            G<input id="dev-blue-input" type="textbox" defaultValue="2">
            </input> 
            <br />
            B<input id="dev-green-input" type="textbox" defaultValue="1">
            </input> 
            <button id="dev-colour-button" onClick={() => this.buttonClicked()}>
                Generate
            </button> 

            </div>


        )

    }


    buttonClicked(){
        // const def: ColourDefinition = {
            const def = new ColourVar(
            $("#dev-red-input").val(),
             $("#dev-blue-input").val(),
             $("#dev-green-input").val())
        // };

        this.props.game.addItemToInventory(def)
    }


}





