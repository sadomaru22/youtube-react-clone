import React, { useContext } from 'react'
import { Store } from '../../store/index'
import VideoPlay from '../VideoPlay/VideoPlay'
import Style from './VideoDetail.module.scss'
import Linkify from 'react-linkify'

const VideoDetail = () => {
  const { globalState } = useContext(Store)

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
