import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:3000",
});

export const registerApi = async (payload) => {
  try {
    const res = await apiService.post("/api/users/register", payload);
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from register api");
    throw error.response;
  }
};

export const loginApi = async (payload) => {
  try {
    const res = await apiService.post("/api/users/login", payload);
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from login api");
    throw error.response;
  }
};

export const getMeApi = async () => {
  try {
    console.log("from get me api");
    const res = await apiService.get("/api/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const logoutApi = async () => {
  try {
    const res = await apiService.post("/api/users/logout", null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from logout api");
    throw error.response;
  }
};

export const getLendersApi = async () => {
  try {
    const res = await apiService.get("/api/users/lenders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from get lenders api");
    throw error.response;
  }
};

export const getLoansApi = async () => {
  try {
    console.log("from get loans api");
    const res = await apiService.get("/api/users/request-loan", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from get loans api");
    throw error.response;
  }
};

export const requestLoanApi = async (payload) => {
  try {
    console.log("from request loan api");
    const res = await apiService.post("/api/users/request-loan", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from request loan api");
    throw error.response;
  }
};

export const updateLoanStatusApi = async (payload) => {
  try {
    const res = await apiService.patch("/api/users/request-loan", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from update loan status api");
    throw error.response;
  }
};
