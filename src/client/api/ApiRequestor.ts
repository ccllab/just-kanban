import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

type successMiddleProcess = (res: AxiosResponse) => void
type failMiddleProcess = (res: AxiosError) => void

export class ApiRequestor {
  private static resSuccessMiddleProcesses: successMiddleProcess[] = []
  private static resFailMiddleProcesses: failMiddleProcess[] = []

  public static request(config: AxiosRequestConfig): Promise<any> {
    return axios(config)
      .then(successHandler)
      .catch(failHandler)

    function successHandler(res: AxiosResponse) {
      ApiRequestor.execSuccessMiddleProcesses(res)
      res.data || (res.data = {})
      res.data.result = true
      return res.data
    }

    function failHandler(res: AxiosError) {
      ApiRequestor.execFailMiddleProcesses(res)
      res.response.data || (res.response.data = {})
      res.response.data.result = false
      return res.response.data
    }
  }

  public static addSuccessMiddleProcess(fn: successMiddleProcess) {
    this.resSuccessMiddleProcesses.push(fn)
  }

  public static addFailMiddleProcess(fn: failMiddleProcess) {
    this.resFailMiddleProcesses.push(fn)
  }

  private static execSuccessMiddleProcesses(res: AxiosResponse): void {
    this.resSuccessMiddleProcesses.forEach(fn => fn(res))
  }

  private static execFailMiddleProcesses(res: AxiosError): void {
    this.resFailMiddleProcesses.forEach(fn => fn(res))
  }
}