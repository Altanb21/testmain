import React, { useState, useEffect } from "react";
import "./Controls.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { point } from "../Canvas/Canvas";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Controls = () => {
  const [toggle, setToggle] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [number, setNumber] = useState(1.0);
  const [count1, setCount1] = useState(0);
  const cash = number.toFixed(2);

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
    }, 6000);

    return () => clearTimeout(timerId);
  }, []);

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
              Cashout
              <br />
              {cash + "x"}
            </div>
          </button>
        </div>
        <div className="buttons">
          <div className="wrapper">
          <FontAwesomeIcon className="inc" icon={faPlusCircle} />
            <div className="multiplier">1.00</div>
            <FontAwesomeIcon className="inc" icon={faMinusCircle} />
          </div>
          <div className="money">
            <div class="button-container">
              <div class="button-row">
                <button class="dollar">1$</button>
                <button class="dollar">2$</button>
              </div>

              <div class="button-row">
                <button class="dollar">5$</button>
                <button class="dollar">10$</button>
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
            className={`flip-button ${flipped ? "flipped" : ""}`}
            onClick={handleClick}
          >
            <div className="flip-front">Bet</div>
            <div className="flip-back">
              Cashout
              <br />
              {cash + "x"}
            </div>
          </button>
        </div>
        <div className="buttons">
        <div className="wrapper">
          <FontAwesomeIcon className="inc" icon={faPlusCircle} />
            <div className="multiplier">1.00</div>
            <FontAwesomeIcon className="inc" icon={faMinusCircle} />
          </div>
          <div className="money">
            <div class="button-container">
              <div class="button-row">
                <button class="dollar">1$</button>
                <button class="dollar">2$</button>
              </div>

              <div class="button-row">
                <button class="dollar">5$</button>
                <button class="dollar">10$</button>
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
