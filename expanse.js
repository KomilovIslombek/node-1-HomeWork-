import { readData, writeData } from "./utils.js";

const action = process.argv[2];
const data = readData()

switch (action) {
    case 'GET':
        console.table(data.expanses)
        break;

    case 'POST':
        const amount = parseInt(process.argv[3])
        const purpose = String(process.argv[4])

        data.expanses.push({
            id: (data.expanses.length > 0 ? data.expanses.at(-1)?.id + 1 : 1),
            amount,
            purpose
        })

        writeData(data)
        console.log("expanse added successfully!");
        console.table(data.expanses);
        break;

    case 'DELETE':
        const id = parseInt(process.argv[3]) || null
        if(!id)  {
            console.log(`Moshenik! \nbunaqa id lik harajat yo'q`)
            break;
        }

        data.expanses = data.expanses?.filter(inc => inc.id !== id)
        writeData(data)
        console.log(`expanse item ${id} removed.`);
        break;

    case 'PUT':
        const expanseId = parseInt(process.argv[3]) || null;
        const rawAmount = process.argv[4];  // "amount=500"
        const rawPurpose = process.argv[5]; // "purpose=bonus"
        
        const item = data.expanses?.find(i => i.id === expanseId);
        if (!item) {
            console.error("expanse ID not found");
            break;
        }

        if (rawAmount && rawAmount.startsWith("amount=")) {
            item.amount = parseFloat(rawAmount.split("=")[1]);
        }
        if (rawPurpose && rawPurpose.startsWith("purpose=")) {
            item.purpose = rawPurpose.split("=")[1];
        }

        writeData(data);
        console.log("expanse updated successfully!");
        console.table([item]);  
        break;
        
    default:
        console.log("Usage: node expanse [GET | POST | DELETE | PUT]");
        break;
}


// data.expanses
//  node expanse POST 400 restaurant
// node expanse PUT 2 amount=60 purpose=Otabek