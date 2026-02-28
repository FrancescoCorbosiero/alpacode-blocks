(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var RangeControl = wp.components.RangeControl;
    var SelectControl = wp.components.SelectControl;
    var ToggleControl = wp.components.ToggleControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/feature-columns', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var items = attributes.items || [];

            function addItem() {
                setAttributes({
                    items: items.concat([{ title: '', description: '' }])
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
                    el(PanelBody, { title: 'Section Header', initialOpen: true },
                        el(TextControl, {
                            label: 'Eyebrow',
                            value: attributes.eyebrow,
                            onChange: function (v) { setAttributes({ eyebrow: v }); }
                        }),
                        el(TextControl, {
                            label: 'Title',
                            value: attributes.title,
                            onChange: function (v) { setAttributes({ title: v }); }
                        }),
                        el(TextareaControl, {
                            label: 'Subtitle',
                            value: attributes.subtitle,
                            onChange: function (v) { setAttributes({ subtitle: v }); }
                        })
                    ),
                    el(PanelBody, { title: 'Settings', initialOpen: false },
                        el(RangeControl, {
                            label: 'Columns',
                            value: attributes.columns,
                            onChange: function (v) { setAttributes({ columns: v }); },
                            min: 2,
                            max: 4
                        }),
                        el(ToggleControl, {
                            label: 'Show Numbers',
                            checked: attributes.showNumbers,
                            onChange: function (v) { setAttributes({ showNumbers: v }); }
                        }),
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
                    el(PanelBody, { title: 'Feature Items', initialOpen: true },
                        items.map(function (item, index) {
                            return el('div', { key: index, className: 'ac-editor-item' },
                                el('div', { className: 'ac-editor-item__header' },
                                    el('strong', null, 'Feature ' + (index + 1)),
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
                                    label: 'Title',
                                    value: item.title,
                                    onChange: function (v) { updateItem(index, { title: v }); }
                                }),
                                el(TextareaControl, {
                                    label: 'Description',
                                    value: item.description,
                                    onChange: function (v) { updateItem(index, { description: v }); }
                                })
                            );
                        }),
                        el(Button, {
                            variant: 'secondary',
                            onClick: addItem,
                            style: { marginTop: '8px' }
                        }, '+ Add Feature')
                    )
                ),

                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('line', { x1: '4', y1: '3', x2: '4', y2: '21' }),
                            el('line', { x1: '12', y1: '3', x2: '12', y2: '21' }),
                            el('line', { x1: '20', y1: '3', x2: '20', y2: '21' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Feature Columns'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        items.length + ' features · ' + attributes.columns + ' columns'
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
