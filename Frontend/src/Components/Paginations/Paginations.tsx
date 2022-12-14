import './Paginations.scss';
import { PaginationsProps } from './Paginations.types';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useEffect, useState } from 'react';
import { useDashboard } from '../../Context/AppContext';
import { HandleAxiosError } from '../../utils/HandleAxiosErrors';
function Paginations({  total_pages, total_records, current , modelDispatch ,modelApi  , modelAction , isLoadingAction , totalRecords }: PaginationsProps) {
    const {authDispatch }: any = useDashboard()
    const [page, setPage] = useState<number | null>(null)
    useEffect(() => {
        if (page) {
            modelDispatch(isLoadingAction(true));
            (async () => {
                await modelApi(page).then((res:any) => {
                    modelDispatch(modelAction(res.data))
                    console.log(res.data)
                }).catch((err:any) => {
                    HandleAxiosError(err, authDispatch)
                    modelDispatch(isLoadingAction(false));
                })
            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    return (
        <div className="Paginations">
            <div className='Paginations_Show'>
                <span > SHOWING  {(current - 1) * 10 + 1}-{(current - 1) * 10 + totalRecords} of {total_records} </span>
            </div>
            <div className='Paginations_Pages '>
                {total_pages > 1 && current + 1 >= total_pages && <FiChevronLeft onClick={() => setPage(current - 1)} />}
                {current > 4 ?
                    <ul className='flex'>
                        <li>1</li>
                        <li>{current > 4 && "..."}</li>
                        <li>{current > 4 && current - 1}</li>
                        <li className='active'>{current}</li>
                        <li>{current > 4 && current + 1}</li>
                        <li>{current > 4 && "..."}</li>
                        <li>{total_pages}</li>
                    </ul>
                    : <ul className='flex'>
                        {
                            Array.from(Array(total_pages).keys()).map(num => <li key={num} onClick={() => setPage(num + 1)} className={current - 1 === num ? "active" : ""} >{num + 1}</li>)
                        }
                        {total_pages > 3 && <>
                            <li>...</li>
                            <li>{total_pages}</li>
                        </>}
                    </ul>
                }
                {total_pages > 1 && current + 1 <= total_pages && <FiChevronRight onClick={() => setPage(current + 1)} />}
            </div>
        </div>
    )
}

export default Paginations;
