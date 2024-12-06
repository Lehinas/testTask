import React, {useState} from "react"
import TicketsFilter from "../../components/TicketsFilter/TicketsFilter"
import TicketsList from "../../components/TicketsList/TicketsList"
import styles from "./Tickets.module.css"

const Tickets = () => {
	const [currentCurrency, setCurrentCurrency] = useState("RUB")
	const [selectedStops, setSelectedStops] = useState({
		all: true,
		nonstop: false,
		one: false,
		two: false,
		three: false,
	})

	const handleCurrencyChange = (currency) => {
		setCurrentCurrency(currency)
	}

	const handleStopsChange = (stops) => {
		setSelectedStops(stops)
	}

	return (
		<div className={styles.Tickets}>
			<TicketsFilter
				currentCurrency={currentCurrency}
				selectedStops={selectedStops}
				onCurrencyChange={handleCurrencyChange}
				onStopsChange={handleStopsChange}
			/>
			<TicketsList
				currentCurrency={currentCurrency}
				selectedStops={selectedStops}
			/>
		</div>
	)
}

export default Tickets
