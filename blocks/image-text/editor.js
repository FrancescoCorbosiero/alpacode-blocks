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
    var SelectControl = wp.components.SelectControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/image-text', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(Fragment, null,

                el(InspectorControls, null,
                    el(PanelBody, { title: 'Content', initialOpen: true },
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
                            label: 'Description',
                            value: attributes.description,
                            onChange: function (v) { setAttributes({ description: v }); }
                        }),
                        el(TextControl, {
                            label: 'CTA Text',
                            value: attributes.ctaText,
                            onChange: function (v) { setAttributes({ ctaText: v }); }
                        }),
                        el(TextControl, {
                            label: 'CTA URL',
                            value: attributes.ctaUrl,
                            onChange: function (v) { setAttributes({ ctaUrl: v }); }
                        })
                    ),
                    el(PanelBody, { title: 'Image', initialOpen: true },
                        el(MediaUploadCheck, null,
                            el(MediaUpload, {
                                onSelect: function (media) {
                                    setAttributes({
                                        imageId: media.id,
                                        imageUrl: media.url
                                    });
                                },
                                allowedTypes: ['image'],
                                value: attributes.imageId,
                                render: function (obj) {
                                    return el(Fragment, null,
                                        attributes.imageUrl
                                            ? el('img', {
                                                src: attributes.imageUrl,
                                                style: { maxWidth: '100%', marginBottom: '8px' }
                                            })
                                            : null,
                                        el(Button, {
                                            onClick: obj.open,
                                            variant: 'secondary'
                                        }, attributes.imageUrl ? 'Replace Image' : 'Select Image'),
                                        attributes.imageId
                                            ? el(Button, {
                                                onClick: function () {
                                                    setAttributes({ imageId: 0, imageUrl: '' });
                                                },
                                                isDestructive: true,
                                                variant: 'tertiary',
                                                style: { marginLeft: '8px' }
                                            }, 'Remove')
                                            : null
                                    );
                                }
                            })
                        )
                    ),
                    el(PanelBody, { title: 'Settings', initialOpen: false },
                        el(SelectControl, {
                            label: 'Image Position',
                            value: attributes.imagePosition,
                            options: [
                                { label: 'Left', value: 'left' },
                                { label: 'Right', value: 'right' }
                            ],
                            onChange: function (v) { setAttributes({ imagePosition: v }); }
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
                    )
                ),

                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('rect', { x: '2', y: '3', width: '9', height: '18' }),
                            el('line', { x1: '14', y1: '6', x2: '22', y2: '6' }),
                            el('line', { x1: '14', y1: '10', x2: '22', y2: '10' }),
                            el('line', { x1: '14', y1: '14', x2: '20', y2: '14' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Image + Text'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        'Image ' + attributes.imagePosition + ' · ' + (attributes.title || 'No title')
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
