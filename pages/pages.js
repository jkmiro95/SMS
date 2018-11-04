const assert = require('assert');

const slotMachineCommands = {
  getBetsLeftValue() {
    this
      .waitForElementPresent('@betsLeft', timeout)
      .moveToElement('@betsLeft',0,0)
      .api.getText('@betsLeft', (result) => {
        this.api.globals.betsLeft = parseInt(result.value);
      });
  },

  getBetValue(timeout) {
    this
      .waitForElementPresent('@betValue', timeout)
      .moveToElement('@betValue',0,0)
      .getText('@betValue', (result) => {
        this.api.globals.betValue = parseInt(result.value);
      });
  },

  checkIfWon() {
    this.api.elements('CSS', '@prizeWon', (results) => {
      if (results) {
        return this.getWonValue(results);
      }
    })
  },

  getWonValue(results) {
    if (results.length() > 0) {
      const prizeValue = '@prizeWon' + ' > span';
      this.getValue(prizeValue, (result) => {
        return this.checkIfLastWinCorrect(result);
      })
    }
  },

  checkIfLastWinCorrect(wonValue) {
    return this.getValue('@lastWin', result => {
      assert.equal(parseInt(result.value), wonValue)
    })
  },

  checkIfBetsLeftCorrect() {
    const expectedBetsLeft = this.api.globals.betsLeft + this.api.globals.wonValue - this.api.globals.betValue;

    return this.getText('@betsLeft', result => {
      assert.equal(parseInt(result.value), expectedBetsLeft)
    })
  },

  compareBetValues(old, add, newValue) {
    return assert.equal(old+add, newValue);
},

  increaseBetValue(timeout) {
    return this
      .waitForElementPresent('@increaseBet', timeout)
      .click('@increaseBet')
  },

  decreaseBetValue(timeout) {
    return this
      .waitForElementPresent('@decreaseBet', timeout)
      .click('@decreaseBet')
  },

  spin(timeout) {
    return this
      .waitForElementPresent('@spinButton', timeout)
      .click('@spinButton')
      .api.pause(10000);
  }
};


module.exports = {
  commands: [slotMachineCommands],
  elements: {
    spinButton: '#spinButton',
    lastWinValue: '#lastWin',
    betValue: '#bet',
    betsLeft: '#credits',
    prize: '.prizes_list_slotMachine',
    increaseBet: '#betSpinUp',
    decreaseBet: '#betSpinDown',
  }
};