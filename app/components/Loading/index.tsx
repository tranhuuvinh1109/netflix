import React from 'react'
import img from '../../../public/loading.gif'
import Image from 'next/image'

const Loading: React.FC = () => {
	return (
		<div>
			<div className='flex justify-center items-center h-screen'>
				<Image src={img} alt="Loading" />
			</div>
		</div>
	)
}

export default Loading