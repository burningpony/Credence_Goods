const assert = require('assert');

import Login from '../../pageObjects/Login';
import SelectGroup from '../../pageObjects/SelectGroup';
import Instructions from '../../pageObjects/Instructions';

describe('Instructions', () => {

    it('should show instructions and assign a role', () => {
        Login.login();
        Login.open();
        SelectGroup.setup(chromeOne);
        Instructions.setup(chromeOne);
        SelectGroup.selectGroup();
        assert.strictEqual(SelectGroup.groupNameLabel().getText(), 'Group Name:');
        assert.equal((Instructions.roleLabel().getText().indexOf("You Will be the player:")>-1),true);
    })
});