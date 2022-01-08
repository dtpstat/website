import { fetchDtp } from '../api'

beforeAll(() => jest.spyOn(window, 'fetch'))

test('fetchDtp', async () => {
  const result = [{ id: '220915891' }]
  const startDate = '2020-01-01'
  const endDate = '2020-12-31'

  ;(window.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => result })

  const response = await fetchDtp(startDate, endDate, [
    [500, 500],
    [505, 505],
  ])

  // Appropriately expands the area
  expect(
    window.fetch
  ).toHaveBeenCalledWith(
    'https://beta.dtp-stat.ru/api/dtp/?start_date=2020-01-01&end_date=2020-12-31&geo_frame=495 495,495 510,510 510,510 495,495 495',
    { signal: expect.any(window.AbortSignal) }
  )

  expect(response).toBe(result)
})
