const state = () => ({
  admin: false,
  role: [],
  ability: [],
  position: null
})
const getters = {
  admin: (state) => state.admin,
  role: (state) => state.role,
  ability: (state) => state.ability,
  position: (state) => state.position
}
const mutations = {
  setFull(state, admin) {
    state.admin = admin
  },
  setRole(state, role) {
    state.role = role
  },
  setAbility(state, ability) {
    state.ability = ability
  },
  setPosition(state, position) {
    state.position = position
  }
}
const actions = {
  setFull({ commit }, admin) {
    commit('setFull', admin)
  },
  setRole({ commit }, role) {
    commit('setRole', role)
  },
  setAbility({ commit }, ability) {
    commit('setAbility', ability)
  },
  setPosition({ commit }, position) {
    commit('setPosition', position)
  }
}
export default { state, getters, mutations, actions }
