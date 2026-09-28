import { site } from '../data/site';

type OrderOpts = { item?: string; category?: string; price?: string; message?: string };

/** A wa.me link with the message already written, matching the wording the bakery already uses. */
export function orderLink(opts: OrderOpts = {}): string {
  let msg: string;
  if (opts.message) msg = opts.message;
  else if (opts.item)
    msg = `Hello! I’d like to order the ${opts.item}${opts.category ? ` (${opts.category})` : ''}${
      opts.price ? ` — ${opts.price}` : ''
    }. Could you please confirm availability and next steps?`;
  else msg = 'Hello! I’d like to place an order.';
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export const askLink = () => orderLink({ message: 'Hi! I have a question.' });
export const customLink = () => orderLink({ message: 'Hello! I have a custom order in mind.' });
