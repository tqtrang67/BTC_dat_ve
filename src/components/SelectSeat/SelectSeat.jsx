import { useState } from "react";
import styles from "./SelectSeat.module.css";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { seatArr } from "../../data/data";
import clsx from "clsx";
import { ADD_TO_CART, CLEAR_FORM } from "../../redux/constants";

export default function SelectSeat() {
	const [seatSelected, setSeatSelected] = useState([]);
	const dataForm = useSelector((state) => {
		return state.seatReducer.form;
	});
	console.log("🚀 ~ dataForm ~ dataForm:", dataForm);

	const dispatch = useDispatch();
	const handleSelected = (seat) => {
		setSeatSelected((prev) => {
			const cloenSeatSelected = [...prev];
			const index = cloenSeatSelected.findIndex((item) => {
				return item === seat.soGhe;
			});
			if (index === -1) {
				cloenSeatSelected.push(seat.soGhe);
			} else {
				cloenSeatSelected.splice(index, 1);
			}
			return cloenSeatSelected;
		});
	};

	const handleConfirm = () => {
		const itemCart = { ...dataForm, seats: seatSelected };
		if (dataForm.quantity !== seatSelected.length) {
			message.error("Số lượng ghế chọn không đúng số lượng đăng ký");
		} else {
			dispatch({
				type: ADD_TO_CART,
				payload: itemCart,
			});
			dispatch({
				type: CLEAR_FORM,
				payload: {},
			});
			setSeatSelected([]);
		}
	};

	const isCheckDisable = (seat) => {
		if (seatSelected.includes(seat.soGhe)) {
			return false;
		}
		if (seatSelected.length >= dataForm.quantity) {
			return true;
		}
		return seat.daDat;
	};
	return (
		<div className="mt-5">
			<ul className={styles.status_seats}>
				<li className={styles.seat_green}>SelectedSeat</li>
				<li className={styles.seat_yellow}>Reserved Seat</li>
				<li className={styles.seat_red}>Empty Seat</li>
			</ul>
			<div>
				<p className={styles.select}>Please Select your Seats NOW!</p>
				<table className={styles.select_table}>
					<tbody>
						{seatArr.map((item, index) => {
							return (
								<tr key={index}>
									<td>{item.hang}</td>
									{item.danhSachGhe.map((seat, index) => (
										<td key={index}>
											{
												<button
													className={clsx(
														item.hang
															? styles.btnItem
															: styles.btnTitle,
														seatSelected.includes(
															seat.soGhe
														)
															? styles.green
															: "",
														seat.daDat
															? styles.red
															: ""
													)}
													disabled={isCheckDisable(
														seat
													)}
													onClick={() => {
														handleSelected(seat);
													}}
												>
													{seat.soGhe}
												</button>
											}
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className={styles.screen}>
				<h2>SCREEN THIS AWAY</h2>
			</div>
			<button className={styles.btn} onClick={handleConfirm}>
				Confirm Selection
			</button>
		</div>
	);
}
