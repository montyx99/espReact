import React, { Component } from 'react'
import './home.scss'
import { 
    AP_LIST_POPULATION_ERROR,
    AP_LIST_RETRY_ERROR,
    POLL_TIMEOUT,
    getEncryptionType } from './home.constants'

let polls = 0
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            apList: {
                data: null,
                fetched: false,
                requested: false,
            },
            inputs: {
                password: null,
                ssid: null,
            },
            scan: {
                done: false,
                requested: false,
            },
            wifiSetup: {
                fetched: false,
                received: false,
                requested: false,
                status: null,
            },
        }

        this.getStartedButton = React.createRef()

        this.callWifiScan = this.callWifiScan.bind(this)
        this.callWifiList = this.callWifiList.bind(this)
        this.callWifiSetup = this.callWifiSetup.bind(this)
    }

    callWifiScan(event) {
        event.preventDefault()
        console.log("SCAN STARTED!")
        this.setState(prevState => ({
            scan: {
                ...prevState.scan,
                requested: true,
                done: false,
            },
        }))

        fetch(`/api/v1/wifiscan`)
            .then(() => {
                console.log("SCAN OK!")
                this.setState(prevState => ({
                    scan: {
                        ...prevState.scan,
                        requested: true,
                        done: true,
                    },
                }))
                this.callWifiList()
            })
    }

    callWifiList() {
        console.log("LIST STARTED!")
        this.setState(prevState => ({
            apList: {
                ...prevState.apList,
                requested: true,
            },
        }))

        fetch(`/api/v1/wifilist`)
            .then(res => {
                if(res.status == 202 && polls < 10) {
                    ++polls
                    setTimeout(this.callWifiList, POLL_TIMEOUT)
                    throw Error(AP_LIST_RETRY_ERROR + POLL_TIMEOUT)
                }
                else if (res.status == 200) {
                    return res.json()
                }
                else {
                    throw Error(AP_LIST_POPULATION_ERROR)
                }
            })
            .then(json => {
                console.log("LIST OK!")
                this.setState(prevState => ({
                    apList: {
                        ...prevState.apList,
                        fetched: true,
                        data: json,
                    },
                }))
            })
    }

    callWifiSetup(event) {
        event.preventDefault()
        this.setState(prevState => ({
            wifi: {
                ...prevState.wifi,
                fetched: false,
                received: false,
                sent: true,
                status: null,
            }
        }))

        fetch('/api/v1/wifisetup', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "password": this.state.inputs.password,
                "ssid": this.state.inputs.ssid,
            }),
        })
        .then(res => res.text())
        .then(res => {
            this.setState(prevState => ({
                wifi: {
                    ...prevState.wifi,
                    fetched: true,
                    received: true,
                    sent: false,
                    status: res,
                },
            }))
        })
    }

    getApTable() {
        return(
            <table className="uk-table uk-table-striped uk-table-divider uk-table-small uk-table-justify">
                <thead>
                    <th>SSID</th>
                    <th>Signal Quality</th>
                    <th>Secure</th>
                </thead>
                <tbody>
                    {this.state.apList.data.networks.map((item, index) => {
                        const {ssid, rssi, encryption_type} = item
                        return (
                            <tr>
                                <td onClick={() => this.setSsid(item)}><a href="#ssid" data-uk-scroll>{ssid}</a></td>
                                <td>{rssi}%</td>
                                <td>{getEncryptionType(encryption_type)}</td>
                            </tr>
                        )}
                    )}
                </tbody>
            </table>
        )
    }

    getSaveStatus() {
        return(
            <span>{this.state.wifi.status}</span>
        )
    }

    setPassword(e) {
        e.persist()
        let value = e.target.value
        if(e.target.value) {
            this.setState(prevState => ({
                inputs: { ...prevState.inputs,  password: value }
            }))
        }
    }

    setSsid(item) {
        let value
        if(!item.ssid) {
            item.persist()
            value = item.target.value
        }
        else {
            value = item.ssid
        }
        
        if(item.ssid || item.target.value) {
            this.setState(prevState => ({
                inputs: { ...prevState.inputs,  ssid: value }
            }))
        }
    }

    render() {
        return (
            <div>
                <div className="Home uk-cover-container uk-position-relative" uk-height-viewport="true">
                    <div className="uk-overlay uk-position-center uk-text-center">
                        <h1>Welcome!</h1>
                        <p>I'm your new ESP8266 pal. I'm so happy to help you with the React implementation. 
                            Also using Skeleton CSS boilerplate to look as awesome as you can see now.<br />
                            Happy coding!
                        </p>
                        <a href="#wifi" className="uk-button uk-button-large inverse default" data-uk-scroll>Get started!</a>
                    </div>
                </div>
                <div className="uk-grid">
                    <form className="uk-form uk-align-center uk-margin-xlarge-top">
                        <h2 id="wifi">WiFi Settings</h2>
                        <fieldset className="uk-fieldset uk-padding">
                            <button className="uk-button uk-button-primary" onClick={this.callWifiScan}>Scan Access Points <i className="data-uk-icon-spin" style={{display: this.state.apListRequested && this.state.apListFetched ? "none" : ""}}></i></button>
                            <div>
                                {this.state.scan.requested ? this.state.apList.fetched ? this.getApTable() : "Scanning..." : ""}
                            </div>
                            <div id="ssid" className="uk-margin">
                                <label htmlFor="ssid">SSID</label>
                                <input className="uk-input" value={this.state.inputs.ssid} onChange={this.setSsid.bind(this)} type="text" id="ssid" placeholder="Your WiFi ID"></input>
                            </div>
                            <div className="uk-margin">
                                <label htmlFor="password">Password</label><span uk-tooltip="title: At least 6 characters; pos: right">(?)</span>
                                <input className="uk-input" value={this.state.inputs.password} onBlur={this.setPassword.bind(this)} type="password" id="password" placeholder="Your WiFi Password"></input>
                            </div>
                            <div className="uk-margin">
                                <button className="uk-button uk-button-primary" onClick={this.callWifiSetup}>Save</button>
                                <button className="uk-button button-cancel uk-align-right">Cancel</button>
                            </div>
                            <div>
                                {this.state.wifiSetup.requested ? <span>Saving...</span> : this.state.wifiSetup.fetched ? this.getSaveStatus() : ""}
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}

export default Home