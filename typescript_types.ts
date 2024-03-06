// Basic types
let stageName: string = 'A Beautiful Vue'
let roomSize: number = 100
let isComplete: boolean = false

// arrays, objects and functions
let shoppingList: string[] = ['apple', 'bananas', 'cherries']

let generateFullName = (firstName: string, lastName: string): string => {
    return firstName + ' ' + lastName
  }

let guy: {
    name: string;
    age: number;
    activeAvenger: boolean;
    powers: string[];
} = {
    name: 'Peter Parker',
    age: 20,
    activeAvenger: true,
    powers: ['wall-crawl', 'spider-sense']
}

// custom types
type sButtonType = 'primary'
let buttonStyles: sButtonType = 'primary'          // right
let buttonStyl: sButtonType = 'secondary'          // wrong

type buttonType = 'primary' | 'secondary' | 'success' | 'danger'
// TypeScript will report an error because this doesn't exist in the type!
const errorBtnStyles: buttonType = 'error'

// This variable is type safe!
const dangerBtnStyles: buttonType = 'danger'

//Interfaces
type ComicUniverse = 'Marvel' | 'DC'
interface Hero {
    name: string;
    age: number;
    activeAvenger: boolean;
    powers: string[];
    universe: ComicUniverse;
}

let person: Hero = {
	name: 'Peter Parker',
	age: 20,
	activeAvenger: true,
	powers: ['wall-crawl', 'spider-sense'],
    universe: 'Marvel'
}


// generics (template)

function createList<T>(item: T): T[] {
    const newList: T[] = []
  
    newList.push(item)
  
    return newList
}

const numberList = createList<number>(123)
const stringList = createList<string>('123')