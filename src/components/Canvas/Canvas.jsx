import React, { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import "@pixi/gif";
import { Assets } from "pixi.js";
import { gsap } from "gsap";
import "./Canvas.css";
import gifImage from "../gifImage.gif";
import "react-toastify/dist/ReactToastify.css";

const Canvas = () => {
  const appRef = useRef(null);
  const [number, setNumber] = useState(1.0);

  useEffect(() => {
    let intervalId;
    const timerId = setTimeout(() => {
      intervalId = setInterval(() => {
        setNumber((prevNumber) => {
          const newNumber = prevNumber + 0.01;
          return newNumber;
        });
      }, 33.3);
    }, 15000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    const app = new PIXI.Application({
      width: 850,
      height: 400,
      backgroundColor: 0x0e0e0e,
    });
    appRef.current = app;
    document.body.appendChild(app.view);

    const rect = new PIXI.Graphics();

    rect.beginFill(0x000000);
    rect.lineStyle(1, 0x00ced1);

    const width = 250;
    const height = 10;
    const rad = 10;

    rect.drawRoundedRect(0, 0, width, height, rad);

    rect.endFill();
    rect.x = app.screen.width / 2 - rect.width / 2;
    rect.y = app.screen.height / 2 - rect.height / 2;

    app.stage.addChild(rect);

    let start = new PIXI.Text("STARTING IN 15:00", {
      fontFamily: "Times New Roman",
      fontSize: 45,
      fill: 0xffffff,
      align: "center",
    });

    app.stage.addChild(start);
    start.position.set(app.screen.width / 3.7, app.screen.height / 1.9);

    let remainingSeconds = 150; // 15 minutes * 60 seconds
    let minutes, seconds;
    let requestID;

    function update(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const timeRemaining = Math.max(
        remainingSeconds - Math.floor(elapsedTime / 100),
        0
      );

      minutes = Math.floor(timeRemaining / 60);
      seconds = timeRemaining % 60;
      const timeString = `STARTING IN ${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      start.text = timeString;

      if (timeRemaining > 0) {
        requestID = requestAnimationFrame(update);
      } else {
        // Remove timer from screen when it ends
        app.stage.removeChild(start);
        app.stage.removeChild(rect);
        app.stage.removeChild(circle);
        app.stage.removeChild(loader);
        app.stage.removeChild(loaderContainer);
        app.stage.removeChild(loadingText);
        xline.visible = true;
        yline.visible = true;
        ui.visible = true;
        uiy.visible = true;
        num.visible = true;
      }
    }

    function startTimer() {
      requestID = requestAnimationFrame(update);
    }

    function stopTimer() {
      cancelAnimationFrame(requestID);
    }

    // Pause timer when page visibility changes
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        stopTimer();
      } else {
        startTimer();
      }
    });

    // Start timer initially
    let startTime;
    startTimer();

    const fun = new PIXI.Graphics();

    fun.beginFill(0xffa500);
    fun.drawRoundedRect(0, 0, 850, 30, 0);
    fun.endFill();
    const mode = new PIXI.Text("FUN MODE", {
      fill: 0xffffff,
      fontSize: 15,
      fontWeight: "bold",
    });
    mode.anchor.set(0.5);
    mode.position.set(fun.width / 2, fun.height / 2);

    fun.addChild(mode);

    app.stage.addChild(fun);

    const circle = new PIXI.Graphics();
    circle.beginFill(0x00ced1);
    circle.drawCircle(0, 0, 3);
    circle.endFill();
    circle.x = rect.x + rect.width / 2;
    circle.y = rect.y + rect.height / 2.12;
    app.stage.addChild(circle);

    let direction = 1;
    const speed = 2;

    app.ticker.add(() => {
      circle.x += speed * direction;

      // Check if the circle has hit the edge of the rectangle
      if (circle.x + circle.width / 2 > rect.x + rect.width) {
        circle.x = rect.x + rect.width - circle.width / 2;
        direction = -1;
      } else if (circle.x - circle.width / 2 < rect.x) {
        circle.x = rect.x + circle.width / 2;
        direction = 1;
      }
    });

    const loadingText = new PIXI.Text("Loading...", {
      fontFamily: "Arial",
      fontSize: 16,
      fill: 0xffffff,
      align: "center",
    });

    loadingText.x = app.screen.width / 2.17;
    loadingText.y = app.screen.height / 3.4;
    app.stage.addChild(loadingText);

    const loaderContainer = new PIXI.Container();
    loaderContainer.position.set(app.screen.width / 2, app.screen.height / 3.2);
    app.stage.addChild(loaderContainer);

    const loader = new PIXI.Graphics();
    loader.lineStyle(4, 0x00ced1);
    loader.drawRect(-40, -40, 80, 80);
    loaderContainer.addChild(loader);

    app.ticker.add((delta) => {
      loader.rotation += 0.1 * delta;
    });

    let num = new PIXI.Text("1.00x", {
      fontFamily: "Arial",
      fontSize: 50,
      fill: 0x00ced1,
    });
    num.anchor.set(0.5);
    num.position.set(110, 55);
    app.stage.addChild(num);
    num.visible = false;

    async function animatePlane() {
      let image = await Assets.load(gifImage);
      console.log("Loaded image:", image); // add this line to check if the image is loaded
      app.stage.addChild(image);
      image.width = 90;
      image.height = 90;
      image.x = 25;
      image.y = 280;

      let value = 1;
      let intervalId;

      let curve = new PIXI.Graphics();
      curve.lineStyle(2, 0x0e0e0e);
      curve.moveTo(0, 0);
      curve.bezierCurveTo(0, 0, 0, 0, 0, 0);
      app.stage.addChild(curve);

      let area = new PIXI.Graphics();
      area.beginFill(0x0e0e0e);
      area.moveTo(0, 270);
      area.quadraticCurveTo(0, 220, 5, image.y - 55);
      area.lineTo(image.x, 100);
      area.lineTo(0, 220);
      area.lineTo(0, 220);
      area.endFill();
      app.stage.addChild(area);
      let startTime = performance.now();

      let xVel = 1.9;
      let angle = 0;
      let amplitude = 85;
      let frequency = 0.0089;

      function startAnimation(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime > 15000) {
          app.ticker.add(update);
        } else {
          requestAnimationFrame(startAnimation);
        }
      }

      function update() {
        image.x += xVel;
        image.y = 195 + Math.cos(angle) * amplitude;
        angle += frequency;

        if (value < point) {
          if (image.x > 700) {
            // If plane is already behind 700 units of x, do not update its x-coordinate
            image.x -= xVel;
          }
          image.y = 195 + Math.cos(angle) * amplitude;
          uiy.y += 0;
          ui.x -= 0;
        } else if (value >= point) {
          image.x += 2;
          image.y += 1;
          uiy.y = 0;
          ui.x = 0;
          angle += frequency;
          gsap.to([curve, area], { alpha: 0, delay: 0 });
          setTimeout(() => {
            let txt2 = new PIXI.Text("PLANE FLEW AWAY", {
              fontFamily: "Arial",
              fontSize: 30,
              fill: 0x00ced1,
              align: "center",
            });

            txt2.anchor.set(0.5);
            app.stage.addChild(txt2);
            txt2.position.set(app.screen.width / 2, app.screen.height / 2);
            gsap.to(txt2, { alpha: 0, delay: 1 });

            setTimeout(() => {
              resetGame();
            }, 1500);
          }, 2500);
        }
        if (image.x >= 400) {
          uiy.y += 0.7;
          ui.x -= 0.7;
        }
        curve.clear();
        curve.lineStyle(5, 0x00ced1);
        curve.moveTo(25, 369);
        curve.bezierCurveTo(
          50,
          370,
          image.x,
          image.y + 85,
          image.x,
          image.y + 85
        );
        area.clear();
        area.beginFill(0x009092);
        area.moveTo(25, 370);
        area.quadraticCurveTo(50, 370, image.x, image.y + 85);
        area.lineTo(image.x, 370);
        area.lineTo(25, 370);
        area.lineTo(25, 370);
        area.endFill();
      }

      function startTimer() {
        // start the timer after 6 seconds
        const timerId = setTimeout(() => {
          intervalId = setInterval(() => {
            value += 0.01;
            num.text = value.toFixed(2) + "x";

            if (value >= point) {
              clearInterval(intervalId);
            }
          }, 50);
        }, 14800);

        return () => {
          clearTimeout(timerId);
          clearInterval(intervalId);
        };
      }

      // start the timer
      const cleanup = startTimer();

      requestAnimationFrame(startAnimation);
    }
    function resetGame() {
      // reload the page to restart the game
      window.location.reload();
    }

    animatePlane();

    const xline = new PIXI.Graphics();
    app.stage.addChild(xline);
    xline.lineStyle(1, 0xffffff).moveTo(850, 370).lineTo(24, 370);
    xline.visible = false;

    const yline = new PIXI.Graphics();
    app.stage.addChild(yline);
    yline.lineStyle(1, 0xffffff).moveTo(25, 370).lineTo(25, 0);
    yline.visible = false;

    var graphics = new PIXI.Graphics().lineStyle(2, 0xffffff, 1);

    app.stage.addChild(graphics);

    var ui = new PIXI.Graphics();

    ui.beginFill(0xffffff);
    for (var i = 0; i < 50000; i++) {
      var x = i * 90 + 42;
      var y = 385;
      var d = 2;
      ui.drawCircle(x, y, d);
      app.stage.addChild(ui);
    }
    ui.visible = false;

    var uiy = new PIXI.Graphics();

    uiy.beginFill(0x00ffff);
    for (var i = 50000; i > 1; i--) {
      var x = 10;
      var y = i * 50 - 5850;
      var radius = 2;
      uiy.drawCircle(x, y, radius);
      app.stage.addChild(uiy);
    }
    uiy.visible = false;
    return () => {
      app.destroy(true);
    };
  }, []);

  return <div ref={appRef} />;
};

export default Canvas;
function hashValue(length) {
  const availableChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let hashValue = "";
  for (let i = 0; i < length; i++) {
    hashValue +=
      availableChars[Math.floor(Math.random() * availableChars.length)];
  }
  return hashValue;
}

function getCrashPoint() {
  const e = 2 ** 32;
  const h = crypto.getRandomValues(new Uint32Array(1))[0];
  return Math.floor((100 * e - h) / (e - h)) / 100;
}
const point = getCrashPoint();
console.log(point);
const main = point + 0.02;
export { point, main };