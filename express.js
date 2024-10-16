const express = require("express");

const app = express();

app.use(express.json());

app.get("/mean", (req, res) => {
  nums = req.query.nums;
  // First Error Check: Check that nums is in query string
  if (!nums) {
    return res.status(400).json({ err: "nums are required" });
  }
  // Create an array of numbers (not string) by splitting on the commas
  const numArray = nums.split(",").map((num) => parseFloat(num));

  // Second Error Check: Check if a non-number was entered
  for (const num of numArray) {
    if (isNaN(num)) {
      return res.status(400).json({ err: `${num} is not a number` });
    }
  }
  //Calculate mean:
  const sum = numArray.reduce((partialSum, num) => partialSum + num, 0);
  const mean = sum / numArray.length;
  // Turn result into JSON
  return res.json({
    operation: "mean",
    result: mean,
  });
});

app.get("/median", (req, res) => {
  nums = req.query.nums;
  // Check for nums in query string
  if (!nums) {
    return res.status(400).json({ err: "nums are required" });
  }
  // Create number array
  const numArray = nums.split(",").map((num) => parseFloat(num));
  // Check for non-numbers
  for (const num of numArray) {
    if (isNaN(num)) {
      return res.status(400).json({ err: `${num} is not a number` });
    }
  }
  // Calculate the median
  const sorted = numArray.sort((a, b) => a - b);
  const middleIdx = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return res.json({
      operation: "median",
      result: (sorted[middleIdx - 1] + sorted[middleIdx]) / 2,
    });
  }
  return res.json({
    operation: "median",
    result: sorted[middleIdx],
  });
});

app.get("/mode", (req, res) => {
  nums = req.query.nums;
  // Check for nums in query string
  if (!nums) {
    return res.status(400).json({ err: "nums are required" });
  }
  // Create number array
  const numArray = nums.split(",").map((num) => parseFloat(num));
  // Check for non-numbers
  for (const num of numArray) {
    if (isNaN(num)) {
      return res.status(400).json({ err: `${num} is not a number` });
    }
  }
  //Calculate the mode...PLEASE NOTE this does not take into account bimodal arrays
  //Create an empty object to hold the counts
  const counts = {};
  //count the occurrences of each number in oour numArray
  numArray.forEach((num) => {
    counts[num] = (counts[num] || 0) + 1;
  });
  //Find the highest count...
  let highCount = 0;
  let mode = null;
  for (const num in counts) {
    if (counts[num] > highCount) {
      highCount = counts[num];
      mode = Number(num); //mode is equal to the number we now know has the maximum count
    }
  }
  return res.json({
    operation: "mode",
    result: highCount === 1 ? null : mode, //Return null if there is no numbers repeated in the array
  });
});

// app.listen should always be on the bottom of the page!
app.listen(3000, () => {
  console.log("App on Port 3000");
});

module.exports = app;
