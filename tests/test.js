let betValue, newBetValue, randomUp, randomDown, gameResult;
const assert = require('assert');
const timeout = 2000;

describe('Test slot machine', () => {
  before((browser, done) => {
    console.log('Test started.');

    return done();
  });
  after((browser, done) => {
    if (browser.sessionId) {
      browser.end(() => done());
    } else {
      done();
    }
  });
  it('opens homepage', browser => {
    return browser
      .url('http://slotmachinescript.com/')
      .pause(2000);
  });

  it('maximizes browser window', browser => {
    return browser
      .maximizeWindow();
  });

  it('gets initial bet value', browser => {
    return browser.page.pages().getBetValue(timeout);
  });

  it('gets initial bets-left value', browser => {
    return browser.page.pages().getBetsLeftValue();
  });

  it('increases bet value', browser => {
    randomUp = Math.floor(Math.random() * 9) + 1;
    for (let i = 0; i < randomUp; i++) {
      browser.page.pages().increaseBetValue(timeout)
        .api.pause(1000);
    }
  });

  it('gets new bet value', browser => {
    betValue = browser.globals.betValue; //assign value before change for later checks
    return browser.page.pages()
      .getBetValue(timeout)
  });

  it('checks if new bet value is correct and decreases bet value', browser => {
    newBetValue = browser.globals.betValue; //assign value before change for later checks
    browser.page.pages().compareBetValues(betValue, randomUp, newBetValue);
    randomDown = Math.floor(Math.random()*randomUp) + 1;
    for (let i = 0; i < randomDown; i++) {
      browser.page.pages().decreaseBetValue(timeout);
    }
  });

  it('gets new bet value', browser => {
    return browser.page.pages().getBetValue(timeout);
  });

  it('checks if new bet value is correct and spins the wheel', browser => {
    browser.assert.equal(newBetValue-randomDown, browser.globals.betValue);
    return browser.page.pages().spin(timeout);
  });

  it('checks if won', browser => {
     gameResult = browser.page.pages().checkIfWon();
  });

  it('checks if new left-bets value is correct', (browser) => {
    browser.page.pages().checkIfBetsLeftCorrect()
  });
});