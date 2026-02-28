(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var SelectControl = wp.components.SelectControl;

    registerBlockType('alpacode/section-header', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(Fragment, null,

                el(InspectorControls, null,
                    el(PanelBody, { title: 'Content', initialOpen: true },
                        el(TextControl, {
                            label: 'Eyebrow',
                            value: attributes.eyebrow,
                            onChange: function (value) {
                                setAttributes({ eyebrow: value });
                            }
                        }),
                        el(TextControl, {
                            label: 'Title',
                            value: attributes.title,
                            onChange: function (value) {
                                setAttributes({ title: value });
                            }
                        }),
                        el(TextareaControl, {
                            label: 'Subtitle',
                            value: attributes.subtitle,
                            onChange: function (value) {
                                setAttributes({ subtitle: value });
                            }
                        })
                    ),
                    el(PanelBody, { title: 'Settings', initialOpen: false },
                        el(SelectControl, {
                            label: 'Alignment',
                            value: attributes.alignment,
                            options: [
                                { label: 'Left', value: 'left' },
                                { label: 'Center', value: 'center' }
                            ],
                            onChange: function (value) {
                                setAttributes({ alignment: value });
                            }
                        }),
                        el(SelectControl, {
                            label: 'Heading Level',
                            value: attributes.headingLevel,
                            options: [
                                { label: 'H1', value: 'h1' },
                                { label: 'H2', value: 'h2' },
                                { label: 'H3', value: 'h3' },
                                { label: 'H4', value: 'h4' }
                            ],
                            onChange: function (value) {
                                setAttributes({ headingLevel: value });
                            }
                        })
                    )
                ),

                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('line', { x1: '3', y1: '6', x2: '21', y2: '6' }),
                            el('line', { x1: '3', y1: '12', x2: '18', y2: '12' }),
                            el('line', { x1: '3', y1: '18', x2: '14', y2: '18' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Section Header'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        attributes.title || 'No title set'
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
