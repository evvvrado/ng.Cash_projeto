import { numberFormat } from "../../utils/number_format"
import { CurrencyDollar, User } from "phosphor-react"

import { useContext } from "react"
import { Context } from "../../context/AuthContext"

function Informacoes() {
	const { user } = useContext(Context)

	return (
		<div className="dashboard-page__main__user-info">
			<div className="dashboard-page__main__user-info__content">
				<picture className="dashboard-page__main__user-info__content__picture">
					<User size={65} />
				</picture>

				<div className="dashboard-page__main__user-info__content__text">
					<p>
						bem vindo de volta,
						<strong> @{user.username}</strong>
					</p>

					<div>
						<p>seu cash:</p>
						<div className="dashboard-page__main__user-info__content__text__cash">
							R${numberFormat(user.account.balance, 2, ",", ".")}
						</div>
					</div>
				</div>
			</div>

			<button className="dashboard-page__main__user-info__button">
				<CurrencyDollar size={53} />
				<span>realizar transferência</span>
			</button>
		</div>
	)
}

export default Informacoes
