import { seatArr } from "../data/data";
import {
	ADD_TO_CART,
	CHANGE_FORM_NAME,
	CHANGE_QUANTITY,
	CLEAR_FORM,
	UPDATE_FORM,
} from "./constants";

let initialState = {
	listSeats: seatArr,
	cart: [],
	form: {
		name: "",
		quantity: 1,
		seats: [],
	},
};
console.log("🚀 ~ initialState:", initialState);

let seatReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_FORM_NAME: {
			const cloneForm = { ...state.form, name: action.payload };
			return { ...state, form: cloneForm };
		}
		case CHANGE_QUANTITY: {
			const cloneForm = { ...state.form, quantity: action.payload };
			return { ...state, form: cloneForm };
		}
		case UPDATE_FORM: {
			return { ...state, form: action.payload };
		}
		case CLEAR_FORM: {
			const cloneForm = {
				...state.form,
				name: "",
				seats: [],
				quantity: 1,
			};
			return { ...state, form: cloneForm };
		}
		case ADD_TO_CART: {
			const cloneCarts = [...state.cart];
			cloneCarts.push(action.payload);
			const cloneListSeats = [...state.listSeats];
			for (const seat of action.payload.seats) {
				const indexHang = cloneListSeats.findIndex((item) => {
					return item.danhSachGhe.some((e) => {
						return e.soGhe === seat;
					});
				});
				const indexGhe = cloneListSeats[
					indexHang
				].danhSachGhe.findIndex((item) => item.soGhe === seat);
				cloneListSeats[indexHang].danhSachGhe[indexGhe].daDat = true;
			}

			return { ...state, cart: cloneCarts, listSeats: cloneListSeats };
		}

		default:
			return state;
	}
};

export default seatReducer;
