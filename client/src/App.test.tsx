import { render, screen } from '@testing-library/react'

import App from "./App"
import { MaterialUIControllerProvider } from './context'
import { BrowserRouter } from 'react-router-dom'

it("should do something", () => {
  render(
    <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>)
})