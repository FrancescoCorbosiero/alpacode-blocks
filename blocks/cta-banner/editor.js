(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var SelectControl = wp.components.SelectControl;

    registerBlockType('alpacode/cta-banner', {
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
                        })
                    ),
                    el(PanelBody, { title: 'Primary CTA', initialOpen: true },
                        el(TextControl, {
                            label: 'Button Text',
                            value: attributes.ctaText,
                            onChange: function (v) { setAttributes({ ctaText: v }); }
                        }),
                        el(TextControl, {
                            label: 'Button URL',
                            value: attributes.ctaUrl,
                            onChange: function (v) { setAttributes({ ctaUrl: v }); }
                        })
                    ),
                    el(PanelBody, { title: 'Secondary CTA', initialOpen: false },
                        el(TextControl, {
                            label: 'Button Text',
                            value: attributes.secondaryText,
                            onChange: function (v) { setAttributes({ secondaryText: v }); }
                        }),
                        el(TextControl, {
                            label: 'Button URL',
                            value: attributes.secondaryUrl,
                            onChange: function (v) { setAttributes({ secondaryUrl: v }); }
                        })
                    ),
                    el(PanelBody, { title: 'Settings', initialOpen: false },
                        el(SelectControl, {
                            label: 'Variant',
                            value: attributes.variant,
                            options: [
                                { label: 'Dark', value: 'dark' },
                                { label: 'Light', value: 'light' }
                            ],
                            onChange: function (v) { setAttributes({ variant: v }); }
                        })
                    )
                ),

                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('path', { d: 'M22 12h-4l-3 9L9 3l-3 9H2' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'CTA Banner'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        attributes.variant + ' · ' + (attributes.title || 'No title')
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
