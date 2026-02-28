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
    var ToggleControl = wp.components.ToggleControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/hero-banner', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var slides = attributes.slides || [];

            function addSlide() {
                setAttributes({
                    slides: slides.concat([{ imageId: 0, imageUrl: '' }])
                });
            }

            function updateSlide(index, data) {
                var updated = slides.map(function (slide, i) {
                    return i === index ? Object.assign({}, slide, data) : slide;
                });
                setAttributes({ slides: updated });
            }

            function removeSlide(index) {
                setAttributes({
                    slides: slides.filter(function (_, i) { return i !== index; })
                });
            }

            function moveSlide(index, direction) {
                var newIndex = index + direction;
                if (newIndex < 0 || newIndex >= slides.length) return;
                var updated = slides.slice();
                var temp = updated[index];
                updated[index] = updated[newIndex];
                updated[newIndex] = temp;
                setAttributes({ slides: updated });
            }

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
                            label: 'Subtitle',
                            value: attributes.subtitle,
                            onChange: function (v) { setAttributes({ subtitle: v }); }
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
                    el(PanelBody, { title: 'Slides', initialOpen: true },
                        slides.map(function (slide, index) {
                            return el('div', { key: index, className: 'ac-editor-item' },
                                el('div', { className: 'ac-editor-item__header' },
                                    el('strong', null, 'Slide ' + (index + 1)),
                                    el('div', { className: 'ac-editor-item__actions' },
                                        el(Button, {
                                            icon: 'arrow-up-alt2',
                                            label: 'Move up',
                                            size: 'small',
                                            onClick: function () { moveSlide(index, -1); }
                                        }),
                                        el(Button, {
                                            icon: 'arrow-down-alt2',
                                            label: 'Move down',
                                            size: 'small',
                                            onClick: function () { moveSlide(index, 1); }
                                        }),
                                        el(Button, {
                                            icon: 'trash',
                                            label: 'Remove',
                                            isDestructive: true,
                                            size: 'small',
                                            onClick: function () { removeSlide(index); }
                                        })
                                    )
                                ),
                                el(MediaUploadCheck, null,
                                    el(MediaUpload, {
                                        onSelect: function (media) {
                                            updateSlide(index, {
                                                imageId: media.id,
                                                imageUrl: media.url
                                            });
                                        },
                                        allowedTypes: ['image'],
                                        value: slide.imageId,
                                        render: function (obj) {
                                            return el(Fragment, null,
                                                slide.imageUrl
                                                    ? el('img', {
                                                        src: slide.imageUrl,
                                                        style: { maxWidth: '100%', marginBottom: '8px' }
                                                    })
                                                    : null,
                                                el(Button, {
                                                    onClick: obj.open,
                                                    variant: 'secondary',
                                                    size: 'small'
                                                }, slide.imageUrl ? 'Replace Image' : 'Select Image')
                                            );
                                        }
                                    })
                                )
                            );
                        }),
                        el(Button, {
                            variant: 'secondary',
                            onClick: addSlide,
                            style: { marginTop: '8px' }
                        }, '+ Add Slide')
                    ),
                    el(PanelBody, { title: 'Settings', initialOpen: false },
                        el(RangeControl, {
                            label: 'Overlay Opacity (%)',
                            value: attributes.overlayOpacity,
                            onChange: function (v) { setAttributes({ overlayOpacity: v }); },
                            min: 40,
                            max: 95,
                            step: 5
                        }),
                        el(SelectControl, {
                            label: 'Height',
                            value: attributes.height,
                            options: [
                                { label: '100vh (Full)', value: '100vh' },
                                { label: '90vh', value: '90vh' },
                                { label: '80vh', value: '80vh' },
                                { label: '70vh', value: '70vh' }
                            ],
                            onChange: function (v) { setAttributes({ height: v }); }
                        }),
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
                            max: 12000,
                            step: 1000
                        }) : null
                    )
                ),

                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('rect', { x: '2', y: '3', width: '20', height: '18' }),
                            el('polyline', { points: '2 16 7 11 10 14 15 9 22 16' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Hero Banner'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        slides.length + ' slide(s) · ' + (attributes.title || 'No title')
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
