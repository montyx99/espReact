import React from 'react'
import './home.scss'
import { HashLink } from 'react-router-hash-link'

function Home() {
    return (
    <div>
        <div className="Home uk-cover-container uk-position-relative" uk-height-viewport="true">
            <div className="uk-overlay uk-position-center  uk-text-center">
                <h1>Welcome!</h1>
                <p>I'm your new ESP8266 pal. I'm so happy to help you with the React implementation. 
                    Also using Skeleton CSS boilerplate to look as awesome as you can see now.<br />
                    Happy coding!
                </p>
                <HashLink to="#wifi" className="uk-button uk-button-large inverse default">Get started!</HashLink>
            </div>
        </div>
        <div className="uk-grid">
            <form className="uk-form uk-align-center uk-margin-xlarge-top">
                <h2 id="wifi">WiFi Settings</h2>
                <fieldset className="uk-fieldset uk-padding">
                    <div className="uk-margin">
                        <label htmlFor="ssid">SSID</label>
                        <input className="uk-input" type="text" id="ssid" placeholder="Your WiFi ID"></input>
                    </div>
                    <div className="uk-margin">
                        <label htmlFor="password">Password</label>
                        <input className="uk-input" type="password" id="password" placeholder="Your WiFi Passoword"></input>
                    </div>
                    <div className="uk-margin">
                        <button className="uk-button uk-button-primary">Save</button>
                        <button className="uk-button button-cancel uk-align-right">Cancel</button>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
)}

export default Home