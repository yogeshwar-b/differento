import { useState } from 'react'
import { sourceText as sText, targetText as tText } from '../constants'
import { longestCommonSubsequence } from './helper'

const colorMap: Record<string, string> = {
  'bg-red-200': 'bg-red-200',
  'bg-green-200': 'bg-green-200',
  'bg-blue-200': 'bg-blue-200',
  'bg-yellow-200': 'bg-yellow-200',
  'bg-red-500': 'bg-red-500',
  'bg-red-400': 'bg-red-400',
  'bg-green-500': 'bg-green-500'
}
function App() {
  const [sourceText, setSourceText] = useState<string>(sText)
  const [targetText, setTargetText] = useState<string>(tText)
  return (
    <div className='bg-gradient-to-r from-white-200 to-gray-100 h-screen'>
      <h1 className='text-4xl font-bold text-center my-6'>Differento 🕵️‍♀️🕵️‍♂️</h1>
      <div className='max-w-8/10  mx-auto margin-left-0'>
        <div className='flex'>
          <TextBox text={sourceText} name='source' setText={setSourceText} />
          <TextBox text={targetText} name='target' setText={setTargetText} />
        </div>
        <DifferentoComparitor source={sourceText} target={targetText} />
      </div>
    </div>
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
      rows={Math.min(20, text.split('\n').length)}
      className='resize-none flex-1 border-2 border-gray-300 rounded-md p-2 m-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
    ></textarea>
  )
}

interface DifferentoComparitorProps {
  source: string
  target: string
}
const DifferentoComparitor = ({
  source,
  target
}: DifferentoComparitorProps) => {
  const lcs: string = longestCommonSubsequence(source, target)

  return (
    <div className='cursor-default select-none flex flex-row justify-center mt-2'>
      <LineView
        source={source}
        lcs={lcs}
        txtBackgroundColor={colorMap['bg-red-400']}
        changedLineColor={colorMap['bg-red-200']}
      ></LineView>
      <LineView
        source={target}
        lcs={lcs}
        txtBackgroundColor={colorMap['bg-green-500']}
        changedLineColor={colorMap['bg-green-200']}
      ></LineView>
    </div>
  )
}

interface LineViewProps {
  source: string
  lcs: string
  txtBackgroundColor: string
  changedLineColor: string
}
const LineView = ({
  source,
  lcs,
  txtBackgroundColor: backgroundColor,
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
            className={backgroundColor}
          >
            {source[sourceidx]}
          </span>
        )
      }
      sourceidx++
    }

    rows.push(
      <div className='relative'>
        {changeseen ? (
          <div
            className={
              changedLineColor + ' h-full w-full absolute z-0 rounded-md'
            }
          ></div>
        ) : (
          <div
            className={'bg-gray-100 h-full w-full absolute z-0 rounded-md'}
          ></div>
        )}
        <div
          className={
            'relative z-2' +
            (rows.length == 0 ? ' border-t-1 ' : '') +
            ' border-b-1 border-gray-300 rounded-md pl-1'
          }
        >
          {temp}
        </div>
      </div>
    )
  }
  return <div className='mr-auto w-full pl-2'>{rows}</div>
}

export default App
