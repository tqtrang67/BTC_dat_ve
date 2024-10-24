import styles from "./FillSeat.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
	CHANGE_FORM_NAME,
	CHANGE_QUANTITY,
	UPDATE_FORM,
} from "../../redux/constants";

export default function FillSeat() {
	const [errors, setErrors] = useState({
		name: "",
		quantity: "",
	});
	const form = useSelector((state) => {
		return state.seatReducer.form;
	});
	const dispatch = useDispatch();

	console.log("🚀 ~ form ~ form:", form);
	let handleChangeName = (e) => {
		dispatch({
			type: CHANGE_FORM_NAME,
			payload: e.target.value,
		});
	};
	const handleChangeQuantity = (e) => {
		dispatch({
			type: CHANGE_QUANTITY,
			payload: e.target.value * 1,
		});
	};

	const handleSelected = () => {
		const cloneError = {
			name: form.name.length > 1 ? "" : "Tên không được bỏ trống",
			quantity: form.quantity > 0 ? "" : "Số lượng ghế lớn hơn 0",
		};
		setErrors((prev) => {
			return { ...prev, ...cloneError };
		});

		const isValid = !cloneError.name && !cloneError.quantity;

		if (isValid) {
			dispatch({
				type: UPDATE_FORM,
				payload: { ...form },
			});
		}
	};

	return (
		<div>
			<h2 className={styles.title}>
				Fill the required details below and select your seats
			</h2>
			{Object.values(errors).map((error, index) => {
				return (
					<div className={styles.error} key={index}>
						{error}
					</div>
				);
			})}
			<div>
				<label className={styles.name}>Name:</label>
				<input
					className={styles.title_input}
					value={form.name}
					type="text"
					name="name"
					placeholder="name"
					onChange={handleChangeName}
				/>
				<label className={styles.name}>Number of Seats:</label>
				<input
					className={styles.title_input}
					value={form.quantity}
					type="number"
					name="name"
					placeholder="Number Of Seats"
					onChange={handleChangeQuantity}
				/>
			</div>
			<button className="mt-4" onClick={handleSelected}>
				Start Selecting
			</button>
		</div>
	);
}
