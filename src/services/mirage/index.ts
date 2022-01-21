import { createServer, Factory, Model } from 'miragejs';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },
    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i+1}`
        },
        email(i: number) {
          return `user${i+1}@gmail.com`
        },
        createdAt() {
          function randomDate(start: Date, end: Date) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
          };

          var preDate = new Date();
          preDate.setDate(preDate.getDate() - 30);
          
          return randomDate(preDate, new Date());
        }
      })
    },
    seeds(server) {
      server.createList('user', 10)
    },
    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get('/users');
      this.post('/users');

      this.namespace = "";
      this.passthrough();
    }
  });

  return server;
};