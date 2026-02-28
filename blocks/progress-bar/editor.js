(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var RangeControl = wp.components.RangeControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/progress-bar', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var items = attributes.items || [];

            function addItem() {
                setAttributes({
                    items: items.concat([{ label: '', value: 50 }])
                });
            }

            function updateItem(index, data) {
                var updated = items.map(function (item, i) {
                    return i === index ? Object.assign({}, item, data) : item;
                });
                setAttributes({ items: updated });
            }

            function removeItem(index) {
                setAttributes({
                    items: items.filter(function (_, i) { return i !== index; })
                });
            }

            function moveItem(index, direction) {
                var newIndex = index + direction;
                if (newIndex < 0 || newIndex >= items.length) return;
                var updated = items.slice();
                var temp = updated[index];
                updated[index] = updated[newIndex];
                updated[newIndex] = temp;
                setAttributes({ items: updated });
            }

            return el(Fragment, null,

                el(InspectorControls, null,
                    el(PanelBody, { title: 'Progress Bars', initialOpen: true },
                        items.map(function (item, index) {
                            return el('div', { key: index, className: 'ac-editor-item' },
                                el('div', { className: 'ac-editor-item__header' },
                                    el('strong', null, 'Bar ' + (index + 1)),
                                    el('div', { className: 'ac-editor-item__actions' },
                                        el(Button, {
                                            icon: 'arrow-up-alt2',
                                            label: 'Move up',
                                            size: 'small',
                                            onClick: function () { moveItem(index, -1); }
                                        }),
                                        el(Button, {
                                            icon: 'arrow-down-alt2',
                                            label: 'Move down',
                                            size: 'small',
                                            onClick: function () { moveItem(index, 1); }
                                        }),
                                        el(Button, {
                                            icon: 'trash',
                                            label: 'Remove',
                                            isDestructive: true,
                                            size: 'small',
                                            onClick: function () { removeItem(index); }
                                        })
                                    )
                                ),
                                el(TextControl, {
                                    label: 'Label',
                                    value: item.label,
                                    onChange: function (v) { updateItem(index, { label: v }); }
                                }),
                                el(RangeControl, {
                                    label: 'Value (%)',
                                    value: item.value,
                                    min: 0,
                                    max: 100,
                                    onChange: function (v) { updateItem(index, { value: v }); }
                                })
                            );
                        }),
                        el(Button, {
                            variant: 'secondary',
                            onClick: addItem,
                            style: { marginTop: '8px' }
                        }, '+ Add Bar')
                    )
                ),

                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('line', { x1: '3', y1: '8', x2: '21', y2: '8' }),
                            el('line', { x1: '3', y1: '12', x2: '16', y2: '12' }),
                            el('line', { x1: '3', y1: '16', x2: '19', y2: '16' }),
                            el('circle', { cx: '21', cy: '8', r: '1' }),
                            el('circle', { cx: '16', cy: '12', r: '1' }),
                            el('circle', { cx: '19', cy: '16', r: '1' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Progress Bar'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        items.length + ' bar(s) configured'
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
