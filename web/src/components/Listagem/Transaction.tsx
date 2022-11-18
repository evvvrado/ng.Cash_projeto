import { ArrowDownRight, ArrowUpLeft } from "phosphor-react"

import { numberFormat } from "../../utils/number_format"

interface iTransaction {
	cashIn: Boolean
	username: String
	value: Number
	date: any
}

function Transaction({ cashIn, username, value, date }: iTransaction) {
	const convertedDate = new Date(date.replace(" ", "T"))

	return (
		<tr>
			<td className="dashboard-page__transactions__list__table__icon">
				{cashIn ? (
					<ArrowDownRight size={56} color="#5AC259" />
				) : (
					<ArrowUpLeft size={56} color="#7431F4" />
				)}
			</td>

			<td className="dashboard-page__transactions__list__table__info">
				<p>
					transfêrencia {cashIn ? "recebida" : "realizada"} <br />
					<strong>@{username}</strong>
				</p>

				<strong>R${numberFormat(value, 2, ",", ".")}</strong>
			</td>

			<td className="dashboard-page__transactions__list__table__date">
				<span>
					{convertedDate.toLocaleDateString("pt-br") +
						" às " +
						convertedDate.toLocaleTimeString("pt-br")}
				</span>
			</td>
		</tr>
	)
}

export default Transaction
