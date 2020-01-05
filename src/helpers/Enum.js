export default class Enum{
    constructor(...array){
        if(array.length === 1 && typeof array[0] === "object"){
                for(let key in array[0]){
                   this[key] = array[0][key];
                }
                return Object.freeze(this);
        }
        for(let key in array){
            this[key] = array[key];
         }
         return Object.freeze(this);
    }
}