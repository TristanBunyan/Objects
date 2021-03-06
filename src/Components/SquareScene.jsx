// @flow
import React from 'react';
import {ConstructorPillar} from "./ConstructorPillar";
import {MethodPillar} from "./MethodPillar";
import {Square } from "../Classes/Square";
import {Scene, SceneProps} from "./Scene";
import {Scene1AvatarContainer} from "./Scene1AvatarContainer";
import {GroundFooter} from "./GroundFooter"
import { ObjectSceneProps, ObjectScene, ObjectSceneState } from './ObjectScene';
import { IVariableDefinition } from '../Interfaces/IVariableDefinition';


interface SquareState extends ObjectSceneState{
	square?: Square,
}

// type Props = {
// 	parent: Scene<any, any>,
// 	active?: boolean,
// 	complete?: boolean
// }
 


export class SquareScene extends ObjectScene {
	props: ObjectSceneProps;
	state: SquareState;
	constructor(props: ObjectSceneProps){
		super(props);
		// this.state.square;
		// this.state = {
		// 	// complete: false,
		// 	complete: false, // TODO switch back
		// 	square: null 
		// }
	}

	getSceneID(): string{
		return "Scene1";
	}

	getClassName(): string{
		return super.getClassName() + " Square ";
	}

	getAvatarContainer(){
        return <Scene1AvatarContainer wiggle={this.state.square} square={this.state.square} />
	}
	
	getPillars(){
        
        let pillar;
        if (!this.state.isInstantiated){
            pillar = <ConstructorPillar 
            game={this.props.game} 
            bottom={100}
            onComplete={() => this.onInstantiation()}
			/>
		} else {
            pillar = <MethodPillar
						getClearParamsFunction={(fn: () => void) => this.addClearParamsFunction(0, fn)} // TODO use real index not 1
						getAcceptParamsFuction={(fn: () => any[]) => this.addAcceptParamsFunction(0, fn)}
                        parameters={["number"]}
						bottom={100}
						buttonName={"Set Size"}
                        game={this.props.game}
						onComplete={() => this.pillarOnComplete(this.state.acceptParams[0]())}
						/>
        }
        return [pillar];
	}
	
	pillarOnComplete(paramValues: IVariableDefinition[]){
		console.log("IN PILLAR ON COMPLETE");
		console.log(paramValues);



		this.setState({square: new Square(paramValues[0].val)})

		this.props.game.unlockScene(2);

	}

	onInstantiation(){
		console.log("in on complete");
		this.setState(
			{isInstantiated: true,
			 square: new Square(0)
		})	

		this.props.game.unlockScene(1);
	}

} 