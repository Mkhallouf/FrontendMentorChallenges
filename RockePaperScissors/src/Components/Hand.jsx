import React from 'react'
import IconPaper from '../images/icon-paper.svg'
import IconRock from '../images/icon-rock.svg'
import IconScissors from '../images/icon-scissors.svg'

const SelectHand = ({ Hand, className, ...props }) => {
  const Icon =
    Hand === 'paper'
      ? IconPaper
      : Hand === 'rock'
      ? IconRock
      : Hand === 'scissors'
      ? IconScissors
      : ''

  const alt =
    Hand === 'paper'
      ? 'icon paper'
      : Hand === 'rock'
      ? 'icon rock'
      : Hand === 'scissors'
      ? 'icon scissors'
      : ''

  const bg =
    Hand === 'paper'
      ? 'bg-paper'
      : Hand === 'rock'
      ? 'bg-rock'
      : Hand === 'scissors'
      ? 'bg-scissors'
      : 'bg-transparent'

  return (
    <div
      className={`p-3 md:p-4 rounded-full w-max border-b-4 border-gray-800 border-opacity-20 ${bg} ${className}`}
      {...props}
    >
      <div
        className={`
          ${Hand ? 'bg-white' : 'bg-neutral-dark'}
          p-3 rounded-full w-20 h-20 md:w-32 md:h-32 flex items-center 
          ${Hand && 'border-t-4 border-gray-300'}
          justify-center
        `}
      >
        <img src={Icon} alt={alt} className='w-10 md:w-14' />
      </div>
    </div>
  )
}

export default SelectHand
