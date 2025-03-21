import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { e as ee } from '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'node:fs';
import '@tanstack/router-core';
import 'tiny-invariant';
import '@tanstack/start-server-core';
import '@tanstack/start-client-core';
import '@mantine/core';
import 'node:stream';
import 'isbot';
import 'react-dom/server';
import 'node:path';
import 'node:crypto';
import 'node:async_hooks';

const n = "_app_heading_text_qgzj1_1", c = "_app_card_qgzj1_8", d = "_app_image_container_qgzj1_22", l = "_app_image_wrapper_qgzj1_30", o = "_guitar_image_qgzj1_39", m = "_app_gradient_overlay_qgzj1_50", g = "_app_view_details_qgzj1_62", h = "_app_info_box_qgzj1_82", v = "_app_title_qgzj1_97", N = "_app_description_qgzj1_103", x = "_app_price_qgzj1_112", a = { app_heading_text: n, app_card: c, app_image_container: d, app_image_wrapper: l, guitar_image: o, app_gradient_overlay: m, app_view_details: g, app_info_box: h, app_title: v, app_description: N, app_price: x };
function D() {
  return jsxs(Fragment, { children: [jsx("h1", { className: a.app_heading_text, children: "Featured Guitars" }), jsx("div", { className: a.app_flex_container, children: ee.map((i) => jsx("div", { className: a.app_card, children: jsxs(Link, { to: "/guitar/$guitarId", params: { guitarId: i.id.toString() }, children: [jsxs("div", { className: a.app_image_container, children: [jsxs("div", { className: a.app_image_wrapper, children: [jsx("img", { src: i.image, alt: i.name, className: a.guitar_image, style: { viewTransitionName: `guitar-${i.id}` } }), jsx("div", { className: a.app_gradient_overlay })] }), jsx("div", { className: a.app_view_details, children: "View Details" })] }), jsxs("div", { className: a.app_info_box, children: [jsx("h2", { className: a.app_title, children: i.name }), jsx("p", { className: a.app_description, children: i.shortDescription }), jsxs("div", { className: a.app_price, children: ["$", i.price] })] })] }) }, i.id)) })] });
}
const I = function() {
  return jsxs(Fragment, { children: [jsx("h1", { className: a.app_heading_text, children: "Featured Guitars" }), jsx("div", { className: a.app_flex_container, children: ee.map((_) => jsx("div", { className: a.app_card, children: jsxs(Link, { to: "/guitar/$guitarId", params: { guitarId: _.id.toString() }, children: [jsxs("div", { className: a.app_image_container, children: [jsxs("div", { className: a.app_image_wrapper, children: [jsx("img", { src: _.image, alt: _.name, className: a.guitar_image, style: { viewTransitionName: `guitar-${_.id}` } }), jsx("div", { className: a.app_gradient_overlay })] }), jsx("div", { className: a.app_view_details, children: "View Details" })] }), jsxs("div", { className: a.app_info_box, children: [jsx("h2", { className: a.app_title, children: _.name }), jsx("p", { className: a.app_description, children: _.shortDescription }), jsxs("div", { className: a.app_price, children: ["$", _.price] })] })] }) }, _.id)) })] });
};

export { I as component, D as default };
//# sourceMappingURL=index-Dm3RFHB8.mjs.map
