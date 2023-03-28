import React, { useState, useEffect } from "react";
import "./Controls.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { point } from "../Canvas/Canvas";
import {
  faPlusCircle,
  faMinusCircle,
  faPlusSquare,
  faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "../../firebase";
import Sidetable from "../Sidetable/Sidetable";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const Controls = (props) => {
  const [amount, setAmount] = useState(1.1);
  const [amount2, setAmount2] = useState(1.1);
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [fliped, setFliped] = useState(false);
  const [number, setNumber] = useState(1.0);
  const [number2, setNumber2] = useState(1.0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const cash = number.toFixed(2);
  const cash2 = number2.toFixed(2);
  const [username, setUsername] = useState("");
  const [multiplier, setMultiplier] = useState(1.0);
  const [multiplier2, setMultiplier2] = useState(1.0);
  const [disabled, setDisabled] = useState(false);


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
      } else setUsername("");
    });
  }, []);

  const handleSignOut = (e) => {
    e.preventDefault();
    auth.signOut();
    setUsername("");
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setNumber((prevNumber) => {
          const newNumber = prevNumber + 0.01;
          if (newNumber >= point) {
            clearInterval(intervalId);
            return point;
          }
          return newNumber;
        });
      }, 33.3);

      return () => clearInterval(intervalId);
    }, 15000);

    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const timerId2 = setTimeout(() => {
      const intervalId2 = setInterval(() => {
        setNumber2((prevNumber2) => {
          const newNumber2 = prevNumber2 + 0.01;
          if (newNumber2 >= point) {
            clearInterval(intervalId2);
            return point;
          }
          return newNumber2;
        });
      }, 33.3);

      return () => clearInterval(intervalId2);
    }, 15000);

    return () => clearTimeout(timerId2);
  }, []);

  const clicked = () => {
    if (!isClicked2) {
      setCount2(count2 + 1);
      setIsClicked2(true);
    }
    setFliped(!fliped);
    if (!fliped) {
      toast("Bet placed successfully");
    } else {
      toast("Cashout succesful");
    }
  };

  setTimeout(() => {
    setDisabled(true);
  }, 15000);


  const counts = count1 + count2;

  const handleIncrement = () => {
    setAmount((prevValue) => parseFloat((prevValue + 0.01).toFixed(2)));
  };

  const handleDecrement = () => {
    if (amount > 1.0) {
      setAmount((prevValue) => parseFloat((prevValue - 0.01).toFixed(2)));
    }
  };

  const handleIncrement2 = () => {
    setAmount2((prevValue) => parseFloat((prevValue + 0.01).toFixed(2)));
  };

  const handleDecrement2 = () => {
    if (amount2 > 1.0) {
      setAmount2((prevValue) => parseFloat((prevValue - 0.01).toFixed(2)));
    }
  };
  let result;
  let prize;
  if (multiplier === point || multiplier2 === point) {
    prize = amount * multiplier || amount2 * multiplier2;
    result = "won";
  } else {
    prize = amount * 0;
    result = "lost";
  }
  const handleValueButton = (val) => {
    setMultiplier(val);
  };
  const handleValueButton2 = (val2) => {
    setMultiplier2(val2);
  };

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleChange2 = (event) => {
    setAmount2(event.target.value);
  };

  const handleClick = () => {
    if (!isClicked) {
      setCount1(count1 + 1);
      setIsClicked(true);
    }
    setFlipped(!flipped);
    if (!flipped) {
      toast("Bet placed successfully");
    } else {
      toast("Cashout succesful");
    }
  };

  const handleToggleChange = () => {
    setToggle(!toggle);
  };

  const handleToggleChange2 = () => {
    setToggle2(!toggle2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      amount,
      multiplier,
      cash,
      amount2,
      multiplier2,
      cash2,
      point,
      result,
      prize,
    };
    console.log(data);

    try {
      const postsRef = collection(db, "posts");
      const q = query(
        postsRef,
        where("amount", "==", amount),
        // where("value2", "==", value2),
        where("point", "==", point)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const existingData = querySnapshot.docs[0];
        await updateDoc(existingData.ref, {
          cash,
          cash2,
          amount2,
          multiplier2,
        });
        console.log("Data updated successfully");
      } else {
        await addDoc(postsRef, {
          ...data,
          timestamp: serverTimestamp(),
        });
        console.log("Data saved successfully");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="cont">
        <div className="control">
          <div className="toggle-container">
            <div className="slider-container">
              <label className="slider">
                <div className="slider-label left">Off</div>
                <input
                  type="checkbox"
                  checked={toggle}
                  onChange={handleToggleChange}
                />
                <div className="slider-button" style={{ borderRadius: "15px" }}>
                  <div className="slider-button-label on">Bet</div>
                  <div className="slider-button-label off">Auto</div>
                </div>
              </label>
            </div>
            <FontAwesomeIcon
              className={show ? "minus" : "plus"}
              onClick={() => setShow(!show)}
              icon={show ? faMinusSquare : faPlusSquare}
            />
          </div>
          <div className="divide">
            <form onClick={handleSubmit}>
              <div className="betx">
                <button
                  style={{ borderRadius: "15px" }}
                  className={`flip-button ${flipped ? "flipped" : ""}`}
                  onClick={handleClick}
                  disabled={disabled}
                >
                  <div className="flip-front">Bet</div>
                  <div className="flip-back">
                    Cashout <br />
                    {cash + "x"}
                  </div>
                </button>
              </div>
              <ToastContainer className="toast" />
            </form>
            <div className="buttons">
              <div className="wrapper">
                <FontAwesomeIcon
                  onClick={handleDecrement}
                  className="inc"
                  icon={faMinusCircle}
                />

                <div className="multiplier">
                  <input
                    className="number"
                    type="text"
                    value={amount}
                    onChange={handleChange}
                  />
                </div>
                <FontAwesomeIcon
                  onClick={handleIncrement}
                  className="inc"
                  icon={faPlusCircle}
                />
              </div>

              <div className="money">
                <div className="button-container">
                  <div className="button-row">
                    <button
                      onClick={() => handleValueButton(1)}
                      className="dollar"
                    >
                      1x
                    </button>
                    <button
                      onClick={() => handleValueButton(2)}
                      className="dollar"
                    >
                      2x
                    </button>
                  </div>

                  <div className="button-row">
                    <button
                      onClick={() => handleValueButton(5)}
                      className="dollar"
                    >
                      5x
                    </button>
                    <button
                      onClick={() => handleValueButton(10)}
                      className="dollar"
                    >
                      10x
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {show && (
          <div className="control">
            <div className="toggle-container">
              <div className="slider-container">
                <label className="slider">
                  <div className="slider-label left">Off</div>
                  <input
                    type="checkbox"
                    onChange={handleToggleChange}
                    checked={toggle}
                  />
                  <div
                    className="slider-button"
                    style={{ borderRadius: "15px" }}
                  >
                    <div className="slider-button-label on">Bet</div>
                    <div className="slider-button-label off">Auto</div>
                  </div>
                </label>
              </div>
            </div>
            <div className="divide">
              <form onClick={handleSubmit}>
                <div className="betx">
                  <button
                    style={{ borderRadius: "15px" }}
                    className={`flip-button ${fliped ? "fliped" : ""}`}
                    onClick={clicked}
                    disabled={disabled}
                  >
                    <div className="flip-front">Bet</div>
                    <div className="flip-back">
                      Cashout <br />
                      {cash2 + "x"}
                    </div>
                  </button>
                </div>
                <ToastContainer className="toast" />
              </form>
              <div className="buttons">
                <div className="wrapper">
                  <FontAwesomeIcon
                    onClick={handleDecrement2}
                    className="inc"
                    icon={faMinusCircle}
                  />

                  <div className="multiplier">
                    <input
                      className="number"
                      type="text"
                      value={amount2}
                      onChange={handleChange2}
                    />
                  </div>
                  <FontAwesomeIcon
                    onClick={handleIncrement2}
                    className="inc"
                    icon={faPlusCircle}
                  />
                </div>
                <div className="money">
                  <div className="button-container">
                    <div className="button-row">
                      <button
                        onClick={() => handleValueButton2(1)}
                        className="dollar"
                      >
                        1x
                      </button>
                      <button
                        onClick={() => handleValueButton2(2)}
                        className="dollar"
                      >
                        2x
                      </button>
                    </div>

                    <div className="button-row">
                      <button
                        onClick={() => handleValueButton2(5)}
                        className="dollar"
                      >
                        5x
                      </button>
                      <button
                        onClick={() => handleValueButton2(10)}
                        className="dollar"
                      >
                        10x
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Sidetable counts={counts} />
    </>
  );
};

export default Controls;
