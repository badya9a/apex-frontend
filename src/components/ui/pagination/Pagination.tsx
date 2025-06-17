import type { Dispatch, FC } from 'react'
import BsIcon from '../BsIcon'

const Pagination: FC<{
	page: number
	setPage: Dispatch<React.SetStateAction<number>>
	maxPages: number
}> = ({ page, setPage, maxPages }) => {
	return (
		<div className="flex gap-2 justify-center mt-2">
			<button
				className="hover:cursor-pointer"
				onClick={() => setPage(0)}
				disabled={page === 0 ? true : false}
			>
				<BsIcon name="BsChevronDoubleLeft" size={20} color="BsChevronLeft" />
			</button>
			<button
				className="hover:cursor-pointer"
				onClick={() => setPage((prev) => prev - 1)}
				disabled={page === 0 ? true : false}
			>
				<BsIcon name="BsChevronLeft" size={20} color="black" />
			</button>
			<p className="text-lg">{page + 1}</p>
			<button
				disabled={maxPages - 1 === page ? true : false}
				onClick={() => setPage((prev) => prev + 1)}
				className="hover:cursor-pointer"
			>
				<BsIcon name="BsChevronRight" size={20} color="black" />
			</button>
		</div>
	)
}
export default Pagination
