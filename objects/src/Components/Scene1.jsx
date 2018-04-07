// @flow
import React from 'react';
import {ConstructorPillar} from "./ConstructorPillar";
import {MethodPillar} from "./MethodPillar";
import {Square } from "../Classes/Square";
import {Scene, SceneProps} from "./Scene";
import {Scene1AvatarContainer} from "./Scene1AvatarContainer";
import {GroundFooter} from "./GroundFooter"
import { ObjectSceneProps, ObjectScene } from './ObjectScene';
import { IVariableDefinition } from '../Interfaces/IVariableDefinition';


type State = {
	complete: boolean,
	square?: Square,
	clearParamCallbacks: Array<() => void>,
	// acceptParamCall
	acceptParams: Array<() => IVariableDefinition[]>

}

// type Props = {
// 	parent: Scene<any, any>,
// 	active?: boolean,
// 	complete?: boolean
// }
 


export class Scene1 extends ObjectScene {
	props: ObjectSceneProps;
	state: State;
	constructor(props: ObjectSceneProps){
		super(props);
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
        return <Scene1AvatarContainer  square={this.state.square} />
	}
	
	getPillars(){
        
        let pillar;
        if (!this.state.complete){
            pillar = <ConstructorPillar 
            game={this.props.game} 
            bottom={100}
            onComplete={() => this.onComplete()}
			/>
		} else {
            pillar = <MethodPillar
						getClearParamsFunction={(fn: () => void) => this.addClearParamsFunction(0, fn)} // TODO use real index not 1
						getAcceptParamsFuction={(fn: () => any[]) => this.addAcceptParamsFunction(0, fn)}
                        parameters={["number"]}
                        bottom={100}
                        game={this.props.game}
						onComplete={() => this.pillarOnComplete(this.state.acceptParams[0]())}
						/>
        }
        return pillar;
	}
	
	pillarOnComplete(paramValues: IVariableDefinition[]){
		console.log("IN PILLAR ON COMPLETE");
		console.log(paramValues);



		this.setState({square: new Square(paramValues[0].value)})
	}

	onComplete(){
		console.log("in on complete");
		// this.state.acceptParams();
		// this.props.acceptParams();
		this.setState(
			{complete: true,
			 square: new Square(0)
		})	
	}

} 