import React, {Component} from 'react'
import {Checkbox, Button, Modal} from 'vtex.styleguide'

class CookiesAndTerms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cookies_accepted: false,
            terms_and_conditions_accepted: false,
            error: null,
            isModalCookiesOpen: false,
            isModalTermsOpen: false,
            settingsId: null
        }
    }

    componentDidMount() {
        var obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json',
                'x-vtex-api-appKey': 'vtexappkey-sngular-YNKUVG',
                'x-vtex-api-appToken': 'ZQIVDATJIDXHUBUGEOQWKQYOWURJWDYIGFLWLRTADEINJQJNQYLHOCGISUYIIKMEEPAOQYUMUPSFHLEGLESYRRTDZCDQTLRTSEITPVWSDZMYKBBGPSXERNNMVWONUDTJ'
            }
        };

        fetch('https://api.vtex.com/sngular/dataentities/test/search?_fields=_all', obj)
            .then(res => res.json())
            .then((result) => {
                // TODO: filter with api parameter, not filter result elements
                    let found = result.find(function (element) {
                        return element.email === 'manuel.garcia@sngular.com';
                    });

                    if (found) {
                        this.setState({
                            cookies_accepted: found.cookies_accepted,
                            terms_and_conditions_accepted: found.privacy_accepted,
                            settingsId: found.id
                        });
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    handleCookiesModalToggle = () => {
        this.setState(prevState => ({isModalCookiesOpen: !prevState.isModalCookiesOpen}))
    }

    handleTermsModalToggle = () => {
        this.setState(prevState => ({isModalTermsOpen: !prevState.isModalTermsOpen}))
    }

    handleCookiesChange = e => {
        this.setState(prevState => ({cookies_accepted: !prevState.cookies_accepted}))
    }

    handleTermsChange = e => {
        this.setState(prevState => ({terms_and_conditions_accepted: !prevState.terms_and_conditions_accepted}))
    }

    validate = () => {
        const {cookies_accepted, terms_and_conditions_accepted} = this.state
        this.setState({error: null})

        if (typeof cookies_accepted !== 'boolean' || typeof terms_and_conditions_accepted !== 'boolean') {
            this.setState({error: 'The cookie privacy and terms and conditions must be a boolean value'})

            return false
        }

        this.submit()
    }

    submit = () => {
        const { settingsId, cookies_accepted, terms_and_conditions_accepted } = this.state

        console.log('Success! Your information is saved.')

        var obj = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json',
                'x-vtex-api-appKey': 'vtexappkey-sngular-YNKUVG',
                'x-vtex-api-appToken': 'ZQIVDATJIDXHUBUGEOQWKQYOWURJWDYIGFLWLRTADEINJQJNQYLHOCGISUYIIKMEEPAOQYUMUPSFHLEGLESYRRTDZCDQTLRTSEITPVWSDZMYKBBGPSXERNNMVWONUDTJ'
            },
            body: JSON.stringify({
                'cookies_accepted': cookies_accepted,
                'privacy_accepted': terms_and_conditions_accepted
            })
        }

        fetch('https://api.vtex.com/sngular/dataentities/test/documents/' + settingsId, obj)
            .then(res => res)
            .then((result) => {
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    render() {
        const {cookies_accepted, terms_and_conditions_accepted, error} = this.state

        return (
            <div className="mb8">
                <Checkbox
                    checked={cookies_accepted}
                    name="color"
                    label="Cookie Policy accepted"
                    errorMessage={error}
                    onChange={this.handleCookiesChange}
                />

                <a
                    className={`vtex-account_menu-link f6 no-underline db hover-near-black pv5 mv3 pl5 bl bw2 nowrap c-muted-1 b--transparent pointer`}
                    onClick={this.handleCookiesModalToggle}> Click here to see cookies policy
                </a>

                <Modal
                    centered
                    isOpen={this.state.isModalCookiesOpen}
                    onClose={this.handleCookiesModalToggle}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Modal>

                <Checkbox
                    checked={terms_and_conditions_accepted}
                    name="color"
                    label="Terms and Conditions accepted"
                    errorMessage={error}
                    onChange={this.handleTermsChange}
                />

                <a
                    className={`vtex-account_menu-link f6 no-underline db hover-near-black pv5 mv3 pl5 bl bw2 nowrap c-muted-1 b--transparent pointer`}
                    onClick={this.handleTermsModalToggle}> Click here to see terms and conditions policy
                </a>

                <Modal
                    centered
                    isOpen={this.state.isModalTermsOpen}
                    onClose={this.handleTermsModalToggle}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Modal>

                <Button
                    onClick={this.validate}
                >
                    Submit
                </Button>
            </div>
        )
    }
}

export default CookiesAndTerms