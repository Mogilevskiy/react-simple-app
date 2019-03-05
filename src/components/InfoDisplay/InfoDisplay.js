import React, {Component} from 'react';
import { COMPONENT_STATE } from '../../App';

import './InfoDisplay.css';

export default class InfoDisplay extends Component {

    renderInfoBlock() {
        const { state } = this.props;
        switch (state) {
            case COMPONENT_STATE.PRINTING:
                return <div className="alert alert-primary">Printing...</div>;
            case COMPONENT_STATE.SUCCESS:
                return <div className="alert alert-success">Success</div>;
            case COMPONENT_STATE.ERROR:
                return <div className="alert alert-danger">Error</div>;
            default:
                return null;
        }
    }

    render() {
        return(
            <React.Fragment>
                {this.renderInfoBlock()}
            </React.Fragment>
        )
    }
}
