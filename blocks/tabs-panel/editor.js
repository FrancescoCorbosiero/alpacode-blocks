(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/tabs-panel', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var items = attributes.items || [];

            function addItem() { setAttributes({ items: items.concat([{ label: '', title: '', content: '' }]) }); }
            function updateItem(i, d) { setAttributes({ items: items.map(function (it, idx) { return idx === i ? Object.assign({}, it, d) : it; }) }); }
            function removeItem(i) { setAttributes({ items: items.filter(function (_, idx) { return idx !== i; }) }); }
            function moveItem(i, dir) { var n = i + dir; if (n < 0 || n >= items.length) return; var u = items.slice(); var t = u[i]; u[i] = u[n]; u[n] = t; setAttributes({ items: u }); }

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Tabs', initialOpen: true },
                        items.map(function (item, index) {
                            return el('div', { key: index, className: 'ac-editor-item' },
                                el('div', { className: 'ac-editor-item__header' },
                                    el('strong', null, item.label || 'Tab ' + (index + 1)),
                                    el('div', { className: 'ac-editor-item__actions' },
                                        el(Button, { icon: 'arrow-up-alt2', label: 'Up', size: 'small', onClick: function () { moveItem(index, -1); } }),
                                        el(Button, { icon: 'arrow-down-alt2', label: 'Down', size: 'small', onClick: function () { moveItem(index, 1); } }),
                                        el(Button, { icon: 'trash', label: 'Remove', isDestructive: true, size: 'small', onClick: function () { removeItem(index); } })
                                    )
                                ),
                                el(TextControl, { label: 'Tab Label', value: item.label, onChange: function (v) { updateItem(index, { label: v }); } }),
                                el(TextControl, { label: 'Title', value: item.title, onChange: function (v) { updateItem(index, { title: v }); } }),
                                el(TextareaControl, { label: 'Content', value: item.content, onChange: function (v) { updateItem(index, { content: v }); } })
                            );
                        }),
                        el(Button, { variant: 'secondary', onClick: addItem, style: { marginTop: '8px' } }, '+ Add Tab')
                    )
                ),
                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('rect', { x: '2', y: '3', width: '20', height: '18' }),
                            el('line', { x1: '8', y1: '3', x2: '8', y2: '9' }),
                            el('line', { x1: '16', y1: '3', x2: '16', y2: '9' }),
                            el('line', { x1: '2', y1: '9', x2: '22', y2: '9' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Tabs Panel'),
                    el('div', { className: 'ac-editor-placeholder__text' }, items.length + ' tab(s)')
                )
            );
        },
        save: function () { return null; }
    });
})(window.wp);
