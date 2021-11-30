import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { App } from '../App'
import { store } from '../../../store'

const renderWithStoreProvider = (Component: React.ElementType) => {
  return render(
    <Provider store={store}>
      <Component />
    </Provider>
  )
}

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Applications', () => {
    it('should correctly render', async () => {
      renderWithStoreProvider(() => <App />)

      await waitFor(() => screen.getByText('Application 1'))
    })
  })

  describe('Filters', () => {
    it('should correctly render', async () => {
      renderWithStoreProvider(() => <App />)

      await waitFor(() => screen.getByText('Spending'))
    })

    it('should correctly filter applications if spending range value is changed', async () => {
      renderWithStoreProvider(() => <App />)

      await waitFor(() => screen.getByText('Spending'))

      fireEvent.change(screen.getByTestId('spending-filter-input'), {
        target: { value: 100 },
      })

      expect(screen.getAllByTestId('application-item')).toHaveLength(1)
    })
  })

  describe('Navigation', () => {
    it('should correctly open capabilities when clicking open', async () => {
      renderWithStoreProvider(() => <App />)

      await waitFor(() => screen.getByText('Navigation'))

      fireEvent.click(screen.getByTestId('open-Business Capability 1'))

      await waitFor(() => screen.getByText('Business Capability 1.1'))

      fireEvent.click(screen.getByTestId('open-Business Capability 1.1'))

      await waitFor(() => screen.getByText('Business Capability 1.1.1'))
    })

    it('should correctly select and unselect capability when clicking on it', async () => {
      renderWithStoreProvider(() => <App />)

      await waitFor(() => screen.getByText('Navigation'))

      fireEvent.click(screen.getByTestId('select-Business Capability 1'))

      expect(screen.getAllByTestId('application-item')).toHaveLength(32)

      fireEvent.click(screen.getByTestId('unselect-Business Capability 1'))

      expect(screen.getAllByTestId('application-item')).toHaveLength(100)
    })
  })
})
