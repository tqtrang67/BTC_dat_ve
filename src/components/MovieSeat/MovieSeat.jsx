import ConfirmSeat from "../ConfirmSeat/ConfirmSeat";
import FillSeat from "../FillSeat/FillSeat";
import SelectSeat from "../SelectSeat/SelectSeat";
import styles from "./MovieSeat.module.css";
export default function MovieSeat() {
	return (
		<div>
			<div className={styles.movie_seat}>
				<FillSeat />
				<SelectSeat />
				<ConfirmSeat />
			</div>
		</div>
	);
}
