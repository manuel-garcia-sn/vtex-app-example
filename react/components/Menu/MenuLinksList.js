import React, { Component, Fragment } from 'react'
import {
  injectIntl,
  intlShape,
  FormattedMessage,
  defineMessages,
} from 'react-intl'
import { ExtensionPoint } from 'render'
import { AuthService } from 'vtex.react-vtexid'
import { ModalDialog } from 'vtex.styleguide'
import MenuLink from './MenuLink'

const links = [
  {
    id: 'pages.profile',
    path: '/profile',
  },
  {
    id: 'pages.addresses',
    path: '/addresses',
  },
]
const messages = defineMessages({
  logout: { id: 'pages.logout', defaultMessage: '' },
  cancel: { id: 'logoutModal.cancel', defaultMessage: '' },
})

class MenuLinksList extends Component {
  state = { isModalCookiesOpen: false }

  handleModalToggle = () => {
    this.setState(prevState => ({ isModalCookiesOpen: !prevState.isModalCookiesOpen }))
  }

  render() {
    const { intl } = this.props

    return (
      <nav className="vtex-account__menu-links">
        <ExtensionPoint
          id="menu-links-before"
          render={links =>
            links.map(({ name, path }) => (
              <MenuLink path={path} name={name} key={name} />
            ))
          }
        />
        {links.map(({ path, id }) => (
          <MenuLink path={path} name={intl.formatMessage({ id })} key={id} />
        ))}
        <ExtensionPoint
          id="menu-links-after"
          render={links =>
            links.map(({ name, path }) => (
              <MenuLink path={path} name={name} key={name} />
            ))
          }
        />
        <AuthService.RedirectLogout returnUrl="/">
          {({ action: logout }) => (
            <Fragment>
              <a
                className={`vtex-account_menu-link f6 no-underline db hover-near-black pv5 mv3 pl5 bl bw2 nowrap c-muted-1 b--transparent pointer`}
                onClick={this.handleModalToggle}>
                <FormattedMessage id="pages.logout" />
              </a>

              <ModalDialog
                centered
                confirmation={{
                  onClick: logout,
                  label: intl.formatMessage(messages.logout),
                }}
                cancelation={{
                  onClick: this.handleModalToggle,
                  label: intl.formatMessage(messages.cancel),
                }}
                isOpen={this.state.isModalCookiesOpen}
                onClose={this.handleModalToggle}>
                <span className="t-heading-5 pa6">
                  <FormattedMessage id="logoutModal.title" />
                </span>
              </ModalDialog>
            </Fragment>
          )}
        </AuthService.RedirectLogout>
      </nav>
    )
  }
}

MenuLinksList.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(MenuLinksList)
