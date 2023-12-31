import { KEY_AUTH_LOCAL } from '@/features/auth/type'
import LocalStore from '@/utils/localStore'
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const handleError = (error: AxiosError<any>) => {
  try {
    if (error.response?.data.message === 'jwt expired') {
      // const originalRequest = error.config as any
      // await axiosV1.post<IResponse<IAuthResponse>>(
      //   '/auth/refreshToken'
      // )
      // return axiosV1(originalRequest)
    }
    throw error
  } catch (error: any) {
    const additionalInfo = error?.response?.data?.additionalInfo
    let message = ''

    if (additionalInfo && additionalInfo?.details?.length) {
      const arrMessage = additionalInfo?.details
      message = arrMessage.map((x: any) => x.message).join(', ')
    } else message = error?.response?.data?.message ?? error.message
    console.log(message)
    throw new Error(message)
  }
}

const handleRequest = (config: InternalAxiosRequestConfig<any>) => {
  const access_token = LocalStore.getItem<string>(KEY_AUTH_LOCAL)
  if (access_token) {
    config.headers.Authorization = 'Bearer ' + access_token
  }
  return config
}

const axiosInstance = axios.create({})

const url =
  // process.env.NODE_ENV === 'production'
  //   ? 'http://103.98.160.26'
  //   : 'http://127.0.0.1'
  'http://103.98.160.26'


//const portAuth = process.env.NODE_ENV === 'production' ? 8090 : 8081
const portAuth = 8090

export const URL_AUTH_API = `${url}:${portAuth}`
export const URL_TOUR_API = `${url}:8082`
export const URL_TOUR_AGENT = `${url}:8083`

const apiAuth = axios.create({
  baseURL: URL_AUTH_API,
})

const apiTour = axios.create({
  baseURL: URL_TOUR_API,
})

const apiAgent = axios.create({
  baseURL: URL_TOUR_AGENT,
})

apiAuth.interceptors.request.use(handleRequest, handleError)
apiAuth.interceptors.response.use((config) => config, handleError)

apiTour.interceptors.request.use(handleRequest, handleError)
apiTour.interceptors.response.use((config) => config, handleError)

apiAgent.interceptors.request.use(handleRequest, handleError)
apiAgent.interceptors.response.use((config) => config, handleError)

axiosInstance.interceptors.request.use(handleRequest, handleError)
axiosInstance.interceptors.response.use((config) => config, handleError)

const API = {
  apiAuth,
  apiAgent,
  apiTour,
  axiosInstance,
}

export default API
