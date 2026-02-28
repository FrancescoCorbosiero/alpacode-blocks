(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/timeline', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var items = attributes.items || [];

            function addItem() { setAttributes({ items: items.concat([{ label: '', title: '', description: '' }]) }); }
            function updateItem(i, d) { setAttributes({ items: items.map(function (it, idx) { return idx === i ? Object.assign({}, it, d) : it; }) }); }
            function removeItem(i) { setAttributes({ items: items.filter(function (_, idx) { return idx !== i; }) }); }
            function moveItem(i, dir) { var n = i + dir; if (n < 0 || n >= items.length) return; var u = items.slice(); var t = u[i]; u[i] = u[n]; u[n] = t; setAttributes({ items: u }); }

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Section Header', initialOpen: true },
                        el(TextControl, { label: 'Eyebrow', value: attributes.eyebrow, onChange: function (v) { setAttributes({ eyebrow: v }); } }),
                        el(TextControl, { label: 'Title', value: attributes.title, onChange: function (v) { setAttributes({ title: v }); } })
                    ),
                    el(PanelBody, { title: 'Timeline Steps', initialOpen: true },
                        items.map(function (item, index) {
                            return el('div', { key: index, className: 'ac-editor-item' },
                                el('div', { className: 'ac-editor-item__header' },
                                    el('strong', null, item.title || 'Step ' + (index + 1)),
                                    el('div', { className: 'ac-editor-item__actions' },
                                        el(Button, { icon: 'arrow-up-alt2', label: 'Up', size: 'small', onClick: function () { moveItem(index, -1); } }),
                                        el(Button, { icon: 'arrow-down-alt2', label: 'Down', size: 'small', onClick: function () { moveItem(index, 1); } }),
                                        el(Button, { icon: 'trash', label: 'Remove', isDestructive: true, size: 'small', onClick: function () { removeItem(index); } })
                                    )
                                ),
                                el(TextControl, { label: 'Label (number/date)', value: item.label, onChange: function (v) { updateItem(index, { label: v }); } }),
                                el(TextControl, { label: 'Title', value: item.title, onChange: function (v) { updateItem(index, { title: v }); } }),
                                el(TextareaControl, { label: 'Description', value: item.description, onChange: function (v) { updateItem(index, { description: v }); } })
                            );
                        }),
                        el(Button, { variant: 'secondary', onClick: addItem, style: { marginTop: '8px' } }, '+ Add Step')
                    )
                ),
                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('line', { x1: '12', y1: '2', x2: '12', y2: '22' }),
                            el('circle', { cx: '12', cy: '6', r: '2' }),
                            el('circle', { cx: '12', cy: '12', r: '2' }),
                            el('circle', { cx: '12', cy: '18', r: '2' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Timeline'),
                    el('div', { className: 'ac-editor-placeholder__text' }, items.length + ' step(s)')
                )
            );
        },
        save: function () { return null; }
    });
})(window.wp);
