function greet (name){
    return `Привіт, ${name}!`;
}
console.log(greet("Maksym"));

function isAdult(age){
    return age >= 18 ? 'Дорослий' : 'Неповнолітній';
}
console.log(isAdult(17));

const numbers = [3, 7, 2, 9, 1, 5];
function getMax(array){
    let maxVal = array[0];
    for(let i = 1; i < array.length; i++){
        if(array[i] > maxVal) maxVal = array[i];
    }
    return maxVal;
}
console.log(getMax(numbers));

const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8];
const sum = numbers2.filter(num => num % 2 === 0).map(num => num * 3).reduce((acc,num) => acc + num , 0);
console.log(sum);