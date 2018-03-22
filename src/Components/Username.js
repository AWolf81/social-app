import React from 'react';

export default class Username extends React.Component {

    render() {

        return (
            <div>
                <p>{this.props.match.params.username}</p>
            </div>
        )
    }
}