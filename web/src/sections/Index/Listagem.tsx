import { useContext, useEffect, useState } from "react"
import Transaction from "../../components/Listagem/Transaction"

import { Context } from "../../context/AuthContext"

function Listagem() {
	const { handleGetTransactions, userTransactions } = useContext(Context)

	const getTransactions = async function () {
		return await handleGetTransactions()
	}

	useEffect(() => {
		getTransactions()
	}, [])

	return (
		<>
			<div className="dashboard-page__transactions">
				<div className="dashboard-page__transactions__title"></div>

				<div className="dashboard-page__transactions__list">
					<table className="dashboard-page__transactions__list__table">
						<tbody>
							{userTransactions &&
								userTransactions.transactions.map(
									(transaction: any, index: number) => {
										return (
											<Transaction
												key={index}
												cashIn={transaction.cashIn}
												username={transaction.relatedUser.username}
												value={transaction.value}
												date={transaction.createdAt}
											/>
										)
									}
								)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default Listagem
