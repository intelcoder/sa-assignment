import { store } from 'redux/store'
import { render, configure } from '@testing-library/react'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'

configure({ testIdAttribute: 'data-test-id' })

// eslint-disable-next-line
const AllProviders = ({ children }) => (
  <Provider store={store}>
    {children}
    </Provider>
)

const customRender = (ui: any, options: any) => (
  render(ui, { wrapper: AllProviders, ...options })
)

export * from '@testing-library/react'


// override render method
export { customRender as render }
