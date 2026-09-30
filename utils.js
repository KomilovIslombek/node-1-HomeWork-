import fs from 'node:fs';
const FILE_PATH = './data.json';


export function readData() {
    if(!fs.existsSync(FILE_PATH)) return { incomes: [], expanses: [] };
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"))
}

export function writeData(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}