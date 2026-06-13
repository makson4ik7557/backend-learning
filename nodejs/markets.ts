export type marketStatus = "unresolved" | "resolved";
export interface Market{
    id : number;
    question : string;
    price : number;
    status : marketStatus;
}
const markets: Market[] = [
    {
        id: 1,
        question: "Will Trump say something about UFC",
        price: 50.5,
        status: "unresolved"
    },
    {
        id: 2,
        question: "Who will win champions league",
        price: 120,
        status: "resolved"
    },
    {
        id: 3,
        question: "Will BTC reach 50k before 2027?",
        price: 15,
        status: "unresolved"
    }
];

function findMarket (array: Market[], exact:number) : Market | undefined {
    return array.find(m => m.id === exact);
}
function showMarketsWithExactStatus (array: Market[], exactStatus: marketStatus): Market[] {
    return array.filter(m => m.status === exactStatus);
}

console.log(findMarket(markets,1));
console.log(showMarketsWithExactStatus(markets,"resolved"));