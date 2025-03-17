onMove();
setInterval(() => {
  generateBubbles();
}, 500);
setInterval(() => {
  generateFish();
}, 1500);

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function onMove() {
  let event = '';
  const isTouchSupported =
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

  isTouchSupported ? (event = 'touchmove') : (event = 'mousemove');

  document.addEventListener(event, (e) => {
    let clientEvent = e;

    if (isTouchSupported) {
      const touch = e.touches[0];
      clientEvent = touch;
    }

    Object.assign(document.documentElement, {
      style: `
        --move-x: ${((clientEvent.clientX - window.innerWidth / 2) * -0.007).toFixed(1)}deg;
        --move-y: ${((clientEvent.clientY - window.innerHeight / 2) * 0.015).toFixed(1)}deg;
      `,
    });
  });
}

let countBubbles = 0;

function generateBubbles() {
  const bubble = document.createElement('span');
  const container = document.querySelector('.layers__container');

  countBubbles++;

  // create element
  bubble.classList.add('bubble', `bubble-${countBubbles}`);
  container.appendChild(bubble);

  const newBubble = document.querySelector(`.bubble-${countBubbles}`);

  // add animation
  const x = randomIntFromInterval(0, 100);
  const size = Number((randomIntFromInterval(0, 50) * 0.01).toFixed(2));
  const time = randomIntFromInterval(5000, 20000);

  if (size > 0.4) {
    newBubble.animate(
      [
        { transform: `translate(${x}vw, 10vh) translateZ(150px) scale(${size})` },
        { transform: `translate(${x}vw, -110vh) translateZ(150px) scale(${size + 0.3})` },
      ],
      {
        duration: time,
      },
    );
  } else {
    newBubble.animate(
      [
        { transform: `translate(${x}vw, 10vh) scale(${size})` },
        { transform: `translate(${x}vw, -110vh) scale(${size + 0.3})` },
      ],
      {
        duration: time,
      },
    );
  }

  // remove element
  newBubble.getAnimations()[0].finished.then(() => newBubble.remove());
}

let countFishes = 0;

function generateFish() {
  const fish = document.createElement('div');
  const container = document.querySelector('.layers__container');

  const fishType = randomIntFromInterval(1, 6);
  const direction = randomIntFromInterval(0, 1);
  const yStart = randomIntFromInterval(10, 90);
  const yFinish = randomIntFromInterval(10, 90);
  const z = randomIntFromInterval(10, 120);
  const size = Number((randomIntFromInterval(10, 90) * 0.01).toFixed(2));
  const time = randomIntFromInterval(5000, 30000);

  countFishes++;

  // create element
  fish.classList.add('fish', `fish-${fishType}`, `fish-count-${countFishes}`);
  container.appendChild(fish);

  const newFish = document.querySelector(`.fish-count-${countFishes}`);

  if (direction === 0) {
    newFish.animate(
      [
        { transform: `translate(-10vw, ${yStart}vh) translateZ(${z}px) scale(${size})` },
        { transform: `translate(110vw, ${yFinish}vh) translateZ(${z}px) scale(${size + 0.3})` },
      ],
      {
        duration: time,
      },
    );
  } else {
    newFish.animate(
      [
        {
          transform: `translate(110vw, ${yStart}vh) translateZ(50px) scale(${size}) rotateY(180deg)`,
        },
        {
          transform: `translate(-10vw, ${yFinish}vh) translateZ(50px) scale(${
            size + 0.3
          }) rotateY(180deg)`,
        },
      ],
      {
        duration: time,
      },
    );
  }

  // remove element
  newFish.getAnimations()[0].finished.then(() => newFish.remove());
}
