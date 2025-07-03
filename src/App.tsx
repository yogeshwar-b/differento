import { useState } from 'react'
import './App.css'
import { sourceText as sText, targetText as tText } from '../constants'
import { longestCommonSubsequence } from './helper'

function App() {
  const [sourceText, setSourceText] = useState<string>(sText)
  const [targetText, setTargetText] = useState<string>(tText)
  return (
    <>
      <h1>Differento 🕵️‍♀️🕵️‍♂️</h1>
      <div style={{ display: 'flex' }}>
        <TextBox text={sourceText} name='source' setText={setSourceText} />
        <TextBox text={targetText} name='target' setText={setTargetText} />
      </div>
      <DifferntoComparitor source={sourceText} target={targetText} />
    </>
  )
}

interface TextBoxProps {
  name: string
  text: string
  setText: (text: string) => void
}
const TextBox = ({ name, text, setText }: TextBoxProps) => {
  return (
    <textarea
      value={text}
      name={name}
      id=''
      onChange={(e) => setText(e.target.value)}
      rows={Math.min(30, text.split('\n').length)}
      cols={40}
    ></textarea>
  )
}

interface DifferentoComparitorProps {
  source: string
  target: string
}
const DifferntoComparitor = ({ source, target }: DifferentoComparitorProps) => {
  const lcs: string = longestCommonSubsequence(source, target)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <LineView
        source={source}
        lcs={lcs}
        backgroundColor='red'
        changedLineColor='orange'
      ></LineView>
      <LineView
        source={target}
        lcs={lcs}
        backgroundColor='green'
        changedLineColor='lightgreen'
      ></LineView>
    </div>
  )
}

interface LineViewProps {
  source: string
  lcs: string
  backgroundColor: string
  changedLineColor: string
}
const LineView = ({
  source,
  lcs,
  backgroundColor,
  changedLineColor
}: LineViewProps) => {
  let sourceidx = 0
  let lcsidx = 0
  const rows = []
  while (sourceidx < source.length) {
    let lineseen = false
    let changeseen = false
    const temp = []
    while (sourceidx < source.length) {
      if (source[sourceidx] != '\n' && source[sourceidx] == lcs[lcsidx]) {
        lineseen = true
        temp.push(
          <span id={String(sourceidx)} key={String(sourceidx)}>
            {source[sourceidx]}
          </span>
        )
        lcsidx++
      } else {
        if (source[sourceidx] == '\n') {
          if (lineseen || lcs[lcsidx] == '\n') {
            lcsidx++
          }
          sourceidx++
          break
        }
        changeseen = true
        temp.push(
          <span
            id={String(sourceidx)}
            key={String(sourceidx)}
            style={{ backgroundColor: backgroundColor }}
          >
            {source[sourceidx]}
          </span>
        )
      }
      sourceidx++
    }

    rows.push(
      <div style={{ position: 'relative' }}>
        {changeseen ? (
          <div
            style={{
              zIndex: '-1',
              backgroundColor: changedLineColor,
              position: 'absolute',
              height: '100%',
              width: '100%'
            }}
          ></div>
        ) : (
          <div></div>
        )}
        <div>{temp}</div>
      </div>
    )
  }
  return (
    <div style={{ marginRight: 'auto', width: '100%', paddingLeft: '.5rem' }}>
      {rows}
    </div>
  )
}

export default App
