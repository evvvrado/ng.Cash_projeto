import { ArrowDownRight, ArrowUpLeft, CalendarBlank, Eraser } from "phosphor-react"
import { useContext, useEffect, useState } from "react"
import Transaction from "../../components/Listagem/Transaction"

import { Context } from "../../context/AuthContext"

function Listagem() {
	const { handleGetTransactions, userTransactions } = useContext(Context)
	const [filter, setFilter] = useState({ inOut: 0, date: "" })

	const getTransactions = async function () {
		return await handleGetTransactions()
	}

	const handleSetFilter = function (element: any) {
		var filtersOptions = true

		if (filter.date.length) {
			const filterDate = new Date(filter.date)
			const elementDate = new Date(element.createdAt.replace(" ", "T"))
			const verify =
				filterDate.getDay() + 1 == elementDate.getDay() &&
				filterDate.getMonth() == elementDate.getMonth() &&
				filterDate.getFullYear() == elementDate.getFullYear()

			filtersOptions = filtersOptions && verify
		}

		if (filter.inOut == 1) filtersOptions = filtersOptions && element.cashIn

		if (filter.inOut == 2) filtersOptions = filtersOptions && !element.cashIn

		return filtersOptions
	}
	const handleResetFilter = function () {
		setFilter({ date: "", inOut: 0 })
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
							<input
								type="date"
								id="filter-date"
								value={filter.date}
								onChange={(event) =>
									setFilter({ ...filter, date: event.target.value })
								}
							/>
							<button className={filter.date ? "active" : ""}>
								<CalendarBlank size={22} />
							</button>
						</label>

						<button
							onClick={() => setFilter({ ...filter, inOut: 2 })}
							className={filter.inOut == 2 ? "active" : ""}
						>
							<picture>
								<ArrowUpLeft size={22} />
							</picture>
						</button>
						<button
							onClick={() => setFilter({ ...filter, inOut: 1 })}
							className={filter.inOut == 1 ? "active" : ""}
						>
							<picture>
								<ArrowDownRight size={22} />
							</picture>
						</button>
						<button onClick={handleResetFilter}>
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
