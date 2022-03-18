/* eslint-disable comma-dangle */
import axios from 'axios'

const KEY = 'AIzaSyD3PDHLvZIYzC7v5bW25abhvKcYfEqGUaw'

const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3'
})

const params = {
  part: 'snippet',
  maxResults: 40,
  key: KEY,
  regionCode: 'JP',
  type: 'video',
}

// 人気動画取得
export const fetchPopularData = async () => {
  return await youtube.get('/videos', {
    params: {
      ...params, // 共通部分が多いので、まずは定数で書き出し、スプレッド構文を使って書いてあげる。
      chart: 'mostPopular'
    }
  })
}

// Watchページ用の、Linkをクリックして選択された用のデータ取得
export const fetchSelectedData = async (id) => {
  return await youtube.get('/videos', {
    params: {
      ...params,
      id
    }
  })
}
// Watchページ用の、選択された動画の関連動画のデータ取得
export const fetchRelatedData = async (id) => {
  return await youtube.get('/search', {
    params: {
      ...params,
      relatedToVideoId: id
    }
  })
}

export const fetchSearchData = async (query) => {
  return await youtube.get('/search', {
    params: {
      ...params,
      q: query
    }
  })
}
