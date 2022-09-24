import "./newletter.css";
import axios from "axios";
import { useState } from "react";

const NewsLetter = ({ modalState }) => {
  const [formData, setFormData] = useState({
    fullName: undefined,
    email: undefined,
    city: undefined,
    contact: undefined,
  });

  // const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/userDetails", formData);
      modalState(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <h2>Subscribe For Offers & Discounts</h2>
        <div className="inputWrapper">
          <div className="inputContainer">
            <label htmlFor="fullName"> Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              name="fullName"
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="email"> Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              id="email"
              name="email"
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="city"> City</label>
            <input
              type="text"
              placeholder="City"
              id="city"
              name="city"
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="contact">Phone Number</label>
            <input
              type="text"
              placeholder="Contact No"
              id="contact"
              name="contact"
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <div className="buttonDiv">
            <button onClick={handleClick} className="rButton">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewsLetter;
