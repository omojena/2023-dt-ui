export const offersStore = {
    state: () => ({
        offers: [
            {
                nombre: 'oferta 1',
                descripcion: '**** **** **** ',
                precio: 50,
                cantidad: 200,
                recomendado: '**** **** ****',
                is_active: true
            },
            {
                nombre: 'oferta 2',
                descripcion: '**** **** **** ',
                precio: 500,
                cantidad: 2000,
                recomendado: '**** **** ****',
                is_active: true
            }
        ]
    }),
    mutations: {
        SET_OFFERS(state, data) {
            state.offers = data
        },
        ADD_OFFERS(state, offer) {
            state.offers.push(offer)
        }
    },
    actions: {},
    getters: {
        GET_OFFERS(state) {
            return state.offers
        }
    }
}