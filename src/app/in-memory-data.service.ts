import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books = [
      {
        id: 1,
        name: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: '	1925',
        addedAt: '2018-05-25',
        review: 'In my younger and more vulnerable years my father gave me some advice that I\'ve been turning over in my mind ever since.'
      },
      {
        id: 2,
        name: 'The Grapes of Wrath',
        author: 'John Steinbeck',
        year: '1939',
        addedAt: '2018-05-25',
      },
      {
        id: 3,
        name: 'Nineteen Eighty-Four',
        author: 'George Orwell',
        year: '1949',
        addedAt: '2018-05-25',
        review: 'It was a bright cold day in April, and the clocks were striking thirteen.'
      },
      {
        id: 4,
        name: 'Ulysses',
        author: 'James Joyce',
        year: '1918',
        addedAt: '2018-05-25',
        review: 'Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed.'
      },
      {
        id: 5,
        name: 'Catch-22',
        author: 'Joseph Heller',
        year: '1961',
        addedAt: '2018-05-25',
        review: 'It was love at first sight.'
      }
    ];
    return { books };
  }
}
