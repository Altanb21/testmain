import React, { useEffect, useRef, useMemo } from "react";
import * as PIXI from "pixi.js";
import "@pixi/gif";
import { Assets } from "pixi.js";
import { gsap } from "gsap";
import "./Canvas.css";
import gifImage from "../gifImage.gif";

const Canvas = () => {
  const appRef = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: 850,
      height: 400,
      backgroundColor: 0x0e0e0e,
    });
    appRef.current = app;
    document.body.appendChild(app.view);

    const blackRect = new PIXI.Graphics();
    blackRect.beginFill(0x00000);
    blackRect.drawRoundedRect(0, 0, 250, 6, 3);
    blackRect.endFill();
    blackRect.position.set(
      app.screen.width / 2 - blackRect.width / 2,
      app.screen.height / 2 - blackRect.height / 2
    );
    app.stage.addChild(blackRect);
    const rect = new PIXI.Graphics();
    rect.beginFill(0x00ced1);
    rect.drawRoundedRect(0, 0, 250, 6, 3);
    rect.endFill();

    rect.position.set(
      app.screen.width / 2 - rect.width / 2,
      app.screen.height / 2 - rect.height / 2
    );
    rect.scale.x = 0;

    app.stage.addChild(rect);

    const dur = 9000;
    const endScale = 1;
    const fps = 60;
    const frames = (dur / 1000) * fps;
    let currentFrame = 0;
    let currentScale = 0;

    const animationInterval = setInterval(() => {
      currentFrame++;
      if (currentFrame <= frames) {
        currentScale = endScale - (endScale / frames) * currentFrame;
        rect.scale.x = currentScale;
      } else {
        clearInterval(animationInterval);
      }
    }, 9);

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

    // Animate the loader
    app.ticker.add((delta) => {
      loader.rotation += 0.1 * delta;
    });
    gsap.to([loaderContainer, loadingText, rect, blackRect], {
      duration: 0,
      delay: 5.5,
      alpha: 0,
    });

    async function animatePlane() {
      let image = await Assets.load(gifImage);
      console.log("Loaded image:", image); // add this line to check if the image is loaded
      app.stage.addChild(image);
      image.width = 90;
      image.height = 90;
      image.x = 25;
      image.y = 280;

      let curve = new PIXI.Graphics();
      curve.lineStyle(2, 0x0e0e0e);
      curve.moveTo(0, 0);
      curve.bezierCurveTo(10, 0, 11, 10, 13, 11);
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

      let num = new PIXI.Text("1.00x", {
        fontFamily: "Arial",
        fontSize: 50,
        fill: 0x00ced1,
      });
      num.anchor.set(0.5);
      num.position.set(110, 50);
      app.stage.addChild(num);
      let value = 1;

      let xVel = 1.9;
      let angle = 0;
      let amplitude = 85;
      let frequency = 0.0099;

      function update() {
        image.x += xVel;
        image.y = 195 + Math.cos(angle) * amplitude;
        angle += frequency;

        if (value <= point && image.x >= 700) {
          image.x -= xVel;
          image.y = 195 + Math.cos(angle) * amplitude;
          uiy.y += 0.7;
          ui.x -= 0.7;
        } else if (value >= point) {
          image.x += 2;
          image.y += 1;
          angle += frequency;
          gsap.to([curve, area], { alpha: 0, delay: 0 });
          // setTimeout(() => {
          //   let txt2 = new PIXI.Text("PLANE FLEW AWAY", {
          //     fontFamily: "Arial",
          //     fontSize: 30,
          //     fill: 0x00ced1,
          //     align: "center",
          //   });

          //   txt2.anchor.set(0.5);
          //   app.stage.addChild(txt2);
          //   txt2.position.set(app.screen.width / 2, app.screen.height / 2);
          //   //resetGame();
          // }, 2500);
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
            }, 5000);
          }, 2500);
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

      setTimeout(() => {
        let intervalId = setInterval(() => {
          value += 0.01; // increment the timer by 0.01
          num.text = value.toFixed(2) + "x"; // update the text with the new timer value

          if (value >= point) {
            clearInterval(intervalId); // stop the interval when time reaches 1.09
          }
        }, 33.3);
        app.ticker.add(() => {
          update();
        });
      }, 6000);
      num.alpha = 0;
      gsap.to(num, { duration: 0, alpha: 1, delay: 5 });
    }
    function resetGame() {
      // reload the page to restart the game
      window.location.reload();
    }

    animatePlane();

    const xline = new PIXI.Graphics();
    app.stage.addChild(xline);
    xline.lineStyle(1, 0xffffff).moveTo(850, 370).lineTo(24, 370);
    xline.alpha = 0;
    gsap.to(xline, { duration: 0, alpha: 1, delay: 5 });

    const yline = new PIXI.Graphics();
    app.stage.addChild(yline);
    yline.lineStyle(1, 0xffffff).moveTo(25, 370).lineTo(25, 0);
    yline.alpha = 0;
    gsap.to(yline, { duration: 0, alpha: 1, delay: 5 });

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
    ui.alpha = 0;
    gsap.to(ui, { duration: 0, alpha: 1, delay: 5 });

    var uiy = new PIXI.Graphics();

    uiy.beginFill(0x00ffff);
    for (var i = 50000; i > 1; i--) {
      var x = 10;
      var y = i * 50 - 5850;
      var radius = 2;
      uiy.drawCircle(x, y, radius);
      app.stage.addChild(uiy);
    }
    uiy.alpha = 0;
    gsap.to(uiy, { duration: 0, alpha: 1, delay: 5 });
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
