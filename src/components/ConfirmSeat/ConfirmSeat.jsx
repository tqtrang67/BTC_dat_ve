import clsx from "clsx";
import styles from "./ConfirmSeat.module.css";
import { useSelector } from "react-redux";
export default function ConfirmSeat() {
	const dataCart = useSelector((state) => state.seatReducer.cart);

	return (
		<div>
			<table border={1} className={clsx(styles.table)}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Number Of Seats</th>
						<th>Seats</th>
					</tr>
				</thead>
				<tbody>
					{dataCart.map((item, index) => (
						<tr key={index}>
							<td>{item.name}</td>
							<td>{item.quantity}</td>
							<td>{item.seats.join(", ")}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
