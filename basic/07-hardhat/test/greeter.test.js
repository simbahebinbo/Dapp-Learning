const { expect } = require('chai');

describe('Greeter', function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory('Greeter');
    const greeter = await Greeter.deploy('Hello, world!');

    await greeter.deployed();
    expect(await greeter.greet()).to.equal('Hello, world!');

    await greeter.setGreeting('hello Dapp-Learning!');
    expect(await greeter.greet()).to.equal('hello Dapp-Learning!');
  });
});
