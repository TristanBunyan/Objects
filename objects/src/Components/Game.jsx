/* @flow ********************************************************************************************************
TODO:


**********************************************************************************************************/

import * as React from "react";
import $ from 'jquery'; 
import _ from "underscore";
// import { Inventory } from "../Classes/Inventory";
import {Viewport} from "./Viewport";
import { InventoryBar } from "./InventoryBar";
import { Variable } from "./Variable";
import { IVariableDefinition } from "../Interfaces/IVariableDefinition";
import { VariableType } from "../Interfaces/VariableTypes";

type Props = {

};

type State = {
    inventory: IVariableDefinition[]
};


export class Game extends React.Component<Props, State>{
    props: Props;
    state: State;
    static varID = 0;
    constructor(props: Props){
        super(props);
        this.state = {
            inventory: []
        }
    }

    getInventoryItems(): React.Element<any>[]{
        var elements = [];
        for (var i=0; i <this.state.inventory.length; i++){
            var def = this.state.inventory[i];

            var element = <Variable
                            key={i} 
                            id={def.id}
                            type={def.type}
                            value={def.value} />
            elements.push(element);
            
            // elements.push()
        }
        return elements;
    }

    render(){

        return (<Viewport game={this}  >
                <InventoryBar inventory={this.state.inventory} >
                        {this.getInventoryItems()}
                </InventoryBar>

            </Viewport>
            
            );
    }

    returnItemToInventory(varDef: IVariableDefinition){
        const newInv = this.state.inventory;
        newInv.push(varDef);
        this.setState({inventory: newInv});
    }

    addItemToInventory(type: VariableType, value: string){
        const newInv = this.state.inventory;
        var item: IVariableDefinition = {
            id: Game.getVariableId(),
            type: type,
            value: value
        };
        newInv.push(item);
        this.setState({inventory: newInv});
    }

    removeItemFromInventory(itemID: number){
        console.log("IN REMOVE ITEM FROM INV");
        console.log(itemID);
        // console.log(this.state.inventory);
        let newInv = this.state.inventory;
        console.log(newInv[0].id);
        console.log(newInv[0].id == itemID);
        console.log(newInv[0].id === itemID);
        // newInv = _.filter(newInv, (i) => i.id !== itemID);
        newInv = _.reject(newInv, (i: IVariableDefinition) => i.id === itemID);
        console.log(newInv);
        this.setState({inventory: newInv});
    }

    getInventory(){
        return this.state.inventory;
    }

    static getVariableId(){
        Game.varID++;
        return Game.varID;
    }
}





