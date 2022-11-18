import IndexLogoUrl from "/src/assets/index_logo.png"
import { SignOut } from "phosphor-react"
import { useContext, useEffect, useState } from "react"

import { Context } from "../context/AuthContext"
import { Loader } from "../components/Utils/Loader"

import Transferencia from "../sections/Index/Transferencia"
import Informacoes from "../sections/Index/Informacoes"
import Listagem from "../sections/Index/Listagem"

function Index() {
	const { isLoader, handleLogout, handleGetUserInfo, user } = useContext(Context)

	const getUserInfo = async function () {
		return await handleGetUserInfo()
	}

	useEffect(() => {
		getUserInfo()
	}, [isLoader])

	if (!isLoader && user) {
		return (
			<section className="dashboard-page">
				<div className="wrapper">
					<header className="dashboard-page__header">
						<picture className="dashboard-page__header__logo">
							<img src={IndexLogoUrl} alt="Logo ng.Cash" />
						</picture>

						<button className="dashboard-page__header__logout" onClick={handleLogout}>
							<SignOut size={26} />
						</button>
					</header>

					<main className="dashboard-page__main">
						<Informacoes />

						<Transferencia />
						<Listagem />
					</main>
				</div>
			</section>
		)
	} else {
		return (
			<section className="dashboard-page">
				<Loader />
			</section>
		)
	}
}

export default Index
