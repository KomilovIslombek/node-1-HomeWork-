import { readData, writeData } from "./utils.js";

const action = process.argv[2];
const data = readData()

// console.log(action);

switch (action) {
    case 'GET':
        console.table(data.incomes)
        break;

    case 'POST':
        const amount = parseInt(process.argv[3])
        const purpose = String(process.argv[4])

        data.incomes.push({
            id: (data.incomes.length > 0 ? data.incomes.at(-1)?.id + 1 : 1),
            amount,
            purpose
        })

        writeData(data)
        console.log("Income added successfully!");
        console.table(data.incomes);
        break;

    case 'DELETE':
        const id = parseInt(process.argv[3]) || null
        if(!id)  {
            console.log(`Moshenik! \nbunaqa id lik tushim yo'q`)
            break;
        }

        data.incomes = data.incomes?.filter(inc => inc.id !== id)
        writeData(data)
        console.log(`Income item ${id} removed.`);
        break;

    case 'PUT':
        const incomeId = parseInt(process.argv[3]) || null;
        const rawAmount = process.argv[4];  // "amount=500"
        const rawPurpose = process.argv[5]; // "purpose=bonus"
        
        const item = data.incomes?.find(i => i.id === incomeId);
        if (!item) {
            console.error("Income ID not found");
            break;
        }

        if (rawAmount && rawAmount.startsWith("amount=")) {
            item.amount = parseFloat(rawAmount.split("=")[1]);
        }
        if (rawPurpose && rawPurpose.startsWith("purpose=")) {
            item.purpose = rawPurpose.split("=")[1];
        }

        writeData(data);
        console.log("Income updated successfully!");
        console.table([item]);  
        break;
        
    default:
        console.log("Usage: node income [GET | POST | DELETE | PUT]");
        break;
}


// data.incomes
//  node income POST 400 restaurant
// node income PUT 2 amount=60 purpose=Otabek