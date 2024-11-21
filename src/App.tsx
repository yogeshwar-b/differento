import { ForwardedRef, forwardRef, useRef, useState } from 'react'
import './App.css'
import { sourceText, targetText } from '../constants'
import { longestCommonSubsequence } from './helper'

function App() {
  const [compareStatus, setCompareStatus] = useState('No Action')
  const sourceTextRef = useRef<HTMLTextAreaElement>(null)
  const targetTextRef = useRef<HTMLTextAreaElement>(null)
  return (
    <>
      <h1>Differento 🕵️‍♀️🕵️‍♂️</h1>
      <TextBox text={sourceText} name='source' ref={sourceTextRef} />
      <TextBox text={targetText} name='target' ref={targetTextRef} />
      <button
        onClick={() => {
          console.log(sourceTextRef.current?.value.split('\n').length)
          console.log(targetTextRef.current?.value.split('\n').length)
          setCompareStatus(
            'LCS is - ' +
              longestCommonSubsequence(
                sourceTextRef.current?.value!,
                targetTextRef.current?.value!
              )
          )
        }}
      >
        Compare
      </button>
      <p>{compareStatus}</p>
      {compareStatus == 'No Action' ? (
        <></>
      ) : (
        <DifferntoComparitor
          source={sourceTextRef.current?.value!}
          target={targetTextRef.current?.value!}
        />
      )}
    </>
  )
}

interface TextBoxProps {
  name: string
  text: string
}
const TextBox = forwardRef(
  ({ name, text }: TextBoxProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const [textState, setTextState] = useState(text)
    return (
      <div>
        <textarea
          value={textState}
          name={name}
          id=''
          ref={ref}
          onChange={(e) => setTextState(e.target.value)}
        ></textarea>
      </div>
    )
  }
)

interface DifferentoComparitorProps {
  source: string
  target: string
}
const DifferntoComparitor = ({ source, target }: DifferentoComparitorProps) => {
  const lcs: string = longestCommonSubsequence(source, target)

  return (
    <div>
      <LineView source={source} lcs={lcs} backgroundcolor='red'></LineView>
      <LineView source={target} lcs={lcs} backgroundcolor='green'></LineView>
    </div>
  )
}

interface LineViewProps {
  source: string
  lcs: string
  backgroundcolor: string
}
const LineView = ({ source, lcs, backgroundcolor }: LineViewProps) => {
  var sourceidx = 0
  var lcsidx = 0
  console.log(`got source ${source} lcs ${lcs}`)
  const rows = []
  while (sourceidx < source.length) {
    console.log(` something print - ${sourceidx}`)
    var lineseen = false
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
        temp.push(
          <p style={{ display: 'inline', backgroundColor: backgroundcolor }}>
            {source[sourceidx]}
          </p>
        )
      }
      sourceidx++
    }
    rows.push(<div>{temp}</div>)
  }
  return <p>{rows}</p>
}

export default App
