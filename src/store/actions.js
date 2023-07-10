/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

const actions = {

  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  updateVerticalNavMenuWidth({ commit }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },

  // VxAutoSuggest
  updateStarredPage({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  // The Navbar
  arrangeStarredPagesLimited({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY')
  },
  updateTheme({ commit }, val) {
    commit('UPDATE_THEME', val)
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo({ commit }, payload) {
    commit('UPDATE_USER_INFO', payload)
  },
  updateUserRole({ dispatch }, payload) {
    // Change client side
    payload.aclChangeRole(payload.userRole)

    // Make API call to server for changing role

    // Change userInfo in localStorage and store
    dispatch('updateUserInfo', { userRole: payload.userRole })
  },
  setToken({ commit }, token) {
    commit('SET_TOKEN', token, { root: true })
  },

  set2FA({ commit }, status) {
    commit('SET_AUTH_2FA', status);
  },

  togglePopup2FA({ commit }, status) {
    commit('TOGGLE_2FA_POPUP', status);
  },

  check2fa({ commit, state }) {
    return new Promise((resolve) => {
      if (state.auth2FA) {
        resolve(true);
      }
      commit('TOGGLE_2FA_POPUP', true);
      resolve(false);
    });

  },
}

export default actions
