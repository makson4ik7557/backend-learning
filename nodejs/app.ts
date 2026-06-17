import express, {type NextFunction} from "express";
import type {Response,Request} from "express";
import type {Market} from "./markets.js";
import {isMarketStatus,allowedStatuses} from "./markets.js";
import {z} from "zod"

let basicId = 0;
const markets: Market[] = [
    { id: basicId += 1, question: "Will trump say the word Ukraine", price: 5, status: "unresolved"},
    { id: basicId += 1, question: "Will BTC hit 200k before GTA 6", price: 2, status: "unresolved"},
    { id: basicId += 1, question: "Will BTC hit 60k before GTA 6", price: 2, status: "resolved"},
];

const app = express();
let port = 3000;
app.use(express.json());

const createMarket = z.object({
    question: z.string().min(1),
    price: z.number(),
    status: z.enum(allowedStatuses)
}).strict();

const updateMarket = createMarket.pick({status: true});

function validateCreate(req: Request,res:Response,next: NextFunction){
    const result = createMarket.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({error: result.error});
    } else {
        next();
    }
}
function validateUpdate(req:Request,res:Response,next:NextFunction){
    const result = updateMarket.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({error: result.error});
    } else {
        next();
    }
}

app.get('/markets', (req:Request,res:Response) => {
    const status = req.query.status;
    if(status) {
        const filteredMarkets = markets.filter(m => m.status === status)
        res.json(filteredMarkets);
    }
    else {
        res.json(markets);
    }
})

app.get('/markets/:id', (req:Request,res:Response) => {
    const market = markets.find(m => m.id === Number(req.params.id));
    if(!market) return res.status(404).json({ message: 'Not found the market with such id'});
    return res.json(market);
})

app.post('/markets', validateCreate, (req:Request,res:Response) => {
    const {question , price , status} = req.body;
    const newMarket: Market = {
        id: basicId += 1,
        question: question,
        price: price,
        status: status
    };
    markets.push(newMarket);
    res.status(201).json(newMarket);
});

app.patch('/markets/:id', validateUpdate, (req:Request,res:Response) => {
    const market = markets.find(m => m.id === Number(req.params.id));
    if(!market) return res.status(404).json({error: 'Not found the market with such id'});
    const {status} = req.body;
    market.status = status;
    res.json(market);
})

app.delete('/markets/:id', (req:Request,res:Response) => {
    const marketId = markets.findIndex(m => m.id === Number(req.params.id))
    if(marketId === -1) return res.status(404).json({message: 'Not found the market with such id'});
    markets.splice(marketId, 1);
    res.status(204).end();
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});