function greet (name){
    return `Привіт, ${name}!`;
}

function isAdult(age){
    return age >= 18 ? 'Дорослий' : 'Неповнолітній';
}

const numbers = [3, 7, 2, 9, 1, 5];
function getMax(array){
    let maxVal = array[0];
    for(let i = 1; i < array.length; i++){
        if(array[i] > maxVal) maxVal = array[i];
    }
    return maxVal;
}

const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8];
const sum = numbers2.filter(num => num % 2 === 0).map(num => num * 3).reduce((acc,num) => acc + num , 0);

const user = {
    name: "Максим",
    age: 19,
    isAdult: true
};

function getUser ({name, age , isAdult}){
    return isAdult ? `${name}, ${age} років, дорослий` : `${name}, ${age} років, неповнолітній`;
}


function makeMultiplier(number){
    return function (secondNumber){
        return number * secondNumber;
    }
}
const double = makeMultiplier(2);
const triple = makeMultiplier(3);

function fetchUser(id){
    return new Promise((resolve,reject) => {
        setTimeout(() =>{
            const user = {
                name: "Максим",
                user_id:id,
            }
            if(id > 0) resolve(user)
            else reject("неправильний id")
        }, 1000);
    });
}

async function main(){
    try{
        const data1 = await fetchUser(1);
        const data2 = await fetchUser(-1);
        console.log(data1);
        console.log(data2)
    } catch (error) {
        console.error("помилка:" , error)
    }
}
main();