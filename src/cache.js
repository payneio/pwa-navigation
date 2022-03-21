import { InMemoryCache, makeVar } from '@apollo/client';

// type Thing {
//     id: ID!
//     name: string
// }

export const thingsVar = makeVar([
    { "id": "1", "name": "thing1" },
    { "id": "2", "name": "thing2" },
    { "id": "3", "name": "thing3" },
    { "id": "4", "name": "thing4" },
]);

export const cache = new InMemoryCache({
  typePolicies: {
    Thing: {
      keyFields: ['id'],
    },
    Query: {
      fields: {
        things: {
          read() {
            return thingsVar();
          },
        },
        thing: {
            read(_, { args }) {
                const thing = thingsVar().find(thing => {
                    return thing.id === args.id
                })
                console.log(thing)
                return thing
            }
        }
      }
    }
  }
});
