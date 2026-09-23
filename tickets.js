const { v4: uuidv4 } = require('uuid');

let tickets = [
  {
    id: uuidv4(),
    name: 'Поменять краску в принтере',
    description: 'Принтер HP LaserJet, картридж сломался',
    status: false,
    created: Date.now(),
  },
];

module.exports = {
  getAll: () => tickets.map(({ description, ...t }) => t), // без description
  getById: (id) => tickets.find((t) => t.id === id),
  create: ({ name, description, status = false }) => {
    const ticket = {
      id: uuidv4(),
      name,
      description,
      status,
      created: Date.now(),
    };
    tickets.push(ticket);
    return ticket;
  },
  update: (id, data) => {
    const ticket = tickets.find((t) => t.id === id);
    if (!ticket) return null;
    Object.assign(ticket, data);
    return ticket;
  },
  remove: (id) => {
    const idx = tickets.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    tickets.splice(idx, 1);
    return true;
  },
};