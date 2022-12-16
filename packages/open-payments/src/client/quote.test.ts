import { createQuoteRoutes } from './quote'
import { OpenAPI, HttpMethod, createOpenAPI } from 'openapi'
import path from 'path'
import { defaultAxiosInstance, silentLogger } from '../test/helpers'

describe('quote', (): void => {
  let openApi: OpenAPI

  beforeAll(async () => {
    openApi = await createOpenAPI(
      path.resolve(__dirname, '../openapi/resource-server.yaml')
    )
  })

  const axiosInstance = defaultAxiosInstance
  const logger = silentLogger

  describe('createQuoteRoutes', (): void => {
    test('calls createResponseValidator properly', async (): Promise<void> => {
      jest.spyOn(openApi, 'createResponseValidator')

      createQuoteRoutes({ axiosInstance, openApi, logger })
      expect(openApi.createResponseValidator).toHaveBeenCalledWith({
        path: '/quotes/{id}',
        method: HttpMethod.GET
      })
    })
  })
})