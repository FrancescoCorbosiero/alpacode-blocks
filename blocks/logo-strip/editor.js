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
    var SelectControl = wp.components.SelectControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/logo-strip', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var items = attributes.items || [];

            function addItem() {
                setAttributes({
                    items: items.concat([{ imageId: 0, imageUrl: '', alt: '' }])
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

            return el(Fragment, null,

                el(InspectorControls, null,
                    el(PanelBody, { title: 'Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Eyebrow Text',
                            value: attributes.eyebrow,
                            onChange: function (v) { setAttributes({ eyebrow: v }); }
                        }),
                        el(RangeControl, {
                            label: 'Logos per row',
                            value: attributes.columns,
                            onChange: function (v) { setAttributes({ columns: v }); },
                            min: 3,
                            max: 7
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
                    el(PanelBody, { title: 'Logos', initialOpen: true },
                        items.map(function (item, index) {
                            return el('div', { key: index, className: 'ac-editor-item' },
                                el('div', { className: 'ac-editor-item__header' },
                                    el('strong', null, 'Logo ' + (index + 1)),
                                    el('div', { className: 'ac-editor-item__actions' },
                                        el(Button, {
                                            icon: 'trash',
                                            label: 'Remove',
                                            isDestructive: true,
                                            size: 'small',
                                            onClick: function () { removeItem(index); }
                                        })
                                    )
                                ),
                                el(MediaUploadCheck, null,
                                    el(MediaUpload, {
                                        onSelect: function (media) {
                                            updateItem(index, {
                                                imageId: media.id,
                                                imageUrl: media.url,
                                                alt: media.alt || ''
                                            });
                                        },
                                        allowedTypes: ['image'],
                                        value: item.imageId,
                                        render: function (obj) {
                                            return el(Fragment, null,
                                                item.imageUrl
                                                    ? el('img', {
                                                        src: item.imageUrl,
                                                        style: { maxWidth: '80px', marginBottom: '8px' }
                                                    })
                                                    : null,
                                                el(Button, {
                                                    onClick: obj.open,
                                                    variant: 'secondary',
                                                    size: 'small'
                                                }, item.imageUrl ? 'Replace' : 'Select Logo')
                                            );
                                        }
                                    })
                                ),
                                el(TextControl, {
                                    label: 'Alt text',
                                    value: item.alt,
                                    onChange: function (v) { updateItem(index, { alt: v }); }
                                })
                            );
                        }),
                        el(Button, {
                            variant: 'secondary',
                            onClick: addItem,
                            style: { marginTop: '8px' }
                        }, '+ Add Logo')
                    )
                ),

                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('rect', { x: '2', y: '6', width: '5', height: '5' }),
                            el('rect', { x: '9.5', y: '6', width: '5', height: '5' }),
                            el('rect', { x: '17', y: '6', width: '5', height: '5' }),
                            el('rect', { x: '2', y: '13', width: '5', height: '5' }),
                            el('rect', { x: '9.5', y: '13', width: '5', height: '5' }),
                            el('rect', { x: '17', y: '13', width: '5', height: '5' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Logo Strip'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        items.length + ' logo(s)'
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
