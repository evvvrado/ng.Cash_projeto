import axios from "axios"
import React, { createContext, ReactNode, useEffect, useState } from "react"

import useAuth from "./hooks/useAuth"

type AuthContextProviderProps = {
	children?: ReactNode | undefined
}

type AuthContextType = {
	authenticated: Boolean
	isLoader: Boolean
	user: any
	userTransactions: any
	handleLogin: (username?: string, password?: string) => void
	handleRegister: (username?: string, password?: string) => void
	handleRefreshToken: () => void
	handleGetUserInfo: () => void
	handleLogout: () => void
	handleGetTransactions: () => void
	handleTransferBalance: (
		debitedAccountId: string,
		creditedUserName: string,
		value: number
	) => any
	setIsLoader: any
	errorMessage: string
}

const Context = createContext({} as AuthContextType)

function AuthProvider(props: AuthContextProviderProps) {
	const {
		authenticated,
		handleLogin,
		handleRegister,
		handleRefreshToken,
		handleLogout,
		handleGetUserInfo,
		handleTransferBalance,
		isLoader,
		setIsLoader,
		errorMessage,
		setAuthenticated,
		handleGetTransactions,
		user,
		userTransactions,
	} = useAuth()

	useEffect(() => {
		const token = localStorage.getItem("token")

		if (token) {
			axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
			setAuthenticated(true)
		}

		setIsLoader(false)
	}, [])

	return (
		<Context.Provider
			value={{
				authenticated,
				handleLogin,
				handleRegister,
				handleLogout,
				isLoader,
				setIsLoader,
				errorMessage,
				handleRefreshToken,
				handleTransferBalance,
				handleGetUserInfo,
				handleGetTransactions,
				user,
				userTransactions,
			}}
		>
			{props.children}
		</Context.Provider>
	)
}

export { Context, AuthProvider }
