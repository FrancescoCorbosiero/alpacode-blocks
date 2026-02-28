(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var SelectControl = wp.components.SelectControl;
    var ToggleControl = wp.components.ToggleControl;

    registerBlockType('alpacode/notice-bar', {
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            var statusText = attributes.text
                ? '"' + attributes.text.substring(0, 40) + (attributes.text.length > 40 ? '...' : '') + '"'
                : 'No text entered';

            return el(Fragment, null,

                // ── Sidebar controls ──
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Content', initialOpen: true },
                        el(TextControl, {
                            label: 'Text',
                            value: attributes.text,
                            onChange: function (v) { setAttributes({ text: v }); }
                        }),
                        el(TextControl, {
                            label: 'Link Text',
                            value: attributes.linkText,
                            onChange: function (v) { setAttributes({ linkText: v }); }
                        }),
                        el(TextControl, {
                            label: 'Link URL',
                            value: attributes.linkUrl,
                            onChange: function (v) { setAttributes({ linkUrl: v }); }
                        })
                    ),
                    el(PanelBody, { title: 'Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'Variant',
                            value: attributes.variant,
                            options: [
                                { label: 'Dark', value: 'dark' },
                                { label: 'Light', value: 'light' },
                                { label: 'Accent', value: 'accent' }
                            ],
                            onChange: function (v) { setAttributes({ variant: v }); }
                        }),
                        el(ToggleControl, {
                            label: 'Dismissible',
                            checked: attributes.dismissible,
                            onChange: function (v) { setAttributes({ dismissible: v }); }
                        })
                    )
                ),

                // ── Canvas placeholder ──
                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('rect', { x: '2', y: '9', width: '20', height: '6', rx: '0' }),
                            el('line', { x1: '18', y1: '10', x2: '20', y2: '14' }),
                            el('line', { x1: '20', y1: '10', x2: '18', y2: '14' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Notice Bar'),
                    el('div', { className: 'ac-editor-placeholder__text' }, statusText)
                )
            );
        },

        save: function () { return null; }
    });
})(window.wp);
