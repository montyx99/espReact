import React, { Component } from 'react'
// import style from './config.scss'

class Config extends Component {
    constructor(props){
        super(props)
        this.state = { message: "" }
    }

    componentDidMount() {
        fetch(`/api/test`)
            .then(res => this.message = "OK")
    }

    render() {
        return (
            <div className="Config uk-grid">
                <h1>API Call Test</h1>
                <p>
                {(() => {
                    if("OK" === this.message) {
                        return this.message
                    }
                    return "FALSE"
                })()}
                </p>
            </div>
        )
    }
}

export default Config