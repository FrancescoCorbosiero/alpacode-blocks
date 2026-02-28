(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/faq-accordion', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var items = attributes.items || [];

            function addItem() {
                setAttributes({
                    items: items.concat([{ question: '', answer: '' }])
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
                        })
                    ),
                    el(PanelBody, { title: 'FAQ Items', initialOpen: true },
                        items.map(function (item, index) {
                            return el('div', { key: index, className: 'ac-editor-item' },
                                el('div', { className: 'ac-editor-item__header' },
                                    el('strong', null, 'Q' + (index + 1)),
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
                                    label: 'Question',
                                    value: item.question,
                                    onChange: function (v) { updateItem(index, { question: v }); }
                                }),
                                el(TextareaControl, {
                                    label: 'Answer',
                                    value: item.answer,
                                    onChange: function (v) { updateItem(index, { answer: v }); }
                                })
                            );
                        }),
                        el(Button, {
                            variant: 'secondary',
                            onClick: addItem,
                            style: { marginTop: '8px' }
                        }, '+ Add Question')
                    )
                ),

                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('line', { x1: '3', y1: '6', x2: '21', y2: '6' }),
                            el('line', { x1: '12', y1: '2', x2: '12', y2: '10' }),
                            el('line', { x1: '3', y1: '18', x2: '21', y2: '18' }),
                            el('line', { x1: '3', y1: '12', x2: '21', y2: '12' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'FAQ Accordion'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        items.length + ' question(s)'
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
