import { Link } from "react-router-dom"
import LogoUrl from "../assets/login_logo-ngcash.png"

import { Button } from "../components/Form/Button"
import { FormTitle } from "../components/Form/FormTitle"
import { Label } from "../components/Form/Label"
import { Loader } from "../components/Utils/Loader"

import { useState, useContext } from "react"

import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Context } from "../context/AuthContext"

const schema = yup
	.object({
		username: yup.string().required("Esse campo é obrigatório"),
		password: yup.string().required("Esse campo é obrigatório"),
	})
	.required()

function Login() {
	const { handleLogin, isLoader, setIsLoader, errorMessage } = useContext(Context)

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onHandleSubmit = () => {
		setIsLoader(true)
		handleLogin(getValues("username"), getValues("password"))
	}

	return (
		<section className="login-page">
			<div className="login-page__wrapper">
				<picture className="login__logo">
					<img src={LogoUrl} alt="Logo NG CASH" />
				</picture>

				<hr />

				<div className="login-page__form">
					<FormTitle text="Acesse sua conta" />
					<form onSubmit={handleSubmit(onHandleSubmit)} autoComplete="off">
						<Label
							disabled={isLoader && true}
							type="text"
							registro={register("username")}
							erro={
								errors.username?.message ? errors.username?.message : errorMessage
							}
							placeholder="Digite seu usuário"
						/>
						<Label
							disabled={isLoader && true}
							type="password"
							registro={register("password")}
							erro={
								errors.password?.message ? errors.password?.message : errorMessage
							}
							placeholder="Digite sua senha"
						/>

						<span className="login-page__form__cta">
							Não tem uma conta? <Link to="/register">Registre-se</Link>
						</span>

						{isLoader ? <Loader /> : <Button text="ENTRAR" />}
					</form>
				</div>
			</div>
		</section>
	)
}

export default Login
