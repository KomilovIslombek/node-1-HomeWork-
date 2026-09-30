import { readData } from "./utils.js";
const flag = process.argv[2]  // --more (checks for optional more)

const data = readData()
const totalIncome = data.incomes.reduce((sum, item) => sum + item.amount, 0)
const totalExpanse = data.expanses.reduce((sum, item) => sum + item.amount, 0)
const currentBalance = totalIncome - totalExpanse


if (flag === '--more') {
    console.table([
        { State: "Total Income", Value: totalIncome },
        { State: "Total Expenses", Value: totalExpanse },
        { State: "Net Balance", Value: currentBalance }
    ]);
} else {
    console.log(`Current Balance: $${currentBalance}`);
}