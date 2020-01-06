import Task from '../entities/Task';

export default class TaskList{
    private tasks: Task[];
    constructor(array?: Task[]){
        if(array != undefined){
            this.tasks = array; 
        }else{
            this.tasks = [];
        }
    }

    Add(list: TaskList): void;
    Add(array: Task[]): void;
    Add(task: Task): void;

    Add(parameter: TaskList | Task[] | Task):void {
        if(parameter instanceof TaskList){
            this.tasks.push(...parameter.tasks);
        }else if(parameter instanceof Array){
            this.tasks.push(...parameter);
        }else{
            this.tasks.push(parameter);
        }
    }

    Remove(task: Task): Boolean;
    Remove(predicate: (element: Task, index: number, array: Task[]) => Boolean): Boolean;

    Remove(parameter: Task | ((element: Task, index: number, array: Task[]) => Boolean)): Boolean
    {   
        let filtered;
        if(parameter instanceof Function){
            filtered = this.tasks.filter(parameter);
        }else{
            filtered = this.tasks.filter((el)=>el === parameter);
        }
        if(this.tasks.length !== filtered.length){
            this.tasks = filtered;
            return true;
        }

        return false;
    }

    toString(){
        return this.tasks.map((el)=>el.toString()).join('\n');
    }
}