<<<<<<< HEAD
import { Wisp } from './Wisp.js';
import { playClickSound, playBackgroundMusic } from "./audioHandler.js";
import { money, updateMoney } from './data.js';
import { initPenClickListener } from './Ui.js';

let loopCount = 0;
let wispCost = 0.1;

export let wisps = [
    new Wisp(0, 0),
    new Wisp(0, 0)
];

export function loop(wisp) {
    if (wisp.checkDead() || !wisp.isRendered) return;

    if (wisp.isWorking || wisp.isPet) {
        requestAnimationFrame(() => loop(wisp));
        return;
    }

    if (!wisp.isMoving && !wisp.waitingForNewPos) {
        if (Math.random() >= 0.75) {
            wisp.isWorking = true;
            wisp.work().then(() => {
                wisp.isWorking = false;
                requestAnimationFrame(() => loop(wisp));
            });
            return;
        }

        wisp.waitingForNewPos = true;
        wisp.htmlImage.src = wisp.image.idle;

        setTimeout(() => {
            if (!wisp.alive || !wisp.isRendered) return;
            wisp.generateNewPos();
            wisp.waitingForNewPos = false;
        }, 1000 + Math.random() * 1500);
    }

    wisp.move();
    loopCount++;
    requestAnimationFrame(() => loop(wisp));
}

export function init() {
    wisps.forEach((currentWisp) => {
        if (currentWisp.checkDead()) {
            if (currentWisp.aliveLoop) clearInterval(currentWisp.aliveLoop);
            currentWisp.aliveLoop = null;
            return;
        }

        if (currentWisp.isRendered) return;

        currentWisp.init();
        loop(currentWisp);

        currentWisp.aliveLoop = setInterval(() => {
            currentWisp.decrease();
            if (currentWisp.checkDead()) {
                clearInterval(currentWisp.aliveLoop);
                currentWisp.aliveLoop = null;
            }
        }, 4000);
    });
}

function buyWisp() {
    playClickSound()
    if (money < wispCost) return;

    wisps.push(new Wisp(0, 0));
    updateMoney(-wispCost);

    wispCost *= 2;
    document.getElementById("editBuyAWisp").textContent = `Buy a Wisp $${wispCost}`;
    init();
}

init();
initPenClickListener();

document.getElementById("buyAWisp").addEventListener('click', buyWisp);

document.addEventListener('keydown', (event) => {
    if (event.key === "a") {
        wisps.push(new Wisp(0, 0));
        init();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    playBackgroundMusic()
=======
import { Wisp } from './Wisp.js';
import { playClickSound, playBackgroundMusic } from "./audioHandler.js";
import { money, updateMoney } from './data.js';
import { initPenClickListener } from './Ui.js';

let loopCount = 0;
let wispCost = 0.1;

export let wisps = [
    new Wisp(0, 0),
    new Wisp(0, 0)
];

export function loop(wisp) {
    if (wisp.checkDead() || !wisp.isRendered) return;

    if (wisp.isWorking || wisp.isPet) {
        requestAnimationFrame(() => loop(wisp));
        return;
    }

    if (!wisp.isMoving && !wisp.waitingForNewPos) {
        if (Math.random() >= 0.75) {
            wisp.isWorking = true;
            wisp.work().then(() => {
                wisp.isWorking = false;
                requestAnimationFrame(() => loop(wisp));
            });
            return;
        }

        wisp.waitingForNewPos = true;
        wisp.htmlImage.src = wisp.image.idle;

        setTimeout(() => {
            if (!wisp.alive || !wisp.isRendered) return;
            wisp.generateNewPos();
            wisp.waitingForNewPos = false;
        }, 1000 + Math.random() * 1500);
    }

    wisp.move();
    loopCount++;
    requestAnimationFrame(() => loop(wisp));
}

export function init() {
    wisps.forEach((currentWisp) => {
        if (currentWisp.checkDead()) {
            if (currentWisp.aliveLoop) clearInterval(currentWisp.aliveLoop);
            currentWisp.aliveLoop = null;
            return;
        }

        if (currentWisp.isRendered) return;

        currentWisp.init();
        loop(currentWisp);

        currentWisp.aliveLoop = setInterval(() => {
            currentWisp.decrease();
            if (currentWisp.checkDead()) {
                clearInterval(currentWisp.aliveLoop);
                currentWisp.aliveLoop = null;
            }
        }, 4000);
    });
}

function buyWisp() {
    playClickSound()
    if (money < wispCost) return;

    wisps.push(new Wisp(0, 0));
    updateMoney(-wispCost);

    wispCost *= 2;
    document.getElementById("editBuyAWisp").textContent = `Buy a Wisp $${wispCost}`;
    init();
}

init();
initPenClickListener();

document.getElementById("buyAWisp").addEventListener('click', buyWisp);

document.addEventListener('keydown', (event) => {
    if (event.key === "a") {
        wisps.push(new Wisp(0, 0));
        init();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    playBackgroundMusic()
>>>>>>> afe4ee1ce1e80bd9334e74bc2fdae2fe1535b08a
})