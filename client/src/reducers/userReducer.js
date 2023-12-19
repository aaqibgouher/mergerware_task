const {
  GET_ME,
  SET_SNACKBAR,
  SET_TOKEN,
  SET_DIALOG,
  GET_LENDERS,
  GET_LOANS,
} = require("../types");

const initialState = {
  me: null,
  token: null,
  sidebar: [
    { id: 1, name: "Home", target: "", icon: "", value: "HOME" },
    { id: 2, name: "Profile", target: "profile", icon: "", value: "PROFILE" },
    { id: 3, name: "Logout", target: "logout", icon: "", value: "LOGOUT" },
  ],
  roles: [
    { id: 1, name: "Admin", value: "ADMIN" },
    { id: 2, name: "Borrower", value: "BORROWER" },
    { id: 3, name: "Lender", value: "LENDER" },
  ],
  snackbar: null,
  dialog: null,
  lenders: [],
  loans: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ME:
      return {
        ...state,
        me: action.payload,
      };
    case SET_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_DIALOG:
      return {
        ...state,
        dialog: action.payload,
      };
    case GET_LENDERS:
      return {
        ...state,
        lenders: action.payload,
      };
    case GET_LOANS:
      return {
        ...state,
        loans: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
