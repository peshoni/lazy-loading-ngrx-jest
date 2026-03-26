import { User } from "../models/models";
 
const firstNames = ['Ivan', 'Maria', 'Georgi', 'Elena', 'Petar', 'Anna', 'Stefan', 'Yoana', 'Dimitar', 'Kristina'];
const lastNames = ['Ivanov', 'Petrova', 'Georgiev', 'Dimitrova', 'Kolev', 'Stoyanova', 'Angelov', 'Hristova', 'Iliev', 'Vasileva'];

export const EXAMPLE_USER_DATA: User[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1, 
  name: firstNames[i % firstNames.length],
  family: lastNames[i % lastNames.length] + (i > 9 ? ` ${Math.floor(i / 10)}` : '')
}));

// const names = ['Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen'];

// export const EXAMPLE_USER_DATA: User[] = Array.from({ length: 30 }, (_, i) => ({
//   id: i + 1,
//   name: names[i] || `Element-${i + 1}`,
//   family: 'Scientific'
// }));
