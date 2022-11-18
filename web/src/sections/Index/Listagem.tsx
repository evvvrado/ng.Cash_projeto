import { ArrowDownRight, ArrowUpLeft, CalendarBlank, Eraser } from "phosphor-react"
import { useContext, useEffect, useState } from "react"
import Transaction from "../../components/Listagem/Transaction"

import { Context } from "../../context/AuthContext"

function Listagem() {
	const { handleGetTransactions, userTransactions } = useContext(Context)
	const [filter, setFilter] = useState(0)
	const [date, setDate] = useState(Date)

	const getTransactions = async function () {
		return await handleGetTransactions()
	}

	const handleSetFilter = function (element: any) {
		switch (filter) {
			case 1:
				return element.cashIn
			case 2:
				return !element.cashIn
			case 3:
				const filterDate = new Date(date)
				const elementDate = new Date(element.createdAt.replace(" ", "T"))
				const verify =
					filterDate.getDay() + 1 == elementDate.getDay() &&
					filterDate.getMonth() == elementDate.getMonth() &&
					filterDate.getFullYear() == elementDate.getFullYear()

				return verify

			default:
				return true
		}
	}

	const handleSetDate = function (event: any) {
		setDate(event.target.value)
	}

	useEffect(() => {
		getTransactions()
	}, [])

	return (
		<>
			<div className="dashboard-page__transactions">
				<div className="dashboard-page__transactions__title">
					<div className="dashboard-page__transactions__title__text">atividades:</div>
					<div className="dashboard-page__transactions__title__filter">
						<label>
							<input type="date" onChange={handleSetDate} />
							<button
								onClick={() => setFilter(3)}
								className={filter == 3 ? "active" : ""}
							>
								<CalendarBlank size={22} />
							</button>
						</label>

						<button
							onClick={() => setFilter(2)}
							className={filter == 2 ? "active" : ""}
						>
							<picture>
								<ArrowUpLeft size={22} />
							</picture>
						</button>
						<button
							onClick={() => setFilter(1)}
							className={filter == 1 ? "active" : ""}
						>
							<picture>
								<ArrowDownRight size={22} />
							</picture>
						</button>
						<button onClick={() => setFilter(0)}>
							<picture>
								<Eraser size={22} />
							</picture>
						</button>
					</div>
				</div>

				<div className="dashboard-page__transactions__list">
					<table className="dashboard-page__transactions__list__table">
						<tbody>
							{userTransactions &&
								userTransactions.transactions
									.filter((element: any) => {
										return handleSetFilter(element)
									})
									.map((transaction: any, index: number) => {
										return (
											<Transaction
												key={index}
												cashIn={transaction.cashIn}
												username={transaction.relatedUser.username}
												value={transaction.value}
												date={transaction.createdAt}
											/>
										)
									})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default Listagem
