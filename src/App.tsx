import { useState } from 'react'
import './App.css'
import { sourceText as sText, targetText as tText } from '../constants'
import { longestCommonSubsequence } from './helper'

function App() {
  const [compareStatus, setCompareStatus] = useState('No Action')
  const [sourceText, setSourceText] = useState<string>(sText)
  const [targetText, setTargetText] = useState<string>(tText)
  return (
    <>
      <h1>Differento 🕵️‍♀️🕵️‍♂️</h1>
      <TextBox text={sourceText} name='source' setText={setSourceText} />
      <TextBox text={targetText} name='target' setText={setTargetText} />
      <button
        onClick={() => {
          setCompareStatus(
            'LCS is - ' + longestCommonSubsequence(sourceText, targetText)
          )
        }}
      >
        Compare
      </button>
      <p>{compareStatus}</p>
      {compareStatus == 'No Action' ? (
        <></>
      ) : (
        <DifferntoComparitor source={sourceText} target={targetText} />
      )}
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
    <div>
      <textarea
        value={text}
        name={name}
        id=''
        onChange={(e) => setText(e.target.value)}
        rows={text.split('\n').length}
        cols={100}
      ></textarea>
    </div>
  )
}

interface DifferentoComparitorProps {
  source: string
  target: string
}
const DifferntoComparitor = ({ source, target }: DifferentoComparitorProps) => {
  const lcs: string = longestCommonSubsequence(source, target)

  return (
    <div>
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
  var sourceidx = 0
  var lcsidx = 0
  console.log(`got source ${source} lcs ${lcs}`)
  const rows = []
  while (sourceidx < source.length) {
    console.log(` something print - ${sourceidx}`)
    var lineseen = false
    var changeseen = false
    const temp = []
    while (sourceidx < source.length) {
      if (source[sourceidx] != '\n' && source[sourceidx] == lcs[lcsidx]) {
        lineseen = true
        temp.push(<p style={{ display: 'inline' }}>{source[sourceidx]}</p>)
        lcsidx++
      } else {
        if (source[sourceidx] == '\n') {
          if (lineseen) {
            lcsidx++
          }
          sourceidx++
          break
        }
        changeseen = true
        temp.push(
          <p style={{ display: 'inline', backgroundColor: backgroundColor }}>
            {source[sourceidx]}
          </p>
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
  return <p>{rows}</p>
}

export default App
