import React, { useState, useEffect } from "react";
import "./Controls.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { point } from "../Canvas/Canvas";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Controls = () => {
  const [value, setValue] = useState(1.0);
  const [value2, setValue2] = useState(1.0);
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
      }, 16.67);

      return () => clearInterval(intervalId);
    }, 5000);

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
      }, 16.67);

      return () => clearInterval(intervalId2);
    }, 5000);

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

  const handleIncrement = () => {
    setValue((prevValue) => parseFloat((prevValue + 0.01).toFixed(2)));
  };

  const handleDecrement = () => {
    if (value > 1.0) {
      setValue((prevValue) => parseFloat((prevValue - 0.01).toFixed(2)));
    }
  };

  const handleIncrement2 = () => {
    setValue2((prevValue) => parseFloat((prevValue + 0.01).toFixed(2)));
  };

  const handleDecrement2 = () => {
    if (value2 > 1.0) {
      setValue2((prevValue) => parseFloat((prevValue - 0.01).toFixed(2)));
    }
  };
  const handleValueButton = (val) => {
    setValue(val);
  };
  const handleValueButton2 = (val) => {
    setValue2(val);
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
                  onClick={handleToggleChange}
                  checked={toggle}
                />
                <div className="slider-button">
                  <div className="slider-button-label on">Bet</div>
                  <div className="slider-button-label off">Auto</div>
                </div>
              </label>
            </div>
          </div>
          <div className="divide">
            <div className="betx">
              <button
                className={`flip-button ${flipped ? "flipped" : ""}`}
                onClick={handleClick}
              >
                <div className="flip-front">Bet</div>
                <div className="flip-back">
                  Cashout <br />
                  {cash + "x"}
                </div>
              </button>
            </div>
            <div className="buttons">
              <div className="wrapper">
                <FontAwesomeIcon
                  onClick={handleIncrement}
                  className="inc"
                  icon={faPlusCircle}
                />
                <div className="multiplier">{value.toFixed(2)}</div>
                <FontAwesomeIcon
                  onClick={handleDecrement}
                  className="inc"
                  icon={faMinusCircle}
                />
              </div>
              <div className="money">
                <div className="button-container">
                  <div className="button-row">
                    <button
                      onClick={() => handleValueButton(1)}
                      className="dollar"
                    >
                      1$
                    </button>
                    <button
                      onClick={() => handleValueButton(2)}
                      className="dollar"
                    >
                      2$
                    </button>
                  </div>

                  <div class="button-row">
                    <button
                      onClick={() => handleValueButton(5)}
                      className="dollar"
                    >
                      5$
                    </button>
                    <button
                      onClick={() => handleValueButton(10)}
                      className="dollar"
                    >
                      10$
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="control">
          <div className="toggle-container">
            <div className="slider-container">
              <label className="slider">
                <div className="slider-label left">Off</div>
                <input
                  type="checkbox"
                  onClick={handleToggleChange}
                  checked={toggle}
                />
                <div className="slider-button">
                  <div className="slider-button-label on">Bet</div>
                  <div className="slider-button-label off">Auto</div>
                </div>
              </label>
            </div>
          </div>
          <div className="divide">
            <div className="betx">
              <button
                className={`flip-button ${fliped ? "fliped" : ""}`}
                onClick={clicked}
              >
                <div className="flip-front">Bet</div>
                <div className="flip-back">
                  Cashout <br />
                  {cash2 + "x"}
                </div>
              </button>
            </div>
            <div className="buttons">
              <div className="wrapper">
                <FontAwesomeIcon
                  onClick={handleIncrement2}
                  className="inc"
                  icon={faPlusCircle}
                />
                <div className="multiplier">{value2.toFixed(2)}</div>
                <FontAwesomeIcon
                  onClick={handleDecrement2}
                  className="inc"
                  icon={faMinusCircle}
                />
              </div>
              <div className="money">
                <div class="button-container">
                  <div class="button-row">
                    <button
                      onClick={() => handleValueButton2(1)}
                      class="dollar"
                    >
                      1$
                    </button>
                    <button
                      onClick={() => handleValueButton2(2)}
                      class="dollar"
                    >
                      2$
                    </button>
                  </div>

                  <div class="button-row">
                    <button
                      onClick={() => handleValueButton2(5)}
                      className="dollar"
                    >
                      5$
                    </button>
                    <button
                      onClick={() => handleValueButton2(10)}
                      class="dollar"
                    >
                      10$
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Controls;
