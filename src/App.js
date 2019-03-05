import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import InfoDisplay from "./components/InfoDisplay";

export const COMPONENT_STATE = {
    PRINTING: 'PRINTING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            infoDisplayState: null,
            isSubmitted: false
        };
        this.timeout = null;
    }

    onHandleChange = (event) => {
        let val = event.target.value;
        this.setState({
            inputValue: val,
            infoDisplayState: COMPONENT_STATE.PRINTING,
        }, () => {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(() => {
                this.onCheck()
            }, 500)
        });
    };

    onCheck() {
        let value = this.state.inputValue.toUpperCase();
        if( value === "HELLO" || value === "HI") {
            this.setState({ infoDisplayState: COMPONENT_STATE.SUCCESS })
        } else {
            this.setState({ infoDisplayState: COMPONENT_STATE.ERROR })
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        if(this.state.infoDisplayState === COMPONENT_STATE.SUCCESS) {
            this.setState({isSubmitted: true})
        }
    };

    resetSubmit =() => this.setState({isSubmitted: false});

    render() {
    console.log(this.state.isSubmitted);
    return (
      <div className="App">
        { !this.state.isSubmitted ?
            <form onSubmit={this.onSubmit}>
                <div className='d-flex flex-row input-display'>
                    <input type="text"
                           placeholder='Enter here'
                           onChange={ this.onHandleChange }
                           className="form-control form-control-app"
                           value={this.state.inputValue}/>
                    <button className="btn btn-success">Submit</button>
                </div>
                <TransitionGroup>
                    { this.state.infoDisplayState ?
                        <CSSTransition classNames='example'>
                            <InfoDisplay state={ this.state.infoDisplayState }/>
                        </CSSTransition>
                         : null
                    }
                </TransitionGroup>
            </form>
            :
            <button onClick={this.resetSubmit} className="btn btn-dark">Back</button>
        }
      </div>
    );
    }
}

export default App;
