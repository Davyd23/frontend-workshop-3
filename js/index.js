import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { initAll } from 'govuk-frontend'
import Main from '@govuk-react/main'
import GridRow from '@govuk-react/grid-row'
import GridCol from '@govuk-react/grid-col'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import PageHeader from './components/PageHeader'
import store, { history } from './store'

// as stipulated by https://github.com/alphagov/govuk-frontend/blob/master/docs/installation/installing-with-npm.md#option-2-import-javascript
initAll()

const HelloWorld = () => (
  <Main>
    <GridCol columnOneThird>
      <GridRow>
        Hello World
      </GridRow>
    </GridCol>
  </Main>
)

// GOV UK example template: https://codesandbox.io/s/x917knwm4z
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PageHeader />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HelloWorld} />
        </Switch> 
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
)
