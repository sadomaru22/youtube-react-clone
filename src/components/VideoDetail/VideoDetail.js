import React, { useContext, useEffect } from 'react'
import { Store } from '../../store/index'
import VideoPlay from '../VideoPlay/VideoPlay'
import Style from './VideoDetail.module.scss'
import Linkify from 'react-linkify'
import { useLocation } from 'react-router-dom'
import { fetchSelectedData } from '../../apis'

const VideoDetail = () => { // useEffect内部では、直接asyncを使うことができないので、一度別関数を用意し、その内部でfetchSelectedData()を実行。
  const { globalState, setGlobalState } = useContext(Store)

  const location = useLocation()
  const setSelectedVideo = async () => {
    // このlocation.searchにURLの？以降がstringで格納されている。
    const searchParams = new URLSearchParams(location.search) // URLSearchParamsに渡すことでオブジェクトに変換してくれる
    const id = searchParams.get('v') // これでid取得できる
    console.log('id:', id)
    await fetchSelectedData(id).then((res) => {
      const item = res.data.items.shift()
      setGlobalState({ type: 'SET_SELECTED', payload: { selected: item } })
    })
  }
  useEffect(() => {
    setSelectedVideo()
  }, [])

  // 整形された文字列を取得してそのまま表示したい時はpタグよりpreタグの方が都合がいい
  return globalState.selected && globalState.selected.id
    ? (
    <div className={Style.wrap}>
      <VideoPlay id={globalState.selected.id} />
      <p>{globalState.selected.snippet.title}</p>
      <hr />
      <Linkify>
        <pre>{globalState.selected.snippet.description}</pre>
      </Linkify>
    </div>
      )
    : (<span>no data</span>) // URLのidを消して無くしたりしたときのエラーを防ぐための三項演算子
}

export default VideoDetail
