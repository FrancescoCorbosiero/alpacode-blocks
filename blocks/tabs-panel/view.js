import { store, getContext } from '@wordpress/interactivity';

store('alpacode/tabs-panel', {
    state: {
        get isActiveTab_0() { return getContext().activeTab === 0; },
        get isActiveTab_1() { return getContext().activeTab === 1; },
        get isActiveTab_2() { return getContext().activeTab === 2; },
        get isActiveTab_3() { return getContext().activeTab === 3; },
        get isActiveTab_4() { return getContext().activeTab === 4; },
        get isActiveTab_5() { return getContext().activeTab === 5; },
        get isActivePanel_0() { return getContext().activeTab === 0; },
        get isActivePanel_1() { return getContext().activeTab === 1; },
        get isActivePanel_2() { return getContext().activeTab === 2; },
        get isActivePanel_3() { return getContext().activeTab === 3; },
        get isActivePanel_4() { return getContext().activeTab === 4; },
        get isActivePanel_5() { return getContext().activeTab === 5; },
    },
    actions: {
        switchTab(event) {
            const ctx = getContext();
            const index = parseInt(event.target.dataset.tab, 10);
            if (!isNaN(index)) {
                ctx.activeTab = index;
            }
        },
    },
});
