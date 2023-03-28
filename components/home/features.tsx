import React, { useEffect, useState } from 'react'
import { LinkIcon, CopyIcon, CheckIcon, Tooltip } from '@components'
import { card, badge } from '@components/elements'
import { Input } from '@components'
import { genAvatars } from '@utils/avatars'
import { systemConstants } from '@common/constants'
import { SizeSelect } from './size-select'

interface FeaturesProps {}

const Features: React.FC<FeaturesProps> = () => {
  const [id, setId] = useState(systemConstants.name)
  const [host, setHost] = useState('')
  const [size, setSize] = useState(256)
  const features = genAvatars({
    id,
    size
  })

  useEffect(() => {
    setHost(`${window.location.origin}`)
  }, [])

  return (
    <section className='my-10 gap-6 z-10'>
      <div className='flex my-10 gap-6'>
        <Input defaultValue={systemConstants.name} onChange={setId} />
        <SizeSelect onChange={setSize} />
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
        {features.map((feature, index) => (
          <div
            key={index}
            className={card({ class: 'gap-2 p-4 backdrop-blur' })}
          >
            <div className='flex justify-between'>
              <h3 className='font-bold mx-3 text-lg text-black dark:text-white'>
                {feature.theme}
              </h3>

              <div className='flex items-center'>
                <CopyBtn text={`${host}/${feature.url}`} />

                <a
                  href={feature.url}
                  rel='noopener noreferrer'
                  target='_blank'
                  title={systemConstants.site.title}
                >
                  <LinkIcon className='ml-1' />
                </a>
              </div>
            </div>
            <p className='flex justify-center items-center pl-1 text-gray-500 dark:text-gray-400'>
              <img src={feature.url} />
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function CopyBtn(props: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(props.text)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 4000)
  }

  return copied ? (
    <CheckIcon className='text-success' size={18} />
  ) : (
    <span onClick={handleCopyCode}>
      <CopyIcon
        className='text-neutral-600 dark:text-neutral-400 cursor-pointer'
        size={18}
      />
    </span>
  )
}

export default Features
