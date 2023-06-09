import React, { useState, useEffect } from "react";
import "./Controls.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  { point } from "../Canvas/Canvas";
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
  const [amount, setAmount] = useState(10);
  const [amount2, setAmount2] = useState(10);
  const [totalbets, setTotalbets] = useState(0);
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
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [intervalId2, setIntervalId2] = useState(null);
  const [isTimerRunning2, setIsTimerRunning2] = useState(true);
  const [flipTime, setFlipTime] = useState(Date.now());
  const [flipTime2, setFlipTime2] = useState(Date.now());
  const [data, setData] = useState([]);


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
    let intervalId;
    const timerId = setTimeout(() => {
      if (isTimerRunning) {
        intervalId = setInterval(() => {
          setNumber((prevNumber) => {
            const newNumber = prevNumber + 0.01;
            return newNumber;
          });
        }, 50);
        setIntervalId(intervalId);
      }
    }, 15000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timerId);
    };
  }, [point, isTimerRunning]);


  useEffect(() => {
    let intervalId2;
    const timerId2 = setTimeout(() => {
      if (isTimerRunning2) {
        intervalId2 = setInterval(() => {
          setNumber2((prevNumber2) => {
            const newNumber2 = prevNumber2 + 0.01;
            return newNumber2;
          });
        }, 50);
        setIntervalId2(intervalId2);
      }
    }, 15000);

    return () => {
      clearInterval(intervalId2);
      clearTimeout(timerId2);
    };
  }, [point, isTimerRunning2]);



  const handleClick = () => {
    if (disabled) {
      setFlipped(!flipped);
      const remainingTime = 15000 - Math.max(Date.now() - flipTime, 0);
      const adjustedTime = Math.max(
        remainingTime -
          (flipTime !== null ? Math.max(Date.now() - flipTime - 15000, 0) : 0),
        0
      );
      toast(flipped ? "Bet placed successfully" : "Cashout successfull");
      return;
    }

    if (!flipped && count1 === 0 && flipTime !== null) {
      // check if flipTime is not null
      if (!isClicked) {
        setCount1(count1 + 1);
        setIsClicked(true);
      }
      setFlipped(true);
      toast(`Bet placed ${amount}$`);
    } else if (flipped && count1 > 0 && flipTime !== null) {
      const elapsed = Date.now() - flipTime;
      const remainingTime = 15000 - elapsed;
      if (elapsed < 15000) {
        toast(`Cashout available after ${Math.ceil(remainingTime / 1000)}`);
      } else {
        setFlipped(false);
        setFlipTime(Date.now()); // set flipTime to current time
        toast(`You have won ${prize}`);
        setIsTimerRunning(false);
        clearInterval(intervalId);
      }
    }
  };
  const clicked = () => {
    if (disabled2) {
      setFliped(!fliped);
      const remainingTime2 = 15000 - Math.max(Date.now() - flipTime2, 0);
      const adjustedTime2 = Math.max(
        remainingTime2 -
          (flipTime2 !== null
            ? Math.max(Date.now() - flipTime2 - 15000, 0)
            : 0),
        0
      );
      toast(fliped ? "Bet placed successfully" : "Cashout successfull");
      return;
    }
    if (!fliped && count2 === 0 && flipTime2 !== null) {
      // check if flipTime is not null
      if (!isClicked2) {
        setCount2(count2 + 1);
        setIsClicked2(true);
      }
      setFliped(true);
      toast(`Bet placed ${amount2}$`);
    } else if (fliped && count2 > 0 && flipTime2 !== null) {
      const elapsed = Date.now() - flipTime2;
      const remainingTime2 = 15000 - elapsed;
      if (elapsed < 15000) {
        toast(`Cashout available after ${Math.ceil(remainingTime2 / 1000)}`);
      } else {
        setFliped(false);
        setFlipTime2(Date.now()); // set flipTime to current time
        toast(`You have won ${prize}`);
        setIsTimerRunning2(false);
        clearInterval(intervalId2);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (!flipped) {
      timer = setTimeout(() => {
        setDisabled(true);
      }, 15000);
    }
    return () => clearTimeout(timer);
  }, [flipped]);

  useEffect(() => {
    let timer2;
    if (!fliped) {
      timer2 = setTimeout(() => {
        setDisabled2(true);
      }, 15000);
    }
    return () => clearTimeout(timer2);
  }, [fliped]);

  const handleIncrement = () => {
    setAmount((prevValue) => parseFloat((prevValue + 5).toFixed(2)));
  };

  const handleDecrement = () => {
    if (amount > 1.0) {
      setAmount((prevValue) => parseFloat((prevValue - 5).toFixed(2)));
    }
  };

  const handleIncrement2 = () => {
    setAmount2((prevValue) => parseFloat((prevValue + 5).toFixed(2)));
  };

  const handleDecrement2 = () => {
    if (amount2 > 1.0) {
      setAmount2((prevValue) => parseFloat((prevValue - 5).toFixed(2)));
    }
  };

  let prize;
  let result;
  const previousPrize = localStorage.getItem("prize");
  if (previousPrize) {
    prize = parseFloat(previousPrize);
  }

  localStorage.setItem("prize", prize);


  if (cash > point) {
    result = "loss";
    prize = 0;
  }
  if (cash > 1.00 && cash2 > 1.00 && cash <= point && cash2 <= point) {
    prize = cash * amount + cash2 * amount2;
    result = "wonboth";
  }
  if (cash <= point && cash > 1.00 && cash2 > point) {
    prize = cash * amount;
    result = "woncash1";
  }
  if (cash > point && cash2 <= point) {
    prize = cash2 * amount2;
    result = "won";
  }
  if (cash < point) {
    prize = cash * amount;
    result = "wincash1";
  }
  prize = prize.toFixed(1) + "$";


  const handleValueButton = (value) => {
    setAmount((prevValue) => {
      const currentValue = parseFloat(prevValue);
      const newValue = parseFloat((currentValue + value).toFixed(2));
      return newValue.toString();
    });
  };

  const handleValueButton2 = (value2) => {
    setAmount2((prevValue2) => {
      const currentValue = parseFloat(prevValue2);
      const newValue = parseFloat((currentValue + value2).toFixed(2));
      return newValue.toString();
    });
  };

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleChange2 = (event) => {
    setAmount2(event.target.value);
  };

  const handleToggleChange = () => {
    setToggle(!toggle);
  };

  const handleToggleChange2 = () => {
    setToggle2(!toggle2);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     username,
  //     amount,
  //     cash,
  //     amount2,
  //     cash2,
  //     point,
  //     result,
  //     prize,
  //     totalbets,
  //   };
  //   console.log(data);

  //   try {
  //     const postsRef = collection(db, "posts");
  //     const q = query(
  //       postsRef,
  //       // where("amount", "==", amount),
  //       where("point", "==", point)
  //     );
  //     const querySnapshot = await getDocs(q);

  //     if (querySnapshot.docs.length > 0) {
  //       const existingData = querySnapshot.docs[0];
  //       await updateDoc(existingData.ref, {
  //         cash,
  //         cash2,
  //         amount2,
  //         prize,
  //         result,
  //       });
  //       console.log("Data updated successfully");
  //     } else {
  //       await addDoc(postsRef, {
  //         ...data,
  //         timestamp: serverTimestamp(),
  //       });
  //       console.log("Data saved successfully");
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      username,
      amount,
      cash,
      amount2,
      cash2,
      point,
      result,
      prize,
      totalbets,
    };
    console.log(postData);

    try {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("point", "==", point));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const existingData = querySnapshot.docs[0];
        await updateDoc(existingData.ref, {
          cash,
          cash2,
          amount2,
          prize,
          result,
        });
        console.log("Data updated successfully");

        // Update the state locally with the new data
        setData([...data, postData]);
      } else {
        await addDoc(postsRef, {
          ...postData,
          timestamp: serverTimestamp(),
        });
        console.log("Data saved successfully");

        // Update the state locally with the new data
        setData([...data, { ...postData, timestamp: serverTimestamp() }]);
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
              <span className="stake">STAKE SELECTOR</span>
            </div>
            <FontAwesomeIcon
              className={show ? "minus" : "plus"}
              onClick={() => setShow(!show)}
              icon={show ? faMinusSquare : faPlusSquare}
            />
          </div>
          <div className="divide">
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
              <div className="button-container">
                <div className="button-row">
                  <button
                    onClick={() => handleValueButton(10)}
                    className="dollar"
                  >
                    10$
                  </button>
                  <button
                    onClick={() => handleValueButton(20)}
                    className="dollar"
                  >
                    20$
                  </button>
                </div>

                <div className="button-row">
                  <button
                    onClick={() => handleValueButton(50)}
                    className="dollar"
                  >
                    50$
                  </button>
                  <button
                    onClick={() => handleValueButton(100)}
                    className="dollar"
                  >
                    100$
                  </button>
                </div>
              </div>
            </div>
            <form onClick={handleSubmit}>
              <div className="betx">
                <button
                  style={{ borderRadius: "15px" }}
                  className={`flip-button ${flipped ? "flipped" : ""}`}
                  onClick={handleClick}
                  disabled={disabled}
                >
                  <div style={{ borderRadius: "15px" }} className="flip-front">
                    PLACE A BET
                  </div>
                  <div className="flip-back">
                    TAKE WINNINGS <br />
                    {cash + "x"}
                  </div>
                </button>
              </div>
              <ToastContainer
                autoClose={1000}
                position={toast.POSITION.TOP_LEFT}
                className="toast"
              />
            </form>
          </div>
        </div>
        {show && (
          <div className="control">
            <div className="toggle-container">
              <div className="slider-container">
                <span className="stake">STAKE SELECTOR</span>
              </div>
            </div>
            <div className="divide">
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
                        onClick={() => handleValueButton2(10)}
                        className="dollar"
                      >
                        10$
                      </button>
                      <button
                        onClick={() => handleValueButton2(20)}
                        className="dollar"
                      >
                        20$
                      </button>
                    </div>

                    <div className="button-row">
                      <button
                        onClick={() => handleValueButton2(50)}
                        className="dollar"
                      >
                        50$
                      </button>
                      <button
                        onClick={() => handleValueButton2(100)}
                        className="dollar"
                      >
                        100$
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <form onClick={handleSubmit}>
                <div className="betx">
                  <button
                    style={{ borderRadius: "15px" }}
                    className={`flip-button ${fliped ? "fliped" : ""}`}
                    onClick={clicked}
                    disabled={disabled2}
                  >
                    <div className="flip-front">PLACE A BET</div>
                    <div className="flip-back">
                      TAKE WINNINGS <br />
                      {cash2 + "x"}
                    </div>
                  </button>
                </div>
                <ToastContainer
                  autoClose={1000}
                  position={toast.POSITION.TOP_LEFT}
                  className="toast"
                />
              </form>
            </div>
          </div>
        )}
      </div>
      <Sidetable totalbets={totalbets} />
    </>
  );
};

export default Controls;
