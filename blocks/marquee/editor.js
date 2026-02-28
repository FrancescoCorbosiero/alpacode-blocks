(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var RangeControl = wp.components.RangeControl;
    var SelectControl = wp.components.SelectControl;

    registerBlockType('alpacode/marquee', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Content', initialOpen: true },
                        el(TextControl, { label: 'Text', help: 'Use separator characters to create items', value: attributes.text, onChange: function (v) { setAttributes({ text: v }); } }),
                        el(TextControl, { label: 'Separator', value: attributes.separator, onChange: function (v) { setAttributes({ separator: v }); } })
                    ),
                    el(PanelBody, { title: 'Settings', initialOpen: false },
                        el(RangeControl, { label: 'Speed (seconds per loop)', value: attributes.speed, onChange: function (v) { setAttributes({ speed: v }); }, min: 10, max: 120, step: 5 }),
                        el(SelectControl, { label: 'Direction', value: attributes.direction, options: [{ label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }], onChange: function (v) { setAttributes({ direction: v }); } }),
                        el(SelectControl, { label: 'Font Size', value: attributes.fontSize, options: [{ label: 'Display (large)', value: 'display' }, { label: 'Mono (small)', value: 'mono' }], onChange: function (v) { setAttributes({ fontSize: v }); } }),
                        el(SelectControl, { label: 'Variant', value: attributes.variant, options: [{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }], onChange: function (v) { setAttributes({ variant: v }); } })
                    )
                ),
                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('line', { x1: '2', y1: '12', x2: '22', y2: '12' }),
                            el('polyline', { points: '18 8 22 12 18 16' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Marquee'),
                    el('div', { className: 'ac-editor-placeholder__text' }, attributes.text || 'No text set')
                )
            );
        },
        save: function () { return null; }
    });
})(window.wp);
