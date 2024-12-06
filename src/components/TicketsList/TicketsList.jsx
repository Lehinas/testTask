import React from "react"

import airlineLogo from "../../assets/icons/airline_logo.png"
import airplane from "../../assets/icons/airplane.svg"
import ticketsData from "../../tickets.json"
import styles from "./TicketsList.module.css"

const TicketsList = ({currentCurrency, selectedStops}) => {
	const tickets = ticketsData.tickets
	const getPriceText = (type, defPrice) => {
		const rubToUsd = 0.01
		const rubToEur = 0.0094

		const formatPrice = (price) => {
			return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
		}

		let priceText = ""

		switch (type) {
			case "RUB":
				priceText = `Купить за ${formatPrice(defPrice)}₽`
				break
			case "USD":
				const usdPrice = (defPrice * rubToUsd).toFixed(2)
				priceText = `Купить за ${formatPrice(usdPrice)}$`
				break
			case "EUR":
				const eurPrice = (defPrice * rubToEur).toFixed(2)
				priceText = `Купить за ${formatPrice(eurPrice)}€`
				break
			default:
				priceText = `Купить за ${formatPrice(defPrice)}₽`
		}

		return priceText.replace("Купить", "Купить<br />")
	}

	const getStopsText = (stopsCount) => {
		switch (stopsCount) {
			case 0:
				return "Без пересадок"
			case 1:
				return "1 пересадка"
			case 2:
				return "2 пересадки"
			case 3:
				return "3 пересадки"
			default:
				return `${stopsCount} пересадок`
		}
	}


	const filteredTickets = tickets.filter((ticket) => {

		if (selectedStops.all) return true

		if (selectedStops.nonstop && ticket.stops === 0) return true
		if (selectedStops.one && ticket.stops === 1) return true
		if (selectedStops.two && ticket.stops === 2) return true
		if (selectedStops.three && ticket.stops === 3) return true
		return false
	})

	const rofl = () => {
		window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0", "_blank")
		// sorry)
	}

	return (
		<div className={styles.TicketsList}>
			{filteredTickets.map((item, index) => (
				<div key={index} className={styles.ticket_item}>
					<section className={styles.buy_section}>
						<img src={airlineLogo} alt={"airlineLogo(заглушка)"} className={styles.airline_logo}/>
						<button className={styles.price_btn}
						        onClick={rofl}
						        dangerouslySetInnerHTML={{__html: getPriceText(currentCurrency, item.price)}}/>
					</section>

					<section className={styles.flight_details}>
						<div className={styles.flight_time}>
							<div className={styles.time}>{item.departure_time}</div>
							<div className={styles.stops}>
								<div className={styles.stops_count}>{getStopsText(item.stops)}</div>
								<div className={styles.stops_airplane}>
									<div className={styles.line}></div>
									<img className={styles.stops_logo} src={airplane} alt="airplane"/>
								</div>
							</div>
							<div className={styles.time}>{item.arrival_time}</div>
						</div>

						<div className={styles.flight_info_wrapper}>
							<div className={styles.flight_info}>
								<div className={styles.flight_place}>{item.origin}, {item.origin_name}</div>
								<div className={styles.departure_date}>{item.departure_date}</div>
							</div>
							<div className={styles.flight_info}>
								<div className={styles.flight_place}>{item.destination}, {item.destination_name}</div>
								<div className={styles.arrival_date}>{item.arrival_date}</div>
							</div>
						</div>
					</section>

				</div>
			))}
		</div>
	)
}

export default TicketsList