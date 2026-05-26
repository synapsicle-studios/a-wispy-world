
import { names, traits, greenWispImagePath } from './data.js';
import { activeWisp, loadRightClickMenu } from './Ui.js';
import { playDeathSound } from "./audioHandler.js";
import { normalWork, happinessWork } from "./workFunctions.js";

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const PET_HAPPINESS_BONUS = 1;

const jobHandlers = {
    money: normalWork,
    happiness: happinessWork,
};

export class Wisp {
    constructor(x, y, image = greenWispImagePath) {
        this.name = null;
        this.gender = null;
        this.sexuality = null;
        this.traits = [];
        this.alive = true;
        this.isPet = false;
        this.aliveLoop = null;

        this.x = x;
        this.y = y;
        this.goToX = x;
        this.goToY = y;
        this.speed = 1;
        this.isMoving = false;

        this.happiness = 100;
        this.hunger = 100;
        this.thirst = 100;
        this.job = "money";

        this.happinessDecay = 1;
        this.hungerDecay = 1;
        this.thirstDecay = 1;

        this.image = image;
        this.htmlImage = null;
        this.isRendered = false;
        this.ui = null;
        this.pen = null;
    }

    init() {
        this.pen = document.getElementById('pen');
        this.htmlImage = document.createElement('img');
        this.htmlImage.src = this.image.normal;
        this.htmlImage.className = 'wisp';
        this.htmlImage.style.position = 'absolute';

        this.htmlImage.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            loadRightClickMenu(this);
        });

        this.htmlImage.addEventListener("click", () => {
            if (!this.alive) {
                this.destroy();
                return;
            }
            this.isPet = true;
            this.isMoving = false;

            this.happiness = Math.min(100, this.happiness + PET_HAPPINESS_BONUS);
            this.ui?.happinessMeter?.update(this.happiness);
            this.htmlImage.src = this.image.happy;

            setTimeout(() => {
                this.htmlImage.src = this.image.normal;
                this.isMoving = true;
                this.isPet = false;
            }, 2000);
        });

        this.pen.appendChild(this.htmlImage);
        this.isRendered = true;

        this.generateGender();
        this.generateSexuality();
        this.getName();
        this.generateTraits();
        this.render();
    }

    destroy() {
        this.htmlImage.classList.remove('shake');
        if (this.aliveLoop) {
            clearInterval(this.aliveLoop);
            this.aliveLoop = null;
        }
        if (this.htmlImage?.parentNode) {
            this.htmlImage.parentNode.removeChild(this.htmlImage);
        }
    }

    generateGender() {
        const genders = ['male', 'female', 'male', 'female', 'male', 'female', 'Non-binary', 'Other', 'Walmart bag'];
        this.gender = genders[Math.floor(Math.random() * genders.length)];
    }

    generateSexuality() {
        const sexualities = ['Straight', 'Straight', 'Straight', 'Straight', 'Gay', 'Lesbian', 'Pansexual', 'Bisexual'];
        const valid = sexualities.filter(s => {
            if (s === "Lesbian" && this.gender !== "female") return false;
            if (s === "Gay" && this.gender !== "male") return false;
            return true;
        });
        this.sexuality = valid[Math.floor(Math.random() * valid.length)];
    }

    generateTraits() {
        for (let i = 0; i < 3; i++) {
            this.traits.push(traits[Math.floor(Math.random() * traits.length)]);
        }
    }

    getName() {
        const eligible = names.filter(n => n.gender === this.gender || n.gender === "unisex");
        if (eligible.length === 0) {
            console.error(`No names found matching gender: ${this.gender}`);
            return;
        }
        const chosen = eligible[Math.floor(Math.random() * eligible.length)];
        chosen.amount++;
        this.name = chosen.amount === 1 ? chosen.name : `${chosen.name} ${chosen.amount}`;
    }

    decrease() {
        this.happiness = Math.max(0, this.happiness - this.happinessDecay);
        this.thirst = Math.max(0, this.thirst - this.thirstDecay);
        this.hunger = Math.max(0, this.hunger - this.hungerDecay);

        if (activeWisp === this && this.ui) {
            this.ui.happinessMeter?.update(this.happiness);
            this.ui.hungerMeter?.update(this.hunger);
            this.ui.thirstMeter?.update(this.thirst);
        }
    }

    runDeadFunction() {
        this.htmlImage.src = this.image.dead;
        this.alive = false;
    }

    checkDead() {
        const isDead = this.happiness <= 0 || this.hunger <= 0 || this.thirst <= 0;
        if (isDead) {
            playDeathSound();
            this.runDeadFunction();
        }
        return isDead;
    }

    generateNewPos() {
        const rect = this.htmlImage.getBoundingClientRect();
        const maxX = this.pen.clientWidth - rect.width;
        const maxY = this.pen.clientHeight - rect.height;
        this.goToX = Math.max(0, Math.floor(Math.random() * maxX));
        this.goToY = Math.max(0, Math.floor(Math.random() * maxY));
        this.isMoving = true;
    }

    render() {
        if (this.htmlImage) {
            this.htmlImage.style.left = `${this.x}px`;
            this.htmlImage.style.top = `${this.y}px`;
        }
    }

    async work() {
        await jobHandlers[this.job]?.(this);
    }

    move() {
        if (!this.alive || !this.isMoving || !this.htmlImage) return;

        const rect = this.htmlImage.getBoundingClientRect();
        const maxX = this.pen.clientWidth - rect.width;
        const maxY = this.pen.clientHeight - rect.height;

        this.x = Math.max(0, Math.min(this.x, maxX));
        this.y = Math.max(0, Math.min(this.y, maxY));

        if (Math.abs(this.x - this.goToX) < this.speed) this.x = this.goToX;
        else this.x += (this.x < this.goToX) ? this.speed : -this.speed;

        if (Math.abs(this.y - this.goToY) < this.speed) this.y = this.goToY;
        else this.y += (this.y < this.goToY) ? this.speed : -this.speed;

        this.render();

        if (this.x === this.goToX && this.y === this.goToY) this.isMoving = false;
    }
}