import { Api } from './api';


export class ArrayStorage<T>
{
    public LOCAL_STORAGE_KEY: string;
    public api: Api;
    
    constructor(key: string) {          
        
        this.api = new Api();
        this.LOCAL_STORAGE_KEY = key;
    }   

    private getArray() : T[] {
        const self = this;
        var productsList = localStorage.getItem(self.LOCAL_STORAGE_KEY);
        if (productsList === null || productsList === undefined) return new Array<T>();

        var parsed = JSON.parse(productsList) as T[];        
        return Array.isArray(parsed) ? parsed : new Array<T>();        
    }

    private setArray(array: T[]) : void {
        const self = this;
        localStorage.setItem(self.LOCAL_STORAGE_KEY, JSON.stringify(array));
    }

    public async loadFromStorage(fn: (it: T) => string) : Promise<T[]> {
        const self = this;        
        var array = self.getArray();        
        
        if (array.length === 0)
        {
            self.setArray(array);
            return array;
        }

        // Reload from db in case of edit/changes   
        var reloaded = new Array<T>()             
        for(let item of array) {
            if (item === null || item === undefined) continue;
            var p  = await self.api.get<T>(fn(item));
            if (p === null || p === undefined) continue;
            reloaded.push(p);
        }
                
        self.setArray(reloaded);
        return reloaded;
    }


    public addToStorage(p: T, predicate: (it: T) => boolean): void {
        const self = this;
        if (p === null || p === undefined) return;

        var array = self.getArray();
        var found = array.find(predicate);
        if (found  !== undefined) return;

        array.push(p);
        self.setArray(array);             
    }

    public deleteFromToStorage(predicate: (it: T) => boolean): void {
        const self = this;        

        var array = self.getArray();
        var found = array.find(predicate);
        if (found === undefined) return;

        var index = array.indexOf(found);
        if (index > -1) {
            array.splice(index, 1);
        }

        self.setArray(array);
    }
}
