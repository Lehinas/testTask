import "./App.css"

import logo from ".//assets/icons/logo.png"
import Tickets from "./pages/Tickets/Tickets"

function App() {
	return (
		<div className="App">
			<img src={logo} className={"logo"}/>
			<Tickets/>
		</div>
	)
}

export default App
