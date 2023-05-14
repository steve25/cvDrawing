const canvas = document.getElementById("dos");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 1;
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.font = "20px serif";
ctx.fillText("Press any key to start...", 20, 20);

let running = false;

document.addEventListener("keydown", function (e) {
  if (!running) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //run
    start();
    running = true;
  }
});

async function start() {
  let x1 = 24;
  let y1 = 80;
  let x2 = 200;
  let y2 = 350;

  //lines
  await animate(x1, y1, x1 + x2, y1, "line");
  await animate(x1 + x2, y1, x1 + x2, y1 + y2, "line");
  await animate(x1 + x2, y1 + y2, x1, y1 + y2, "line");
  await animate(x1, y1 + y2, x1, y1, "line");

  //rectangle
  await animate(x1, y1, x2, y2, "rect", 1);
  await animate(x1, y1, x2, y2, "rect", 2);
  await animate(x1, y1, x2, y2, "rect", 3);

  //windows
  await animate(x1, y1, x2, y2, "window", 1);
  await animate(x1, y1, x2, y2, "window", 2);
  await animate(x1, y1, x2, y2, "window", 3);

  //door
  await animate(x1, y1, x2, y2, "door");

  running = false;

  ctx.fillStyle = "white";
  ctx.fillText("Press any key to start again...", 20, 465);
}

function drawLine(x1, y1, x2, y2, ratio) {
  ctx.strokeStyle = "yellow";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  x2 = x1 + ratio * (x2 - x1);
  y2 = y1 + ratio * (y2 - y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawRectangle(x1, y1, x2, y2, step, ratio) {
  ctx.fillStyle = "yellow";
  ctx.beginPath();

  i = ratio * x2;

  if (step === 1) return ctx.fillRect(x1 + x2, y1, -i, y2 / 3);
  if (step === 2) return ctx.fillRect(x1, y1, i, (y2 / 3) * 2);
  if (step === 3) return ctx.fillRect(x1 + x2, y1, -i - 2, (y2 / 3) * 3);

  ctx.stroke();
}

function drawWindow(x1, y1, x2, y2, step, ratio) {
  let spacex = x2 * 0.1;
  let spacey = y2 * 0.08;
  let windowx = x2 * 0.2;
  let windowy = y2 * 0.15;

  ctx.fillStyle = "blue";
  ctx.beginPath();

  i = ratio * windowy;

  if (step === 1) {
    for (
      let q = x1 + spacex;
      q <= x1 + 2 * windowx + 3 * spacex;
      q += spacex + windowx
    ) {
      ctx.fillRect(q, y1 + spacey, windowx, i);
    }
    return;
  }
  if (step === 2) {
    for (
      let q = x1 + spacex;
      q <= x1 + 2 * windowx + 3 * spacex;
      q += spacex + windowx
    ) {
      ctx.fillRect(q, y1 + spacey * 2 + windowy, windowx, i);
    }
    return;
  }
  if (step === 3) {
    for (
      let q = x1 + spacex;
      q <= x1 + 2 * windowx + 3 * spacex;
      q += spacex + windowx
    ) {
      ctx.fillRect(q, y1 + spacey * 3 + windowy * 2, windowx, i);
    }
    return;
  }

  ctx.stroke();
}

function drawDoor(x1, y1, x2, y2, step, ratio) {
  let doorx = x2 * 0.25;
  let doory = y2 * 0.2;

  ctx.fillStyle = "brown";
  ctx.beginPath();

  i = ratio * doory;

  ctx.fillRect(x1 + x2 / 2 - doorx / 2, y1 + y2 + 1, doorx, -i);
  ctx.stroke();
}

function animate(x1, y1, x2, y2, style, step, ratio) {
  ratio = ratio || 0;

  switch (style) {
    case "line":
      drawLine(x1, y1, x2, y2, ratio);
      break;
    case "rect":
      drawRectangle(x1, y1, x2, y2, step, ratio);
      break;
    case "window":
      drawWindow(x1, y1, x2, y2, step, ratio);
      break;
    case "door":
      drawDoor(x1, y1, x2, y2, step, ratio);
      break;
  }

  return new Promise((resolve, reject) => {
    if (ratio < 1) {
      requestAnimationFrame(() => {
        animate(x1, y1, x2, y2, style, step, ratio + 0.01)
          .then(resolve)
          .catch(reject);
      });
    } else {
      resolve();
    }
  });
}
