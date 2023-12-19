import {
  getLendersApi,
  getLoansApi,
  getMeApi,
  loginApi,
  logoutApi,
  registerApi,
  requestLoanApi,
  updateLoanStatusApi,
} from "../api/userApi";
import {
  GET_LENDERS,
  GET_LOANS,
  GET_ME,
  SET_DIALOG,
  SET_SNACKBAR,
  SET_TOKEN,
} from "../types";

export const registerAction = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    const res = await registerApi(payload);

    console.log(res, "from register action res");
    if (!res || res.status !== 200) throw res.error;

    // show success message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    return res;
  } catch (error) {
    console.log(error, "register action error");
    // show snackbar
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const loginAction = (payload) => async (dispatch) => {
  try {
    const res = await loginApi(payload);

    if (!res || res.status !== 200) throw res.error;

    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   set token to state & localstoray
    dispatch({ type: SET_TOKEN, payload: res.data });

    // save token to local storage
    localStorage.setItem("token", res.data.token);

    return res;
  } catch (error) {
    console.log(error, "from auth actions -> login user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const getMeAction = () => async (dispatch) => {
  try {
    const res = await getMeApi();

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // update me state
    dispatch({ type: GET_ME, payload: res.data });
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    const res = await logoutApi();

    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   remove token from state
    dispatch({ type: SET_TOKEN, payload: null });

    // save token to local storage
    localStorage.removeItem("token");

    // setting me to null
    dispatch({ type: GET_ME, payload: null });

    return res;
  } catch (error) {
    console.log(error, "from logout user action");
    dispatch({
      type: SET_TOKEN,
      payload: { open: true, message: error },
    });
  }
};

export const getLendersAction = () => async (dispatch) => {
  try {
    const res = await getLendersApi();

    if (!res || res.status !== 200) throw res.error;

    // update me state
    dispatch({ type: GET_LENDERS, payload: res.data });
  } catch (error) {
    console.log(error, "from get lenders action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const getLoansAction = () => async (dispatch) => {
  try {
    const res = await getLoansApi();

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: GET_LOANS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error, "from get loans action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const requestLoanAction = (payload) => async (dispatch) => {
  try {
    const res = await requestLoanApi(payload);

    if (!res || res.status !== 200) throw res.error;

    console.log(res, "request loan");

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // refresh list
    await dispatch(getLoansAction());

    // close model
    dispatch({ type: SET_DIALOG, payload: null });
  } catch (error) {
    console.log(error, "from request loan action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const updateLoanStatusAction = (payload) => async (dispatch) => {
  try {
    const res = await updateLoanStatusApi(payload);

    if (!res || res.status !== 200) throw res.error;

    console.log(res, "update loan status loan");

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // refresh list
    await dispatch(getLoansAction());
  } catch (error) {
    console.log(error, "from request loan action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};
