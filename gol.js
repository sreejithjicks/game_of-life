let cur_gen;
let next_gen;

//readline provides facility to input via cmd

const readline = require("readline");
let input = []; //command line input is stored in it

var r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to get input from command prompt

r1.prompt();

r1.on("line", function (cmd) {
  if (cmd == "0") r1.close(); //breaking condition for the input
  input.push(cmd);
});

r1.on("close", function (cmd) {
  let rows = input.length; //no of rows
  let cols = input[0].length; //no of columns
  cur_gen = [rows];
  next_gen = [rows];
  initiator(rows, cols);

  next_generation(rows, cols);
  console.log("\n");
  for (let i = 0; i < rows; i++) {
    console.log(next_gen[i].join(""));
  }

  process.exit(0);
});

// Function which converts input pattern to (1,0) matrix
const initiator = (rows, cols) => {
  for (let i = 0; i < rows; i++) {
    cur_gen[i] = new Array(cols);
    next_gen[i] = new Array(cols);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      if (input[i][j] == "X" || input[i][j] == "x") {
        cur_gen[i][j] = 1;
      }
      if (input[i][j] == "_") {
        cur_gen[i][j] = 0;
      }
      next_gen[i][j] = "_";
    }
  }
};
//Function for counting the neighbours
const count_neighbour = (row_num, col_num, rows, cols) => {
  let count = 0;
  let row = row_num;
  let col = col_num;
  if (row - 1 >= 0) {
    count = count + cur_gen[row - 1][col];
    if (col - 1 >= 0) count = count + cur_gen[row - 1][col - 1];
    if (col + 1 < cols) count = count + cur_gen[row - 1][col + 1];
  }
  if (col - 1 >= 0) count = count + cur_gen[row][col - 1];
  if (col + 1 < cols) count = count + cur_gen[row][col + 1];
  if (row + 1 < rows) {
    count = count + cur_gen[row + 1][col];
    if (col - 1 >= 0) count = count + cur_gen[row + 1][col - 1];
    if (col + 1 < cols) count = count + cur_gen[row + 1][col + 1];
  }
  return count;
};
//Function for genrating the Next Generation
const next_generation = (rows, cols) => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let count = count_neighbour(i, j, rows, cols);
      if (cur_gen[i][j] == 1) {
        if (count < 2) {
          next_gen[i][j] = "_";
        } else if (count == 2 || count == 3) {
          next_gen[i][j] = "X";
        } else if (count > 3) {
          next_gen[i][j] = "_";
        }
      } else if (cur_gen[i][j] == 0) {
        if (count == 3) {
          next_gen[i][j] = "X";
        }
      }
    }
  }
};
console.log(
  "Enter the seed pattern line by line without spaces (enter 0 after the last row) : ex\nXX\nXX\n0\n\n Enter:\n"
);
/*Directly enter the pattern with 0 to stop inputing 

Sample Input

XX
XX
0       

output:
XX
XX

*/
