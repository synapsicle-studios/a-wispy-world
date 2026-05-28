import { moneyAddAmount, updateMoney } from "./data.js";
import { wisps } from "./Game.js";

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const happinessImages = {
    workStart: './images/work-images/happy-work-start.png',
    working: './images/work-images/happy-working.png',
};
const foodGuyImages = {
    workStart: './images/work-images/hunger-working-start.png',
    working: './images/work-images/hunger-working.png',
}
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
    if(!wait) return
    const completed = await runWorkAnimation(wisp, wisp.image.workStart, wisp.image.working);
    if (completed) updateMoney(moneyAddAmount);
}

export async function happinessWork(wisp) {
    const completed = await runWorkAnimation(wisp, happinessImages.workStart, happinessImages.working);
    wisps.forEach(w => w.happiness = Math.min(100, w.happiness + 10));
    wisps.forEach((w)=>w.ui?.happynessMeter?.update(w.happiness));
}
export async function feedAllWisps(wisp){
    const completed = await runWorkAnimation(wisp, foodGuyImages.workStart, foodGuyImages.workStart);
    if(completed){
        wisps.forEach(w => w.hunger = Math.min(100, w.hunger + 20));
        wisps.forEach((w)=>w.ui?.hungerMeter?.update(w.hunger));
    }
}