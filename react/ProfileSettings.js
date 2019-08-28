import React, { Component } from 'react'
import { Checkbox, Button } from 'vtex.styleguide'
import {FormattedMessage} from "react-intl";

class ProfileSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: '',
            error: null,
        }
    }

    onChange = e => {
        this.setState({ color: e.target.value })
        console.log("Change")
        console.log(this.state)
    }

    validate = () => {
        const { color } = this.state
        this.setState({ error: null })
        if (color !== 'yellow') {
            this.setState({ error: 'Your favorite color must be yellow.' })
            return false
        }
        return true

    }

    submit = () => {
        console.log('Success! Your information is saved.')
    }

    render() {

        const { error, color } = this.state
        return (
            <div className="mb8">
                <Checkbox
                    name="color"
                    label="Cookie Policy accepted"
                    value={color}
                    errorMessage={error}
                    onChange={this.onChange}
                />

                <Button
                    name="Test"
                    text="Test"
                    onClick={this.validate}
                >
                    <FormattedMessage id="userSupport.submit" />
                </Button>
            </div>
        )
    }
}

export default ProfileSettings
