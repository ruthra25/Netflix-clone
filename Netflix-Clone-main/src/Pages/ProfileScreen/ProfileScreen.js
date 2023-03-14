import { signOut } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Nav from "../../components/Nav/Nav";
import Plans from "../../components/Plans/Plans";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import "./ProfileScreen.css";
import axios from "../../helpers/axios";

const ProfileScreen = () => {
  const [status, setStatus] = useState("");
  const user = useSelector(selectUser);

  // function updateStatus() {

  // }

  const logout = () => {
    signOut(auth);
  };
 
  const [subs, setBook] = useState({
		
		price: 199,
	});

	const initPayment = (data) => {
		const options = {
			key: "rzp_test_TKg70Wpfr7soXq",
			amount: data.amount,
			currency: data.currency,
			handler: async (response) => {
        try {
          setStatus("SUBSCRIPTION ADDED");
					const verifyUrl = "http://localhost:8080/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

  const handlePayment = async () => {
		try {
			const orderUrl = "http://localhost:8080/api/payment/orders";
			const { data } = await axios.post(orderUrl, { amount: subs.price });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHG7RXDNemVraC50-CavzN5eUYCgzYAp9DA&usqp=CAU"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <p>Basic Plan - $199.00</p>
              <p>{status}</p>
              <Plans />
              <button onClick={handlePayment} className="buy_btn">
				       	buy now
				      </button>
              <button onClick={logout} className="profileScreen__signOut">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;