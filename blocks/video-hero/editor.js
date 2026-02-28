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
    var SelectControl = wp.components.SelectControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/video-hero', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Content', initialOpen: true },
                        el(TextControl, { label: 'Eyebrow', value: attributes.eyebrow, onChange: function (v) { setAttributes({ eyebrow: v }); } }),
                        el(TextControl, { label: 'Title', value: attributes.title, onChange: function (v) { setAttributes({ title: v }); } }),
                        el(TextareaControl, { label: 'Subtitle', value: attributes.subtitle, onChange: function (v) { setAttributes({ subtitle: v }); } }),
                        el(TextControl, { label: 'CTA Text', value: attributes.ctaText, onChange: function (v) { setAttributes({ ctaText: v }); } }),
                        el(TextControl, { label: 'CTA URL', value: attributes.ctaUrl, onChange: function (v) { setAttributes({ ctaUrl: v }); } })
                    ),
                    el(PanelBody, { title: 'Video', initialOpen: true },
                        el(MediaUploadCheck, null,
                            el(MediaUpload, {
                                onSelect: function (media) { setAttributes({ videoId: media.id, videoUrl: media.url }); },
                                allowedTypes: ['video'],
                                value: attributes.videoId,
                                render: function (obj) {
                                    return el(Fragment, null,
                                        attributes.videoUrl ? el('div', { style: { fontSize: '12px', color: '#71717A', marginBottom: '8px' } }, 'Video: ' + attributes.videoUrl.split('/').pop()) : null,
                                        el(Button, { onClick: obj.open, variant: 'secondary' }, attributes.videoUrl ? 'Replace Video' : 'Select Video')
                                    );
                                }
                            })
                        ),
                        el(MediaUploadCheck, null,
                            el(MediaUpload, {
                                onSelect: function (media) { setAttributes({ posterImageId: media.id, posterImageUrl: media.url }); },
                                allowedTypes: ['image'],
                                value: attributes.posterImageId,
                                render: function (obj) {
                                    return el(Fragment, null,
                                        attributes.posterImageUrl ? el('img', { src: attributes.posterImageUrl, style: { maxWidth: '100%', marginTop: '8px', marginBottom: '8px' } }) : null,
                                        el(Button, { onClick: obj.open, variant: 'secondary', style: { marginTop: '8px' } }, attributes.posterImageUrl ? 'Replace Poster' : 'Select Poster Image')
                                    );
                                }
                            })
                        )
                    ),
                    el(PanelBody, { title: 'Settings', initialOpen: false },
                        el(RangeControl, { label: 'Overlay Opacity (%)', value: attributes.overlayOpacity, onChange: function (v) { setAttributes({ overlayOpacity: v }); }, min: 40, max: 95, step: 5 }),
                        el(SelectControl, { label: 'Height', value: attributes.height, options: [{ label: '100vh', value: '100vh' }, { label: '90vh', value: '90vh' }, { label: '80vh', value: '80vh' }, { label: '70vh', value: '70vh' }], onChange: function (v) { setAttributes({ height: v }); } })
                    )
                ),
                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('rect', { x: '2', y: '3', width: '20', height: '18' }),
                            el('polygon', { points: '10 8 16 12 10 16' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Video Hero'),
                    el('div', { className: 'ac-editor-placeholder__text' }, attributes.videoUrl ? 'Video set' : 'No video · ' + (attributes.title || 'No title'))
                )
            );
        },
        save: function () { return null; }
    });
})(window.wp);
