import { Visibility, Weather, type DiaryEntry } from '../types.js'
const diaries: DiaryEntry[] = [
  { id: 1, date: '2017-01-01', weather: Weather.Rainy, visibility: Visibility.Poor, comment: 'Pretty scary flight, I am glad I am alive' },
  { id: 2, date: '2017-04-01', weather: Weather.Sunny, visibility: Visibility.Good, comment: 'Everything went better than expected' },
  { id: 3, date: '2017-04-15', weather: Weather.Cloudy, visibility: Visibility.Good, comment: 'I am getting pretty confident although I hit a flock of birds' },
]
export default diaries
