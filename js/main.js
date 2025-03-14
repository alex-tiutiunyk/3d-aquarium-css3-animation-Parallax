onMove();
setInterval(() => {
  generateBubbles();
}, 500);

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
      let touch = e.touches[0];
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

let count = 0;

function generateBubbles() {
  const bubble = document.createElement('span');
  const container = document.querySelector('.layers__container');

  count++;

  // create element
  bubble.classList.add('bubble', `bubble-${count}`);
  container.appendChild(bubble);

  const newBubble = document.querySelector(`.bubble-${count}`);

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
