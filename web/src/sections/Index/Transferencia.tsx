import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Label } from "../../components/Form/Label"

import * as yup from "yup"
import { useContext, useState } from "react"
import { Context } from "../../context/AuthContext"

const schema = yup
	.object({
		creditedUserName: yup.string().required("Esse campo é obrigatório"),
		value: yup.number().typeError("Digite um número").required("Esse campo é obrigatório"),
	})
	.required()

function Transferencia() {
	const { setIsLoader, user, errorMessage, handleTransferBalance } = useContext(Context)

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onHandleSubmit = () => {
		handleTransferBalance(user.account.id, getValues("creditedUserName"), getValues("value"))
		setIsLoader(true)
	}

	return (
		<div className="dashboard-page__main__transferencia">
			<form onSubmit={handleSubmit(onHandleSubmit)} autoComplete="off">
				<Label
					registro={register("creditedUserName")}
					type="text"
					erro={
						errors.creditedUserName?.message
							? errors.creditedUserName?.message
							: errorMessage
					}
					placeholder="Digite o usuário que você deseja transferir"
				/>

				<Label
					registro={register("value")}
					type="number"
					max={user.account.balance}
					erro={errors.value?.message ? errors.value?.message : errorMessage}
					placeholder="Digite o valor que você deseja transferir"
				/>
				<button className="form__button-default" type="submit">
					Tranferir
				</button>
			</form>
		</div>
	)
}

export default Transferencia
