const assert = require('assert');

import Login from '../../pageObjects/Login';
import SelectGroup from '../../pageObjects/SelectGroup';
import Instructions from '../../pageObjects/Instructions';
import TestFunctions from '../../pageObjects/TestFunctions';
import GroupFunctions from '../../pageObjects/GroupFunctions';
import Part1 from '../../pageObjects/Part1';

describe('Part 1', () => {

    it('should do the part1 tests', () => {
        Login.login();
        Login.open();
        SelectGroup.setup(chromeOne);
        Instructions.setup(chromeOne);
        TestFunctions.setup(chromeOne);
        GroupFunctions.setup(chromeOne);
        Part1.setup(chromeOne);
        SelectGroup.selectGroup();
        Instructions.continue();
        TestFunctions.continue();
        GroupFunctions.selectSet();
        Part1.fillPart1();
    })
});