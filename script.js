import chalk from 'chalk';

const a = Math.random();
const b = Math.random();
const sum = a + b;

console.log(chalk.yellow(`Сумма ${a.toFixed(4)} + ${b.toFixed(4)} = ${sum.toFixed(4)}`));
