import http from '../common/http'
import {
  IGetElectionsRequest,
  IGetPositionSourceRequest,
  IPositionSource,
  IResponse,
} from '../common/types'

// export const getAvailablePositionsRequest = async (): Promise<
//   IResponse<any>
// > => {
//   const res = await http.get({
//     url: '/v1/get-available-positions',
//   })

//   return res.payload?.result
// }

export const getPositionSourceRequest = async (
  payload: IGetPositionSourceRequest
): Promise<IResponse<Array<IPositionSource>>> => {
  const res = await http.get({
    url: '/v1/get-position-source',
    query: payload,
  })

  return res.payload?.result
}
