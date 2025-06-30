import axios, { CancelTokenSource } from "axios";
import { GetStorage } from "./authservice";

interface ApiResponse {
  data: unknown;
  message?: string;
  status?: number;
}

interface DataModel {
  adapt: (data: unknown) => unknown;
}

interface backendCall {
  url: string;
  method: string;
  data?: unknown;
  source?: CancelTokenSource;
  isNavigate?: boolean;
  isShowErrorMessage?: boolean;
  contentType?: string;
  dataModel?: DataModel;
}

export const backendCall = async ({
  url,
  method = "POST",
  data,
  source,
  isNavigate = true,
  isShowErrorMessage = true,
  contentType = "application/json",
  dataModel,
}: backendCall) => {
  const storageData = await GetStorage();
  const _headers = {
    "Content-Type": contentType,
    Authorization: "Bearer " + storageData?.token || "",
  };
  console.log("token");
  let _response: ApiResponse = { data: "" };
  await axios(
    import.meta.env.BACKENDCALL_API_URL || "http://localhost:3000" + url,
    {
      method: method,
      data: data,
      headers: _headers,
      cancelToken: source?.token,
      withCredentials: true,
    }
  )
    .then((response: { data: ApiResponse }) => {
      _response = response.data;
      if (dataModel) {
        const dataSet = dataModel.adapt(_response?.data);
        console.log("data pass", dataSet);
        _response.data = dataSet;
      }
    })
    .catch((error: { response: { data: ApiResponse; status: number } }) => {
      const _responseData = error.response?.data;
      if (isShowErrorMessage) {
        console.log("error ==", _responseData?.message);
      }
      _response = _responseData;
      if (error.response?.status === 401 && isNavigate) {
        // window.location.replace("/");
        // localStorage.clear();
      }
    });

  return _response;
};
