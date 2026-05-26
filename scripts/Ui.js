<<<<<<< HEAD
export const sideMenu = document.getElementById("sideMenu");
export let activeWisp = null;

export const fillBars = {
    thirst: 5,
    hunger: 5,
};

export const makeProgressBar = (name, value) => {
    const mainDiv = document.createElement("div");
    const span = document.createElement("span");
    const progressBarOut = document.createElement("div");
    const progressBarInner = document.createElement("div");

    mainDiv.className = "progress-bar";
    progressBarOut.className = "progressBarOut";
    progressBarInner.className = "progressBarInner";

    span.textContent = `${name}:`;
    progressBarInner.style.width = `${value}%`;
    progressBarOut.appendChild(progressBarInner);
    mainDiv.append(span, progressBarOut);

    mainDiv.update = (newValue) => {
        newValue = Math.max(0, Math.min(100, newValue));
        progressBarInner.style.width = `${newValue}%`;
    };

    return mainDiv;
};

export const loadButtonDiv = (wisp) => {
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonDiv");

    const feedButton = document.createElement('button');
    const drinkButton = document.createElement('button');

    feedButton.textContent = `Feed ${wisp.name}`;
    drinkButton.textContent = `Give ${wisp.name} water`;

    feedButton.addEventListener('click', () => {
        wisp.hunger = Math.min(wisp.hunger + fillBars.hunger, 100);
        if (activeWisp === wisp && wisp.ui) {
            wisp.ui.happynessMeter.update(wisp.happyness);
            wisp.ui.hungerMeter.update(wisp.hunger);
            wisp.ui.thirstyMeter.update(wisp.thirst);
        }
    });

    drinkButton.addEventListener('click', () => {
        wisp.thirst = Math.min(wisp.thirst + fillBars.thirst, 100);
        if (activeWisp === wisp && wisp.ui) {
            wisp.ui.happynessMeter.update(wisp.happyness);
            wisp.ui.hungerMeter.update(wisp.hunger);
            wisp.ui.thirstyMeter.update(wisp.thirst);
        }
    });

    buttonDiv.appendChild(drinkButton);
    buttonDiv.appendChild(feedButton);

    return buttonDiv;
};

export const loadRightClickMenu = (wisp) => {
    if (wisp.alive === false) return;

    if (activeWisp && activeWisp.htmlImage) {
        activeWisp.htmlImage.classList.remove('selected');
        activeWisp.htmlImage.style.zIndex = "1";
    }

    activeWisp = wisp;
    sideMenu.innerHTML = "";

    if (wisp.htmlImage) wisp.htmlImage.classList.add('selected');

    const nameHeader = document.createElement('h1');
    nameHeader.textContent = wisp.name;

    const showGender = document.createElement("span");
    showGender.textContent = `${wisp.name}'s gender is ${wisp.gender}`;

    const showSexuality = document.createElement("span");
    showSexuality.textContent = `${wisp.name}'s sexuality is ${wisp.sexuality}`;

    const displayTraits = document.createElement('h3');
    displayTraits.textContent =
        `${wisp.name} is ${wisp.traits[0]}, ${wisp.traits[1]}, and ${wisp.traits[2]}.`;

    const happynessMeter = makeProgressBar('Happiness', wisp.happyness);
    const hungerMeter = makeProgressBar('Hunger', wisp.hunger);
    const thirstyMeter = makeProgressBar('Thirsty', wisp.thirst);

    wisp.ui = { happynessMeter, hungerMeter, thirstyMeter };

    let buttonDiv = loadButtonDiv(wisp);

    nameHeader.addEventListener('click', () => {
        const newName = prompt(`What should ${wisp.name}'s name be?`);
        if (newName) {
            wisp.name = newName;
            nameHeader.textContent = wisp.name;
            displayTraits.textContent =
                `${wisp.name} is ${wisp.traits[0]}, ${wisp.traits[1]}, and ${wisp.traits[2]}.`;
            showGender.textContent = `${wisp.name}'s gender is ${wisp.gender}`;
            showSexuality.textContent = `${wisp.name}'s sexuality is ${wisp.sexuality}`;

            sideMenu.removeChild(buttonDiv);
            buttonDiv = loadButtonDiv(wisp);
            sideMenu.appendChild(buttonDiv);
        }
    });

    sideMenu.append(nameHeader, displayTraits, showGender, showSexuality,
        happynessMeter, hungerMeter, thirstyMeter, buttonDiv);
};

