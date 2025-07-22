// Packages
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'
import { ToastProvider } from './Context/ToastContext.jsx'

import AuthProvider from './Context/AuthContext.jsx'
import BookingsProvider from './Context/BookingContext.jsx'

function App() {
  return(
    <AuthProvider>
      <BookingsProvider>
        <ToastProvider>
          <RouterProvider router={ router }/>
        </ToastProvider>
      </BookingsProvider>
    </AuthProvider>
  )
}

export default App
