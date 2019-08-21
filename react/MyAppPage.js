import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
// Your component pages
import PrivacySettings from "./components/PrivacySettings";

const MyAppPage = () => (
  <Fragment>
    <Route exact path="/privacy" component={PrivacySettings} />
  </Fragment>
)

export default MyAppPage
