import Router from "./Router"

import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
