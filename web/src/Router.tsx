import { Routes, Route, Navigate } from "react-router-dom"

import Index from "./pages/Index"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Context } from "./context/AuthContext"
import { useContext, useEffect } from "react"

function Router() {
	const { authenticated } = useContext(Context)

	return (
		<Routes>
			{authenticated && <Route path="/" element={<Index />} />}
			{authenticated && <Route path="*" element={<Navigate to="/" />} />}
			{!authenticated && <Route path="/login" element={<Login />} />}
			{!authenticated && <Route path="/register" element={<Register />} />}
			{!authenticated && <Route path="*" element={<Navigate to="/login" />} />}
		</Routes>
	)
}

export default Router
