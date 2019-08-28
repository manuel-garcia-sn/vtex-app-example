import { Container } from 'vtex.store-components'
import { withRuntimeContext } from "vtex.render-runtime";
import { injectIntl } from 'react-intl'

const Home = () => (
  <Container className="my-section">
    My content
  </Container>
)

export default withRuntimeContext(injectIntl(Home))