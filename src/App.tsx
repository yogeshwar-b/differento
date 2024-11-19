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
          let maxlines = 0
          maxlines = Math.max(
            targetTextRef.current?.value.split('\n').length!,
            sourceTextRef.current?.value.split('\n').length!
          )
        }}
      >
        Compare
      </button>
      <p>{compareStatus}</p>
      {compareStatus == 'No Action' ? <></> : <div>Comparision Here</div>}
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

export default App
