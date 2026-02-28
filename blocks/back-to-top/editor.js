(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var RangeControl = wp.components.RangeControl;
    var SelectControl = wp.components.SelectControl;

    registerBlockType('alpacode/back-to-top', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(Fragment, null,

                // ── Sidebar controls ──
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Settings', initialOpen: true },
                        el(RangeControl, {
                            label: 'Scroll Threshold (px)',
                            help: 'Scroll distance before the button appears.',
                            value: attributes.threshold,
                            onChange: function (v) { setAttributes({ threshold: v }); },
                            min: 100,
                            max: 1000,
                            step: 50
                        }),
                        el(SelectControl, {
                            label: 'Position',
                            value: attributes.position,
                            options: [
                                { label: 'Right', value: 'right' },
                                { label: 'Left', value: 'left' }
                            ],
                            onChange: function (v) { setAttributes({ position: v }); }
                        })
                    )
                ),

                // ── Canvas placeholder ──
                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('line', { x1: '12', y1: '19', x2: '12', y2: '5' }),
                            el('polyline', { points: '5 12 12 5 19 12' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Back to Top'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        'Position: ' + attributes.position + ' \u00B7 Threshold: ' + attributes.threshold + 'px'
                    )
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
