import React, { useEffect, useContext } from 'react'
import Layout from '../components/Layout/Layout'
import VideoDetail from '../components/VideoDetail/VideoDetail'
import SideList from '../components/SideList/SideList'
import { Store } from '../store/index'
import { useLocation } from 'react-router-dom'
import { fetchSelectedData, fetchRelatedData } from '../apis/index'

// selectedとrelated2つの処理を同じ関数内で同時に行う実装に変えることで、最適化(高速化)を図っている
const Watch = () => { // useEffect内部では、直接asyncを使うことができないので、一度別関数を用意し、その内部でfetchSelectedData()を実行。
  const { setGlobalState } = useContext(Store)
  const location = useLocation()
  const setVideos = async () => {
    // このlocation.searchにURLの？以降がstringで格納されている。
    const searchParams = new URLSearchParams(location.search) // URLSearchParamsに渡すことでオブジェクトに変換してくれる
    const id = searchParams.get('v') // これでid取得できる
    if (id) {
      const [selected, related] = await Promise.all([fetchSelectedData(id), fetchRelatedData(id)])
      setGlobalState({ type: 'SET_SELECTED', payload: { selected: selected.data.items.shift() } })
      setGlobalState({ type: 'SET_RELATED', payload: { related: related.data.items } })
    }
  }

  useEffect(() => {
    setVideos()
  }, [location.search]) // こうすることで、動画を選択するたび(URLが変わるたび)に関連動画を再取得してくれるようになる

  return (
    <Layout>
      <VideoDetail />
      <SideList />
    </Layout>
  )
}

export default Watch
