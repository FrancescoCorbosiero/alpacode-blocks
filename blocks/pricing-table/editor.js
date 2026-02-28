(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var ToggleControl = wp.components.ToggleControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/pricing-table', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var items = attributes.items || [];

            function addItem() {
                setAttributes({ items: items.concat([{ name: '', price: '', period: '/mo', description: '', features: '', ctaText: 'Get Started', ctaUrl: '#', highlighted: false }]) });
            }
            function updateItem(index, data) {
                var updated = items.map(function (item, i) { return i === index ? Object.assign({}, item, data) : item; });
                setAttributes({ items: updated });
            }
            function removeItem(index) {
                setAttributes({ items: items.filter(function (_, i) { return i !== index; }) });
            }
            function moveItem(index, direction) {
                var n = index + direction;
                if (n < 0 || n >= items.length) return;
                var u = items.slice(); var t = u[index]; u[index] = u[n]; u[n] = t;
                setAttributes({ items: u });
            }

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Section Header', initialOpen: true },
                        el(TextControl, { label: 'Eyebrow', value: attributes.eyebrow, onChange: function (v) { setAttributes({ eyebrow: v }); } }),
                        el(TextControl, { label: 'Title', value: attributes.title, onChange: function (v) { setAttributes({ title: v }); } })
                    ),
                    el(PanelBody, { title: 'Plans', initialOpen: true },
                        items.map(function (item, index) {
                            return el('div', { key: index, className: 'ac-editor-item' },
                                el('div', { className: 'ac-editor-item__header' },
                                    el('strong', null, item.name || 'Plan ' + (index + 1)),
                                    el('div', { className: 'ac-editor-item__actions' },
                                        el(Button, { icon: 'arrow-up-alt2', label: 'Move up', size: 'small', onClick: function () { moveItem(index, -1); } }),
                                        el(Button, { icon: 'arrow-down-alt2', label: 'Move down', size: 'small', onClick: function () { moveItem(index, 1); } }),
                                        el(Button, { icon: 'trash', label: 'Remove', isDestructive: true, size: 'small', onClick: function () { removeItem(index); } })
                                    )
                                ),
                                el(TextControl, { label: 'Plan Name', value: item.name, onChange: function (v) { updateItem(index, { name: v }); } }),
                                el(TextControl, { label: 'Price', value: item.price, onChange: function (v) { updateItem(index, { price: v }); } }),
                                el(TextControl, { label: 'Period', value: item.period, onChange: function (v) { updateItem(index, { period: v }); } }),
                                el(TextControl, { label: 'Description', value: item.description, onChange: function (v) { updateItem(index, { description: v }); } }),
                                el(TextareaControl, { label: 'Features (one per line)', value: item.features, onChange: function (v) { updateItem(index, { features: v }); } }),
                                el(TextControl, { label: 'CTA Text', value: item.ctaText, onChange: function (v) { updateItem(index, { ctaText: v }); } }),
                                el(TextControl, { label: 'CTA URL', value: item.ctaUrl, onChange: function (v) { updateItem(index, { ctaUrl: v }); } }),
                                el(ToggleControl, { label: 'Highlighted', checked: item.highlighted, onChange: function (v) { updateItem(index, { highlighted: v }); } })
                            );
                        }),
                        el(Button, { variant: 'secondary', onClick: addItem, style: { marginTop: '8px' } }, '+ Add Plan')
                    )
                ),
                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('rect', { x: '2', y: '3', width: '6', height: '18' }),
                            el('rect', { x: '9', y: '3', width: '6', height: '18' }),
                            el('rect', { x: '16', y: '3', width: '6', height: '18' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Pricing Table'),
                    el('div', { className: 'ac-editor-placeholder__text' }, items.length + ' plan(s)')
                )
            );
        },
        save: function () { return null; }
    });
})(window.wp);
