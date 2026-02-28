(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;

    registerBlockType('alpacode/page-header', {
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
                    )
                ),

                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('rect', { x: '2', y: '3', width: '20', height: '6' }),
                            el('line', { x1: '6', y1: '6', x2: '18', y2: '6' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Page Header'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        attributes.title || 'No title set'
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
