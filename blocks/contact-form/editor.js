(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;

    registerBlockType('alpacode/contact-form', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(Fragment, null,

                el(InspectorControls, null,
                    el(PanelBody, { title: 'Section Header', initialOpen: true },
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
                        })
                    ),
                    el(PanelBody, { title: 'Form Settings', initialOpen: false },
                        el(TextControl, {
                            label: 'Submit Button Text',
                            value: attributes.submitText,
                            onChange: function (v) { setAttributes({ submitText: v }); }
                        }),
                        el(TextControl, {
                            label: 'Success Message',
                            value: attributes.successMessage,
                            onChange: function (v) { setAttributes({ successMessage: v }); }
                        })
                    )
                ),

                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('rect', { x: '2', y: '4', width: '20', height: '16' }),
                            el('polyline', { points: '22 4 12 13 2 4' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Contact Form'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        attributes.title || 'No title set'
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
