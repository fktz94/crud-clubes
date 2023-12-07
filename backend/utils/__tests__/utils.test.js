/// <reference types='jest' />

const { getRandomID } = require('../utils');

describe.only('test getRandomID', () => {
  it('should return a random id that is not included in the object provided', () => {
    const dataArr = [
      { id: 10, name: 'Club1' },
      { id: 45, name: 'Club2' },
      { id: 196, name: 'Club3' },
      { id: 432, name: 'Club4' },
    ];
    const idArray = dataArr.map((el) => el.id);
    expect(getRandomID(dataArr)).toBeGreaterThanOrEqual(0);
    expect(idArray.includes(getRandomID(dataArr))).not.toBe(true);
    expect(getRandomID(dataArr)).toBeLessThanOrEqual(500);
  });

  it('should return a random id that is not included in the array provided', () => {
    const idArray = [4, 67, 201, 456, 32];
    expect(getRandomID(idArray)).toBeGreaterThanOrEqual(0);
    expect(idArray.includes(getRandomID(idArray))).not.toBe(true);
    expect(getRandomID(idArray)).toBeLessThanOrEqual(500);
  });

  it('should return a random id that is different from the number provided', () => {
    expect(getRandomID(12)).toBeGreaterThanOrEqual(0);
    expect(getRandomID(12)).toBeLessThanOrEqual(500);
    expect(getRandomID(12)).not.toBe(12);
  });

  it('should return a random id, without information provided', () => {
    expect(getRandomID()).toBeGreaterThanOrEqual(0);
    expect(getRandomID()).toBeLessThanOrEqual(500);
  });
});
