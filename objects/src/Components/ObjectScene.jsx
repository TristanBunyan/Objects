// @flow
import * as React from "react";
import {ConstructorPillar} from "./ConstructorPillar";
import {MethodPillar} from "./MethodPillar";
import {Square } from "../Classes/Square";
import {Scene, SceneProps} from "./Scene";
import {Scene1AvatarContainer} from "./Scene1AvatarContainer";
import {GroundFooter} from "./GroundFooter"
import { Game } from "./Game";

export class ObjectSceneProps {
    index: number;
    parentScene: Scene;
    game: Game;
    exitSceneCallback: () => void;
    complete: boolean;
    onClick: (sceneID: string) => void;
    activeScene: Scene;
}
type State = {
	complete: boolean,
	square?: Square,
}


export class ObjectScene extends Scene{
    props: ObjectSceneProps;

    static defaultProps = {
        complete: false,
        active: false,
    }

    getClassName(): string {
        console.log("in get classname default obj secne");
        const p1 =  this.isActive()? "scene active " : "scene  ";
        return p1 + " S0" + this.props.index;

    }

    isActive(): boolean{
        return this.props.activeScene === this.getSceneID();
    }

    getPillar(){
        
        let pillar;
        if (!this.state.complete){
            pillar = <ConstructorPillar 
                        game={this.props.game} 
                        bottom={100}
			            onComplete={() => this.onComplete()}
			/>
		} else {
            pillar = <MethodPillar
                        parameters={["number"]}
                        bottom={100}
                        game={this.props.game}
						onComplete={(size) => this.setState({square: new Square(size)})}
						/>
        }
        return pillar;
    }

    getSceneID(): string{
        console.error("using default getSceneID() in ObjectScene")
        return "ObjectScene"
    }

    getAvatarContainer(){
        return <Scene1AvatarContainer  square={this.state.square} />
    }

    getFooter(){
        return ( <GroundFooter 
					onReturn={() => this.props.exitSceneCallback()} 
					enabled={this.state.complete} 
					flash={this.state.complete} 
					active ={this.isActive()} />  	);
    }

    render(){
		let pillar = this.getPillar();
        let className= this.getClassName();
        let avContainer = this.getAvatarContainer();
        let footer = this.getFooter();
		
		return (
			<div  className={className} onClick={() => this.props.onClick(this.getSceneID())}>
					{pillar}
                    {avContainer}
                    {footer}
                    

                  </div> 
                  
			);
    }
    
    onComplete(){
        console.error("Default onComplete used for object scene. ")
    }    








} 