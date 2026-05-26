import { moneyAddAmount, updateMoney } from "./data.js";
import { wisps } from "./Game.js";

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const happinessImages = {
    workStart: './images/work-images/happy-work-start.png',
    working: './images/work-images/happy-working.png',
};

async function runWorkAnimation(wisp, workStartSrc, workingSrc) {
    if (!wisp.alive) { wisp.htmlImage.src = wisp.image.dead; return false; }
    wisp.isMoving = false;
    wisp.htmlImage.src = wisp.image.idle;
    await wait(1000);

    if (!wisp.alive) { wisp.htmlImage.src = wisp.image.dead; return false; }
    wisp.htmlImage.src = workStartSrc;
    await wait(3000);

    if (!wisp.alive) { wisp.htmlImage.src = wisp.image.dead; return false; }
    wisp.htmlImage.src = workingSrc;
    wisp.htmlImage.classList.add('shake');
    await wait(2000);

    if (!wisp.alive) { wisp.htmlImage.src = wisp.image.dead; return false; }
    wisp.htmlImage.classList.remove('shake');
    wisp.htmlImage.src = wisp.image.normal;
    wisp.isMoving = true;
    return true;
}

export async function normalWork(wisp) {
    const completed = await runWorkAnimation(wisp, wisp.image.workStart, wisp.image.working);
    if (completed) updateMoney(moneyAddAmount);
}

export async function happinessWork(wisp) {
    const completed = await runWorkAnimation(wisp, happinessImages.workStart, happinessImages.working);
    if (completed) wisps.forEach(w => w.happiness += 5);
}