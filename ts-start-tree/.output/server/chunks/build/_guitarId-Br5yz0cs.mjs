import { jsxs, jsx } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { _ as _$1 } from '../nitro/nitro.mjs';
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

const c = "_container_1budp_1", o = "_card_1budp_8", s = "_backLink_1budp_20", p = "_title_1budp_32", m = "_description_1budp_38", d = "_priceContainer_1budp_43", _ = "_price_1budp_43", l = "_button_1budp_55", u = "_imageContainer_1budp_69", g = "_imageWrapper_1budp_78", b = "_guitarImage_1budp_87", i = { container: c, card: o, backLink: s, title: p, description: m, priceContainer: d, price: _, button: l, imageContainer: u, imageWrapper: g, guitarImage: b }, y = function() {
  const t = _$1.useLoaderData();
  return jsxs("div", { className: i.container, children: [jsxs("div", { className: i.card, style: { viewTransitionName: "description" }, children: [jsx(Link, { to: "/", className: i.backLink, children: "\u2190 Back to all guitars" }), jsx("h1", { className: i.title, children: t.name }), jsx("p", { className: i.description, children: t.description }), jsxs("div", { className: i.priceContainer, children: [jsxs("div", { className: i.price, children: ["$", t.price] }), jsx("button", { className: i.button, children: "Add to Cart" })] })] }), jsx("div", { className: i.imageContainer, children: jsx("div", { className: i.imageWrapper, children: jsx("img", { src: t.image, alt: t.name, className: i.guitarImage, style: { viewTransitionName: `guitar-${t.id}` } }) }) })] });
};

export { y as component };
//# sourceMappingURL=_guitarId-Br5yz0cs.mjs.map
