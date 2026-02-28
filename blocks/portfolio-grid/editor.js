(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var RangeControl = wp.components.RangeControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/portfolio-grid', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var items = attributes.items || [];

            function addItem() { setAttributes({ items: items.concat([{ title: '', category: '', imageId: 0, imageUrl: '', url: '' }]) }); }
            function updateItem(i, d) { setAttributes({ items: items.map(function (it, idx) { return idx === i ? Object.assign({}, it, d) : it; }) }); }
            function removeItem(i) { setAttributes({ items: items.filter(function (_, idx) { return idx !== i; }) }); }
            function moveItem(i, dir) { var n = i + dir; if (n < 0 || n >= items.length) return; var u = items.slice(); var t = u[i]; u[i] = u[n]; u[n] = t; setAttributes({ items: u }); }

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Section Header', initialOpen: true },
                        el(TextControl, { label: 'Eyebrow', value: attributes.eyebrow, onChange: function (v) { setAttributes({ eyebrow: v }); } }),
                        el(TextControl, { label: 'Title', value: attributes.title, onChange: function (v) { setAttributes({ title: v }); } })
                    ),
                    el(PanelBody, { title: 'Settings', initialOpen: false },
                        el(RangeControl, { label: 'Columns', value: attributes.columns, onChange: function (v) { setAttributes({ columns: v }); }, min: 2, max: 4 })
                    ),
                    el(PanelBody, { title: 'Projects', initialOpen: true },
                        items.map(function (item, index) {
                            return el('div', { key: index, className: 'ac-editor-item' },
                                el('div', { className: 'ac-editor-item__header' },
                                    el('strong', null, item.title || 'Project ' + (index + 1)),
                                    el('div', { className: 'ac-editor-item__actions' },
                                        el(Button, { icon: 'arrow-up-alt2', label: 'Up', size: 'small', onClick: function () { moveItem(index, -1); } }),
                                        el(Button, { icon: 'arrow-down-alt2', label: 'Down', size: 'small', onClick: function () { moveItem(index, 1); } }),
                                        el(Button, { icon: 'trash', label: 'Remove', isDestructive: true, size: 'small', onClick: function () { removeItem(index); } })
                                    )
                                ),
                                el(MediaUploadCheck, null,
                                    el(MediaUpload, {
                                        onSelect: function (media) { updateItem(index, { imageId: media.id, imageUrl: media.url }); },
                                        allowedTypes: ['image'], value: item.imageId,
                                        render: function (obj) { return el(Button, { onClick: obj.open, variant: 'secondary', size: 'small' }, item.imageUrl ? 'Replace Image' : 'Select Image'); }
                                    })
                                ),
                                el(TextControl, { label: 'Title', value: item.title, onChange: function (v) { updateItem(index, { title: v }); } }),
                                el(TextControl, { label: 'Category', value: item.category, onChange: function (v) { updateItem(index, { category: v }); } }),
                                el(TextControl, { label: 'URL', value: item.url, onChange: function (v) { updateItem(index, { url: v }); } })
                            );
                        }),
                        el(Button, { variant: 'secondary', onClick: addItem, style: { marginTop: '8px' } }, '+ Add Project')
                    )
                ),
                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('rect', { x: '2', y: '2', width: '9', height: '9' }), el('rect', { x: '13', y: '2', width: '9', height: '9' }),
                            el('rect', { x: '2', y: '13', width: '9', height: '9' }), el('rect', { x: '13', y: '13', width: '9', height: '9' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Portfolio Grid'),
                    el('div', { className: 'ac-editor-placeholder__text' }, items.length + ' project(s)')
                )
            );
        },
        save: function () { return null; }
    });
})(window.wp);
