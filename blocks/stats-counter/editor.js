(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var SelectControl = wp.components.SelectControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/stats-counter', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var items = attributes.items || [];

            function addItem() {
                setAttributes({
                    items: items.concat([{ value: 0, suffix: '', label: '' }])
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
                    el(PanelBody, { title: 'Settings', initialOpen: false },
                        el(SelectControl, {
                            label: 'Variant',
                            value: attributes.variant,
                            options: [
                                { label: 'Light', value: 'light' },
                                { label: 'Dark', value: 'dark' }
                            ],
                            onChange: function (v) { setAttributes({ variant: v }); }
                        })
                    ),
                    el(PanelBody, { title: 'Stats', initialOpen: true },
                        items.map(function (item, index) {
                            return el('div', { key: index, className: 'ac-editor-item' },
                                el('div', { className: 'ac-editor-item__header' },
                                    el('strong', null, 'Stat ' + (index + 1)),
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
                                    label: 'Value',
                                    type: 'number',
                                    value: String(item.value),
                                    onChange: function (v) { updateItem(index, { value: parseInt(v, 10) || 0 }); }
                                }),
                                el(TextControl, {
                                    label: 'Suffix',
                                    value: item.suffix,
                                    onChange: function (v) { updateItem(index, { suffix: v }); }
                                }),
                                el(TextControl, {
                                    label: 'Label',
                                    value: item.label,
                                    onChange: function (v) { updateItem(index, { label: v }); }
                                })
                            );
                        }),
                        el(Button, {
                            variant: 'secondary',
                            onClick: addItem,
                            style: { marginTop: '8px' }
                        }, '+ Add Stat')
                    )
                ),

                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('rect', { x: '3', y: '12', width: '4', height: '9' }),
                            el('rect', { x: '10', y: '6', width: '4', height: '15' }),
                            el('rect', { x: '17', y: '3', width: '4', height: '18' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Stats Counter'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        items.length + ' stat(s)'
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
