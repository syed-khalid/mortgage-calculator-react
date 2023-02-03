import { useState } from "react";
import "./App.css";

function App() {
	const [principal, setPrincipal] = useState(0);

	const [interest, setInterest] = useState(0);
	const [loanTerm, setLoanTerm] = useState(12);
	const [monthlyPayment, setMonthlyPayment] = useState(0);
	const [totalPaid, setTotalPaid] = useState(0);

	const [amortizationTable, setAmortizationTable] = useState([]);

	const [submit, setSubmit] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();

		var monthlyRate = interest / 100 / 12;

		var balance = principal;

		var payment = (
			balance *
			(monthlyRate / (1 - Math.pow(1 + monthlyRate, -loanTerm)))
		).toFixed(2);

		console.log(payment);

		setMonthlyPayment(payment);
		setTotalPaid((payment * loanTerm).toFixed(2));

		let table = [];

		for (let count = 0; count < loanTerm; ++count) {
			var interestRate = 0;

			var monthlyPrincipal = 0;

			interestRate = balance * monthlyRate;

			monthlyPrincipal = payment - interestRate;

			table.push({
				paymentNumber: count + 1,
				balance: balance.toFixed(2),
				interest: interestRate.toFixed(2),
				monthlyPrincipal: monthlyPrincipal.toFixed(2),
			});

			//update the balance for each loop iteration
			balance = balance - monthlyPrincipal;
		}

		setAmortizationTable(table);

		setSubmit(true);
	}

	return (
		<div className='App'>
			<h1>Mortgage Calculator</h1>
			<form
				style={{ display: "flex", flexDirection: "column", gap: "10px" }}
				onSubmit={handleSubmit}>
				<div>
					<label>Principal: </label>
					<input
						type='number'
						name='principal'
						value={principal}
						onChange={(e) => setPrincipal(e.target.valueAsNumber)}
					/>
				</div>

				<div>
					<label>Interest %: </label>
					<input
						type='number'
						name='interest'
						value={interest}
						onChange={(e) => {
							setInterest(e.target.valueAsNumber);
							console.log(interest);
						}}
					/>
				</div>

				<div>
					<label>Loan Term: </label>
					<select
						name='loan'
						onChange={(e) => {
							setLoanTerm(e.target.value);
						}}>
						<option value='12'>12 Months</option>
						<option value='24'>24 Months</option>
						<option value='36'>36 Months</option>
						<option value='48'>48 Months</option>
						<option value='60'>60 Months</option>
					</select>
				</div>

				<div>
					<button type='submit'>Calculate</button>
				</div>
			</form>

			{submit ? (
				<div>
					<h2>Loan Amount: ${principal}</h2>
					<h2>Interest Rate: {interest}%</h2>
					<h2>Number of Months: {loanTerm}</h2>
					<h2>Monthly Payment: ${monthlyPayment}</h2>
					<h2>Total Paid: ${totalPaid}</h2>

					<table>
						<thead>
							<tr>
								<th>Payment# </th>
								<th>Balance</th>
								<th>Interest</th>
								<th>Principal</th>
							</tr>
						</thead>
						<tbody>
							{amortizationTable.map((item, index) => (
								<tr key={index}>
									<td>{item.paymentNumber}</td>
									<td>{item.balance}</td>
									<td>{item.interest}</td>
									<td>{item.monthlyPrincipal}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : null}
		</div>
	);
}

export default App;

