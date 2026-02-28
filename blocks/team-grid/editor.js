(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var RangeControl = wp.components.RangeControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/team-grid', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var items = attributes.items || [];

            function addItem() {
                setAttributes({ items: items.concat([{ name: '', role: '', bio: '', imageId: 0, imageUrl: '' }]) });
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
                        el(TextControl, { label: 'Title', value: attributes.title, onChange: function (v) { setAttributes({ title: v }); } }),
                        el(TextareaControl, { label: 'Subtitle', value: attributes.subtitle, onChange: function (v) { setAttributes({ subtitle: v }); } })
                    ),
                    el(PanelBody, { title: 'Settings', initialOpen: false },
                        el(RangeControl, { label: 'Columns', value: attributes.columns, onChange: function (v) { setAttributes({ columns: v }); }, min: 2, max: 5 })
                    ),
                    el(PanelBody, { title: 'Team Members', initialOpen: true },
                        items.map(function (item, index) {
                            return el('div', { key: index, className: 'ac-editor-item' },
                                el('div', { className: 'ac-editor-item__header' },
                                    el('strong', null, item.name || 'Member ' + (index + 1)),
                                    el('div', { className: 'ac-editor-item__actions' },
                                        el(Button, { icon: 'arrow-up-alt2', label: 'Move up', size: 'small', onClick: function () { moveItem(index, -1); } }),
                                        el(Button, { icon: 'arrow-down-alt2', label: 'Move down', size: 'small', onClick: function () { moveItem(index, 1); } }),
                                        el(Button, { icon: 'trash', label: 'Remove', isDestructive: true, size: 'small', onClick: function () { removeItem(index); } })
                                    )
                                ),
                                el(MediaUploadCheck, null,
                                    el(MediaUpload, {
                                        onSelect: function (media) { updateItem(index, { imageId: media.id, imageUrl: media.url }); },
                                        allowedTypes: ['image'],
                                        value: item.imageId,
                                        render: function (obj) {
                                            return el(Fragment, null,
                                                item.imageUrl ? el('img', { src: item.imageUrl, style: { maxWidth: '60px', marginBottom: '8px' } }) : null,
                                                el(Button, { onClick: obj.open, variant: 'secondary', size: 'small' }, item.imageUrl ? 'Replace' : 'Select Photo')
                                            );
                                        }
                                    })
                                ),
                                el(TextControl, { label: 'Name', value: item.name, onChange: function (v) { updateItem(index, { name: v }); } }),
                                el(TextControl, { label: 'Role', value: item.role, onChange: function (v) { updateItem(index, { role: v }); } }),
                                el(TextareaControl, { label: 'Bio', value: item.bio, onChange: function (v) { updateItem(index, { bio: v }); } })
                            );
                        }),
                        el(Button, { variant: 'secondary', onClick: addItem, style: { marginTop: '8px' } }, '+ Add Member')
                    )
                ),
                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('circle', { cx: '12', cy: '8', r: '4' }),
                            el('path', { d: 'M4 20c0-4 4-6 8-6s8 2 8 6' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Team Grid'),
                    el('div', { className: 'ac-editor-placeholder__text' }, items.length + ' member(s)')
                )
            );
        },
        save: function () { return null; }
    });
})(window.wp);
