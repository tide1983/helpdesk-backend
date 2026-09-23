const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body').default || require('koa-body');
const tickets = require('../tickets');

const app = new Koa();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  headers: ['Content-Type'],
}));

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));

app.use(async (ctx) => {
  const { method } = ctx.query;
  ctx.type = 'application/json';

  switch (method) {
    case 'allTickets':
      ctx.body = tickets.getAll();
      return;
    case 'ticketById': {
      const t = tickets.getById(ctx.query.id);
      if (!t) { ctx.status = 404; ctx.body = { error: 'Not found' }; return; }
      ctx.body = t;
      return;
    }
    case 'createTicket': {
      const { name, description, status } = ctx.request.body;
      if (!name) { ctx.status = 400; ctx.body = { error: 'name is required' }; return; }
      ctx.status = 201;
      ctx.body = tickets.create({ name, description, status });
      return;
    }
    case 'updateById': {
      const updated = tickets.update(ctx.query.id, ctx.request.body);
      if (!updated) { ctx.status = 404; ctx.body = { error: 'Not found' }; return; }
      ctx.body = updated;
      return;
    }
    case 'deleteById': {
      const ok = tickets.remove(ctx.query.id);
      if (!ok) { ctx.status = 404; ctx.body = { error: 'Not found' }; return; }
      ctx.status = 204;
      ctx.body = null;
      return;
    }
    default:
      ctx.status = 400;
      ctx.body = { error: 'Unknown method' };
  }
});

module.exports = app.callback();