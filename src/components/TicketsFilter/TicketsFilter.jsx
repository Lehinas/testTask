import React from "react"
import styles from "./TicketsFilter.module.css"

const TicketsFilter = ({currentCurrency, selectedStops, onCurrencyChange, onStopsChange}) => {

	const currencyHandler = (currency) => {
		onCurrencyChange(currency)
	}

	const handleOnlyClick = (id) => {
		const newStops = {...selectedStops}
		Object.keys(newStops).forEach(key => {
			newStops[key] = false
		})
		newStops[id] = true
		onStopsChange(newStops)
	}


	const handleCheckboxChange = (id) => {
		if (id === "all") {
			onStopsChange({
				all: true,
				nonstop: false,
				one: false,
				two: false,
				three: false,
			})
		} else {
			const newStops = {...selectedStops, [id]: !selectedStops[id]}

			if (Object.values(newStops).every(value => !value)) {
				newStops.all = true
			} else if (newStops.all) {
				newStops.all = false
			}

			onStopsChange(newStops)
		}
	}


	return (
		<div className={styles.TicketsFilter}>
			<section className={styles.currency}>
				<div className={styles.currency_title}>ВАЛЮТА</div>
				<div className={styles.currency_btns}>
					{["RUB", "USD", "EUR"].map((type, index) =>
						<button
							onClick={() => currencyHandler(type)}
							className={currentCurrency === type
								? `${styles.currency_btn} ${styles.currency_btn_active}`
								: styles.currency_btn}
							key={index}
						>
							{type}
						</button>
					)}
				</div>
			</section>
			<section className={styles.stops}>
				<div className={styles.stops_title}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
				<div className={styles.stops_btns}>
					{[
						{id: "all", text: "Все"},
						{id: "nonstop", text: "Без пересадок"},
						{id: "one", text: "1 пересадка"},
						{id: "two", text: "2 пересадки"},
						{id: "three", text: "3 пересадки"}
					].map(option => (
						<div key={option.id} className={styles.stops_item}>
							<input
								type="checkbox"
								id={option.id}
								className={styles.stops_checkbox}
								checked={selectedStops[option.id]}
								onChange={() => handleCheckboxChange(option.id)}
							/>
							<label htmlFor={option.id} className={styles.stops_text}>{option.text}</label>
							<button
								className={styles.stops_only_btn}
								onClick={() => handleOnlyClick(option.id)}
							>
								ТОЛЬКО
							</button>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}

export default TicketsFilter
