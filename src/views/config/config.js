import React, { Component } from 'react'
// import style from './config.scss'

class Config extends Component {
    constructor(props){
        super(props)
        this.state = { message: "" }
    }

    componentDidMount() {
        fetch(`/api/test`)
            .then((res) => {
                this.setState({message: "OK"})
            }
        )
    }

    render() {
        return (
            <div className="Config uk-grid">
                <h1>API Call Test</h1>
                <p>
                    API: { "OK" === this.state.message ? this.state.message : 'Loading...' }
                </p>
            </div>
        )
    }
}

export default Config