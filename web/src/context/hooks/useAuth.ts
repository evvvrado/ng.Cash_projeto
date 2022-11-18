import axios from "axios"
import React, { createContext, ReactNode, useEffect, useState } from "react"

export default function useAuth() {
	const [authenticated, setAuthenticated] = useState(false)
	const [isLoader, setIsLoader] = useState(true)
	const [errorMessage, setErrorMessage] = useState("")
	const [userInfo, setUserInfo] = useState(null)
	const [userTransactions, setUserTransactions] = useState(null)

	axios.defaults.baseURL = "http://localhost:3333"

	async function handleLogin(username?: string, password?: string) {
		await axios
			.post("/login", {
				username: username,
				password: password,
			})
			.then(({ data }) => {
				if (data.erro) {
					setErrorMessage(data.erro)
					setIsLoader(false)
				} else {
					setErrorMessage("")
					localStorage.setItem("token", JSON.stringify(data.token))
					localStorage.setItem("tokenID", data.refreshToken.id)
					axios.defaults.headers.Authorization = `Bearer ${data.token}`
					setAuthenticated(true)
					window.location.href = "/"
				}
			})
	}

	async function handleRegister(username?: string, password?: string) {
		await axios
			.post("/register", {
				username: username,
				password: password,
			})
			.then(({ data }) => {
				if (data.erro) {
					setErrorMessage(data.erro)
					setIsLoader(false)
				} else {
					setErrorMessage("")
					window.location.href = "/login"
				}
			})
	}

	async function handleGetUserInfo() {
		try {
			await axios
				.post("/user", {
					tokenId: localStorage.getItem("tokenID"),
				})
				.then(({ data }) => {
					setUserInfo(data)
					setIsLoader(false)
				})
		} catch (error) {
			handleLogout()
			return { error }
		}
	}

	async function handleGetTransactions() {
		try {
			await axios
				.post("/transactions", {
					tokenId: localStorage.getItem("tokenID"),
				})
				.then(({ data }) => {
					setUserTransactions(data)
					setIsLoader(false)
				})
		} catch (error) {
			handleLogout()
			return { error }
		}
	}

	async function handleRefreshToken() {}

	async function handleTransferBalance(
		debitedAccountId: string,
		creditedUserName: string,
		value: number
	) {
		try {
			await axios
				.post("/transfer", {
					debitedAccountId,
					creditedUserName,
					value,
				})
				.then(({ data }) => {
					if (data.erro) setErrorMessage(data.erro)
					else {
						setErrorMessage("")
						return data.message
					}
				})
		} catch (error) {
			return "Error"
		}

		setIsLoader(false)
	}

	function handleLogout() {
		localStorage.removeItem("token")
		localStorage.removeItem("tokenID")
		sessionStorage.clear()
		axios.defaults.headers.Authorization = null
		setAuthenticated(false)
	}

	return {
		authenticated,
		handleLogin,
		handleRegister,
		handleLogout,
		handleRefreshToken,
		handleGetUserInfo,
		handleGetTransactions,
		handleTransferBalance,
		isLoader,
		setIsLoader,
		setAuthenticated,
		user: userInfo,
		userTransactions,
		errorMessage,
	}
}
