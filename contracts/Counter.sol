// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Counter {
  uint counter;

  constructor() public {
    counter = 0; // Initialise the counter to 0
  }

  function increment() public {
    counter++;
  }

  function getCounter() public view returns (uint) {
    return counter;
  }
}