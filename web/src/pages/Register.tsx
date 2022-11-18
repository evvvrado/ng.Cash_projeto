import { Link } from "react-router-dom"
import LogoUrl from "../assets/login_logo-ngcash.png"

import { Button } from "../components/Form/Button"
import { FormTitle } from "../components/Form/FormTitle"
import { Label } from "../components/Form/Label"
import { Loader } from "../components/Utils/Loader"

import { useContext, useState } from "react"

import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import axios from "axios"

import { Context } from "../context/AuthContext"

const schema = yup
	.object({
		username: yup
			.string()
			.required("Esse campo é obrigatório")
			.min(3, "Digite um usuário maior"),
		password: yup
			.string()
			.required("Esse campo é obrigatório")
			.min(8, "Digite uma senha mais longa")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
				"É necessário ter:Um caráctere em maiúsculo, Um número, E um caráctere especial."
			),
	})
	.required()

function Register() {
	const { handleRegister, isLoader, setIsLoader, errorMessage } = useContext(Context)

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
		handleRegister(getValues("username"), getValues("password"))
	}

	return (
		<section className="register-page">
			<div className="register-page__wrapper">
				<picture className="register__logo">
					<img src={LogoUrl} alt="Logo NG CASH" />
				</picture>

				<div className="register-page__form">
					<FormTitle text="VENHA PARA A NOVA GERAÇÃO" />

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

						<span className="register-page__form__cta">
							Já tem uma conta ? <Link to="/">Acesse clicando aqui</Link>
						</span>

						{isLoader ? <Loader /> : <Button text="Registrar" />}
					</form>
				</div>
			</div>
		</section>
	)
}

export default Register