export const initPenClickListener = () => {
    const pen = document.getElementById('pen');
    pen.addEventListener('click', (e) => {
        if (e.target === pen) {
            if (activeWisp && activeWisp.htmlImage) {
                activeWisp.htmlImage.classList.remove('selected');
            }
            activeWisp = null;
            sideMenu.innerHTML = "";
        }
    });
=======
export const sideMenu = document.getElementById("sideMenu");
export let activeWisp = null;

export const fillBars = {
    thirst: 5,
    hunger: 5,
};

export const makeProgressBar = (name, value) => {
    const mainDiv = document.createElement("div");
    const span = document.createElement("span");
    const progressBarOut = document.createElement("div");
    const progressBarInner = document.createElement("div");

    mainDiv.className = "progress-bar";
    progressBarOut.className = "progressBarOut";
    progressBarInner.className = "progressBarInner";

    span.textContent = `${name}:`;
    progressBarInner.style.width = `${value}%`;
    progressBarOut.appendChild(progressBarInner);
    mainDiv.append(span, progressBarOut);

    mainDiv.update = (newValue) => {
        newValue = Math.max(0, Math.min(100, newValue));
        progressBarInner.style.width = `${newValue}%`;
    };

    return mainDiv;
};

export const loadButtonDiv = (wisp) => {
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonDiv");

    const feedButton = document.createElement('button');
    const drinkButton = document.createElement('button');

    feedButton.textContent = `Feed ${wisp.name}`;
    drinkButton.textContent = `Give ${wisp.name} water`;

    feedButton.addEventListener('click', () => {
        wisp.hunger = Math.min(wisp.hunger + fillBars.hunger, 100);
        if (activeWisp === wisp && wisp.ui) {
            wisp.ui.happynessMeter.update(wisp.happyness);
            wisp.ui.hungerMeter.update(wisp.hunger);
            wisp.ui.thirstyMeter.update(wisp.thirst);
        }
    });

    drinkButton.addEventListener('click', () => {
        wisp.thirst = Math.min(wisp.thirst + fillBars.thirst, 100);
        if (activeWisp === wisp && wisp.ui) {
            wisp.ui.happynessMeter.update(wisp.happyness);
            wisp.ui.hungerMeter.update(wisp.hunger);
            wisp.ui.thirstyMeter.update(wisp.thirst);
        }
    });

    buttonDiv.appendChild(drinkButton);
    buttonDiv.appendChild(feedButton);

    return buttonDiv;
};

export const loadRightClickMenu = (wisp) => {
    if (wisp.alive === false) return;

    if (activeWisp && activeWisp.htmlImage) {
        activeWisp.htmlImage.classList.remove('selected');
        activeWisp.htmlImage.style.zIndex = "1";
    }

    activeWisp = wisp;
    sideMenu.innerHTML = "";

    if (wisp.htmlImage) wisp.htmlImage.classList.add('selected');

    const nameHeader = document.createElement('h1');
    nameHeader.textContent = wisp.name;

    const showGender = document.createElement("span");
    showGender.textContent = `${wisp.name}'s gender is ${wisp.gender}`;

    const showSexuality = document.createElement("span");
    showSexuality.textContent = `${wisp.name}'s sexuality is ${wisp.sexuality}`;

    const displayTraits = document.createElement('h3');
    displayTraits.textContent =
        `${wisp.name} is ${wisp.traits[0]}, ${wisp.traits[1]}, and ${wisp.traits[2]}.`;

    const happynessMeter = makeProgressBar('Happiness', wisp.happyness);
    const hungerMeter = makeProgressBar('Hunger', wisp.hunger);
    const thirstyMeter = makeProgressBar('Thirsty', wisp.thirst);

    wisp.ui = { happynessMeter, hungerMeter, thirstyMeter };

    let buttonDiv = loadButtonDiv(wisp);

    nameHeader.addEventListener('click', () => {
        const newName = prompt(`What should ${wisp.name}'s name be?`);
        if (newName) {
            wisp.name = newName;
            nameHeader.textContent = wisp.name;
            displayTraits.textContent =
                `${wisp.name} is ${wisp.traits[0]}, ${wisp.traits[1]}, and ${wisp.traits[2]}.`;
            showGender.textContent = `${wisp.name}'s gender is ${wisp.gender}`;
            showSexuality.textContent = `${wisp.name}'s sexuality is ${wisp.sexuality}`;

            sideMenu.removeChild(buttonDiv);
            buttonDiv = loadButtonDiv(wisp);
            sideMenu.appendChild(buttonDiv);
        }
    });

    sideMenu.append(nameHeader, displayTraits, showGender, showSexuality,
        happynessMeter, hungerMeter, thirstyMeter, buttonDiv);
};

export const initPenClickListener = () => {
    const pen = document.getElementById('pen');
    pen.addEventListener('click', (e) => {
        if (e.target === pen) {
            if (activeWisp && activeWisp.htmlImage) {
                activeWisp.htmlImage.classList.remove('selected');
            }
            activeWisp = null;
            sideMenu.innerHTML = "";
        }
    });
>>>>>>> afe4ee1ce1e80bd9334e74bc2fdae2fe1535b08a
};