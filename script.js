const { menu, resources } = require("./game_data.js");
const prompt = require("prompt-sync")();

let profit = 0;

const roundDigits = digit => digit.toFixed(2);

const collectCoins = () => {
	console.log("Please insert coins.");
	let total = prompt("How many quarters?: ") * 0.25;
	total += prompt("How many dimes?: ") * 0.1;
	total += prompt("How many nickels?: ") * 0.05;
	total += prompt("How many pennies?: ") * 0.01;

	return roundDigits(total);
};

const calculateCost = (moneyRecieved, drinkCost) => {
	if (moneyRecieved < drinkCost) {
		console.log("Sorry that's not enough money. Money refunded.");
		return false;
	} else {
		const change = moneyRecieved - drinkCost;
		console.log(`Here's your ${roundDigits(change)} in change `);
		profit += drinkCost;
		return true;
	}
};

const checkIfResourcesSufficient = choice => {
	const userChoice = menu[choice]["ingredients"];
	for (items in userChoice) {
		if (userChoice[items] > resources[items]) {
			console.log(`Sorry there isn't enough ${items}`);
			return false;
		} else {
			resources[items] -= userChoice[items];
			return true;
		}
	}
};

const makeCoffee = choice => {
	const enoughResources = checkIfResourcesSufficient(choice);

	if (enoughResources) {
		const payment = collectCoins();
		calculateCost(payment, menu[choice]["cost"]);
		console.log(`Enjoy your ${choice}!`);
	}
};

let coffeeMachineOn = true;

while (coffeeMachineOn) {
	const choice = prompt("What would you like? (espress/latte/cappuccino): ");

	if (choice === "off") {
		coffeeMachineOn = false;
	} else if (choice === "report") {
		console.log(`Water: ${resources.water}`);
		console.log(`Milk: ${resources.milk}`);
		console.log(`Coffee: ${resources.coffee}`);
		console.log(`Profit: ${profit}`);
	} else {
		makeCoffee(choice);
	}
}
