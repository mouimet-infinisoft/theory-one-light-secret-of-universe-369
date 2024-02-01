// Define the IAi interface
export interface IAi {
    ask(prompt:string):Promise<string>;
}

