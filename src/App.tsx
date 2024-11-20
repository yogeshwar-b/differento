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
  console.log(source.split('\n'), lcs.split('\n'))
  var sourceidx = -1
  var lcsidx = 0
  var targetidx = -1
  var lcsidx2 = 0
  return (
    <div>
      {Array.from(source).map((letter) => {
        sourceidx++
        if (source[sourceidx] == lcs[lcsidx]) {
          lcsidx++
          return <p style={{ display: 'inline' }}>{letter}</p>
        } else {
          return (
            <p style={{ display: 'inline', backgroundColor: 'red' }}>
              {letter}
            </p>
          )
        }
      })}
      <br />
      {Array.from(target).map((letter) => {
        targetidx++
        if (target[targetidx] == lcs[lcsidx2]) {
          lcsidx2++
          return <p style={{ display: 'inline' }}>{letter}</p>
        } else {
          return (
            <p style={{ display: 'inline', backgroundColor: 'green' }}>
              {letter}
            </p>
          )
        }
      })}
      <p>Comparitor</p>
    </div>
  )
}

export default App
