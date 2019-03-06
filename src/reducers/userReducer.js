const SET_USER = 'SET_USER';

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  }
}

const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.user,
      }
    default:
      return state
  }
}

export default userReducer;
