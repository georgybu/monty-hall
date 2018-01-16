/*
* First of all, lets describe algorithm
*
* 1. Put price behind one of three doors (1,2,3)
* 2. Randomly try to answer - where are price (1,2,3)
* 3. Show empty door
* 4.1. Change solution
* 4.2. Stay on previous solution
*
* And, lets implement:
* */

/**
 * Get random number
 * @param min
 * @param max
 * @returns {number}
 */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Put price behind one of three doors
 * @returns {number}
 */
const putPrice = () => getRandomInt(1, 3);

/**
 * Randomly try to answer - where are price (1,2,3)
 * @returns {number}
 */
const getAnswer = () => getRandomInt(1, 3);

/**
 * Show empty door
 * @param doorWithPrice
 * @param firstAnswer
 * @returns {number}
 */
const showEmptyDoor = (doorWithPrice, firstAnswer) => {
    const emptyDoors = [1, 2, 3]
        .filter((door) => door !== doorWithPrice)
        .filter((door) => door !== firstAnswer);
    return emptyDoors[getRandomInt(0, emptyDoors.length - 1)];
};

/**
 * Stay on previous solution
 * @param firstAnswer
 * @returns {number}
 */
const stayOnPreviousSolution = (firstAnswer) => firstAnswer;

/**
 * Change solution
 * @param firstAnswer
 * @param emptyDoor
 * @returns {number}
 */
const changeSolution = (firstAnswer, emptyDoor) => {
    return [1, 2, 3].filter((door) => door !== emptyDoor).filter((door) => door !== firstAnswer)[0];
};

// ------------------------------------------------------------------
const statistic = {first: 0, changed: 0};

const game = (i = 0) => {
    const doorWithPrice = putPrice();
    const firstAnswer = getAnswer();
    const emptyDoor = showEmptyDoor();
    const secondAnswer = changeSolution(firstAnswer, emptyDoor);
    const win = doorWithPrice === firstAnswer ? 'first answer' : 'changed answer';

    if (doorWithPrice === firstAnswer) {
        statistic.first++;
    } else {
        statistic.changed++;
    }
    console.log(`${i} price: ${doorWithPrice}, firstAnswer: ${firstAnswer}, emptyDoor: ${emptyDoor}, secondAnswer: ${secondAnswer}, win: ${win}`);
};

const games = 100000;
console.time(`games: ${games}`);
for (let i = 0; i < games; i++) {
    game(i);
}
console.timeEnd(`games: ${games}`);
console.log(statistic);