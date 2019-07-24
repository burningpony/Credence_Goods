const assert = require('assert');

import Login from '../../pageObjects/Login';
import SelectGroup from '../../pageObjects/SelectGroup';

describe('Select Group', () => {
    it('should login', () => {
        Login.login();
        SelectGroup.setup(chromeOne);
        assert.strictEqual(SelectGroup.groupNameLabel().getText(), 'Group Name:');
    })

    it('should choose a group', () => {
        Login.open();
        SelectGroup.setup(chromeOne);
        SelectGroup.selectGroup();
        assert.strictEqual(SelectGroup.groupNameLabel().getText(), 'Group Name:');
    })
});