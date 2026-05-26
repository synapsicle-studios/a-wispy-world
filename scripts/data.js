export const names = [ ... ];

export const traits = [ ... ];

export const greenWispImagePath = { ... };

export let money = 0.50;
export const moneyAddAmount = 0.05;

export const updateMoney = (addAmount) => {
    money = Math.max(0, money + addAmount);
    const showMoney = document.getElementById("showMoney");
    showMoney.textContent = `Money: ${Math.floor(money * 100) / 100}`;
};

updateMoney(0);
window.addEventListener("DOMContentLoaded", () => {
    updateMoney(0);
});