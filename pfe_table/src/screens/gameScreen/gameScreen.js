import React, { Component } from 'react';
import {Col, Row, Modal} from "react-bootstrap";

import PlayerZone from "../../components/playerZone/playerZone";
import './gameScreen.css';

class GameScreen extends Component {

    state={
        currentAction: null
    }
    getPlayerOn = this.getPlayerOn.bind(this);
    sleep = this.sleep.bind(this);

    async componentWillReceiveProps(nextProps) {
        if(nextProps.latestActions) {
            for (let action of nextProps.latestActions) {
                this.setState({currentAction: action});
                await this.sleep(3000);
            }
            this.setState({currentAction: null});
            this.props.socket.emit('readyTurn');
        }
    }

    render() {
        return (
            <div className='gameScreen'>
                <div className='territoryBackground'>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory territory1 upsideDown'>
                            <PlayerZone
                                position={1}
                                player={this.getPlayerOn(1)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                        <Col md={6} className='territory territory2 upsideDown'>
                            <PlayerZone
                                position={2}
                                player={this.getPlayerOn(2)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                    </Row>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory territory3'>
                            <PlayerZone
                                position={3}
                                player={this.getPlayerOn(3)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                        <Col md={6} className='territory territory4'>
                            <PlayerZone
                                position={4}
                                player={this.getPlayerOn(4)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                    </Row>
                </div>
                { this.state.currentAction ?
                    <div>
                        <Modal.Dialog className='actionModal'>
                            <h1 className='actionText upsideDown'>{`${this.state.currentAction.player} a ${this.getActionLabel(this.state.currentAction.action)}`}</h1>
                            <div>
                                <img src={this.getActionImage(this.state.currentAction.action, this.state.currentAction.cardId)}/>
                            </div>
                            <h1 className='actionText'>{`${this.state.currentAction.player} a ${this.getActionLabel(this.state.currentAction.action)}`}</h1>
                        </Modal.Dialog>
                    </div>
                    : null
                }
            </div>
        );
    }

    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    getPlayerOn(position){
        for(let player of this.props.players){
            if(player.position === position)
                return player;
        }
        return null;
    }

    getActionLabel(action){
        switch (action) {
            case 'building':
                return 'construit';
            case 'wonderStep':
                return 'amélioré sa merveille';
            case 'discarding':
                return 'vendu une carte';
            default:
                return "utilisé une technique secrète qui n'est pas sensé exister";
        }
    }

    getActionImage(action, cardId){
        if(action === 'building')
            return require(`../../assets/cards/${this.state.currentAction.cardId}.jpg`);
        else{
            const age = cardId.charAt(1);
            return require(`../../assets/cards/back${age}.jpg`);
        }
    }
}

export default GameScreen;