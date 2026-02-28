(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var ToggleControl = wp.components.ToggleControl;
    var RangeControl = wp.components.RangeControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/testimonials-slider', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var items = attributes.items || [];

            function addItem() {
                setAttributes({
                    items: items.concat([{ quote: '', author: '', role: '' }])
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
                    el(PanelBody, { title: 'Settings', initialOpen: false },
                        el(ToggleControl, {
                            label: 'Autoplay',
                            checked: attributes.autoplay,
                            onChange: function (v) { setAttributes({ autoplay: v }); }
                        }),
                        attributes.autoplay ? el(RangeControl, {
                            label: 'Autoplay Speed (ms)',
                            value: attributes.autoplaySpeed,
                            onChange: function (v) { setAttributes({ autoplaySpeed: v }); },
                            min: 3000,
                            max: 10000,
                            step: 1000
                        }) : null
                    ),
                    el(PanelBody, { title: 'Testimonials', initialOpen: true },
                        items.map(function (item, index) {
                            return el('div', { key: index, className: 'ac-editor-item' },
                                el('div', { className: 'ac-editor-item__header' },
                                    el('strong', null, 'Testimonial ' + (index + 1)),
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
                                el(TextareaControl, {
                                    label: 'Quote',
                                    value: item.quote,
                                    onChange: function (v) { updateItem(index, { quote: v }); }
                                }),
                                el(TextControl, {
                                    label: 'Author',
                                    value: item.author,
                                    onChange: function (v) { updateItem(index, { author: v }); }
                                }),
                                el(TextControl, {
                                    label: 'Role',
                                    value: item.role,
                                    onChange: function (v) { updateItem(index, { role: v }); }
                                })
                            );
                        }),
                        el(Button, {
                            variant: 'secondary',
                            onClick: addItem,
                            style: { marginTop: '8px' }
                        }, '+ Add Testimonial')
                    )
                ),

                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('path', { d: 'M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z' }),
                            el('path', { d: 'M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Testimonials'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        items.length + ' testimonial(s)'
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
