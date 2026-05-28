
export const names = [
    { name: "Bob", amount: 0, gender: "male" },
    { name: "Alice", amount: 0, gender: "female" },
    { name: "Charlie", amount: 0, gender: "unisex" },
    { name: "David", amount: 0, gender: "male" },
    { name: "Eve", amount: 0, gender: "female" },
    { name: "Frank", amount: 0, gender: "male" },
    { name: "Grace", amount: 0, gender: "female" },
    { name: "Hank", amount: 0, gender: "male" },
    { name: "Ivy", amount: 0, gender: "female" },
    { name: "Jack", amount: 0, gender: "male" },
    { name: "Karl", amount: 0, gender: "male" },
    { name: "Luna", amount: 0, gender: "female" },
    { name: "Milo", amount: 0, gender: "male" },
    { name: "Nina", amount: 0, gender: "female" },
    { name: "Oscar", amount: 0, gender: "male" },
    { name: "Paul", amount: 0, gender: "male" },
    { name: "Quinn", amount: 0, gender: "unisex" },
    { name: "Rose", amount: 0, gender: "female" },
    { name: "Sam", amount: 0, gender: "unisex" },
    { name: "Tess", amount: 0, gender: "female" },
    { name: "Able", amount: 0, gender: "male" },
    { name: "Eli", amount: 0, gender: "male" },
    { name: "Gabryel", amount: 0, gender: "male" },
    { name: "Aiden", amount: 0, gender: "male" },
    { name: "MK", amount: 0, gender: "female" },
    { name: "Lilyanna", amount: 0, gender: "female" }
];

export const traits = [
    "brave", "cowardly", "ugly", "Stupid", "Chronicly stupid", "a Plain Chicken lover",
    "intelligent", "Ragebaiter", "reckless", "charismatic",
    "introverted", "extroverted", "loyal", "racist", "deceptive", "curious", "lazy",
    "ambitious", "greedy", "generous", "strategic", "impulsive", "patient", "aggressive",
    "calm", "optimistic", "pessimistic", "sarcastic", "honest", "manipulative", "fearless",
    "nervous", "creative", "logical", "stubborn", "adaptable", "resourceful", "clumsy",
    "focused", "distractible", "friendly", "hostile", "confident", "insecure", "disciplined",
    "rebellious", "empathetic", "cold", "witty", "serious", "cautious", "playful",
    "resilient", "fragile", "leader", "follower", "witchy", "silly", "suspicious", "cheerful", "cynical", "vain", "humble", "careless"
];

export const greenWispImagePath = {
    normal: "./images/green.png",
    happy: "./images/happy.png",
    idle: './images/idle.png',
    workStart: './images/work-images/normal-work-start.png',
    working: './images/work-images/normal-working.png',
    dead: './images/dead.png'
};

export let money = 0.50;
export const moneyAddAmount = 0.05;

export const updateMoney = (addAmount) => {
    money = Math.max(0, money + addAmount);
    const showMoney = document.getElementById("showMoney");
    showMoney.textContent = `Money: ${Math.floor(money * 100) / 100}`;
};
updateMoney(0)