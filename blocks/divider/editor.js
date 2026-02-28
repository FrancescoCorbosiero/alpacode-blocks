(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var SelectControl = wp.components.SelectControl;
    var RangeControl = wp.components.RangeControl;
    var ToggleControl = wp.components.ToggleControl;

    registerBlockType('alpacode/divider', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(Fragment, null,

                // ── Sidebar controls ──
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Divider Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'Variant',
                            value: attributes.variant,
                            options: [
                                { label: 'Full Width', value: 'full' },
                                { label: 'Contained', value: 'contained' },
                                { label: 'Narrow', value: 'narrow' }
                            ],
                            onChange: function (value) {
                                setAttributes({ variant: value });
                            }
                        }),
                        el(RangeControl, {
                            label: 'Width (%)',
                            value: parseInt(attributes.width, 10),
                            onChange: function (value) {
                                setAttributes({ width: String(value) });
                            },
                            min: 10,
                            max: 100,
                            step: 5
                        }),
                        el(ToggleControl, {
                            label: 'Animate on scroll',
                            checked: attributes.animated,
                            onChange: function (value) {
                                setAttributes({ animated: value });
                            }
                        })
                    )
                ),

                // ── Canvas placeholder ──
                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('line', { x1: '2', y1: '12', x2: '22', y2: '12' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Divider'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        attributes.variant + ' · ' + attributes.width + '%' + (attributes.animated ? ' · animated' : '')
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
