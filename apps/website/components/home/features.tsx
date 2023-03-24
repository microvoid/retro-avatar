import React, { useEffect, useState } from 'react'
import { LinkIcon, CopyIcon, CheckIcon, Tooltip } from '@components'
import { card, badge } from '@components/elements'
import { Input } from '@components'
import { genAvatars } from '@utils/avatars'
import { systemConstants } from '@common/constants'

interface FeaturesProps {}

const Features: React.FC<FeaturesProps> = () => {
  const [id, setId] = useState(systemConstants.name)
  const features = genAvatars(id)
  const [host, setHost] = useState('')

  useEffect(() => {
    setHost(`${window.location.origin}`)
  }, [])

  return (
    <section className='my-10 gap-6 z-10'>
      <div className='flex items-center flex-col justify-center my-10 gap-6'>
        <div>Try Me!</div>
        <Input defaultValue={systemConstants.name} onChange={setId} />
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
        {features.map((feature, index) => (
          <div
            key={index}
            className={card({ class: 'gap-2 p-4 backdrop-blur' })}
          >
            <div className='flex justify-between'>
              {/* <div className='flex items-center justify-center w-12 h-12 rounded-full bg-neutral/10 dark:bg-white/10'>
                {feature.icon}
              </div> */}
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
            <p className='pl-1 text-gray-500 dark:text-gray-400'>
              <img src={feature.url} />
            </p>

            <p className='pl-1 text-gray-500 dark:text-gray-400'>
              <span className={badge({ class: 'w-1/2' })}>Size: 256 * 256</span>
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
