const userTests:any= [
    {
        "id": "5bd709d3fec9138f1a6d4c5a",
        "firstName": "Elsie",
        "lastName": "Fischer",
        "github": "johndoe",
        "dateOfBirth": 1540819411539,
        "nationality": "NL",
        "online": true
    },
    {
        "id": "5bd709d38c27909b29f10f73",
        "firstName": "Helga",
        "lastName": "Wilkerson",
        "github": "johndoe",
        "dateOfBirth": 1540819411539,
        "nationality": "NL",
        "online": true
    },
    {
        "id": "5bd709d38ebcee1dcd78739a",
        "firstName": "Jones",
        "lastName": "Velasquez",
        "github": "johndoe",
        "dateOfBirth": 1540819411539,
        "nationality": "NL",
        "online": true
    },
    {
        "id": "5bd709d32a185780d1b66c2a",
        "firstName": "Shawn",
        "lastName": "Byers",
        "github": "johndoe",
        "dateOfBirth": 1540819411539,
        "nationality": "NL",
        "online": true
    },
    {
        "id": "5bd709d3979e86a200d3c4dd",
        "firstName": "Castaneda",
        "lastName": "Raymond",
        "github": "johndoe",
        "dateOfBirth": 1540819411539,
        "nationality": "NL",
        "online": true
    },
    {
        "id": "5bd709d3b358b10129f4db35",
        "firstName": "Benson",
        "lastName": "Franklin",
        "github": "johndoe",
        "dateOfBirth": 1540819411539,
        "nationality": "NL",
        "online": true
    }
];
const countries = [{
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱'
}]

export const createDataStore = () => {
    const users =userTests

    return {
        users,
        countries,
        findUsers: (pageIndex, pageSize, sortField, sortDirection) => {
            let items;

            if (sortField) {
                items = users.slice(0);
            } else {
                items = users;
            }

            let pageOfItems;

            if (!pageIndex && !pageSize) {
                pageOfItems = items;
            } else {
                const startIndex = pageIndex * pageSize;
                pageOfItems = items.slice(startIndex, Math.min(startIndex + pageSize, items.length));
            }

            return {
                pageOfItems,
                totalItemCount: items.length
            };
        },

        deleteUsers: (...ids) => {
            ids.forEach(id => {
                const index = users.findIndex(user => user.id === id);
                if (index >= 0) {
                    users.splice(index, 1);
                }
            });
        },

        cloneUser: (id:any) => {
            const index = users.findIndex(user => user.id === id);
            if (index >= 0) {
                const user = users[index];
                users.splice(index, 0, { ...user, id: users.length });
            }
        },

        // getCountry: (code) => countries.find(country => country.code === code)
    };
};
export const UserService = createDataStore();
