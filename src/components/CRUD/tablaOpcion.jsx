import { useMemo, useRef } from "react"
import { useState } from "react"
import { Icons } from "../../constants/Icons"
import { useDebounce } from "@uidotdev/usehooks";
import Loader from "../Loader";

const Table = ({
    data = [],
    columns = [],
    unique = 'id',
    search = "on",
    searchKeys = [unique],
    footers = [],
    handleRowClick = (row) => { console.log("No click handled: ", row) },
    noDataMessage = "",
    loadingMessage = "",
    theme = "dark",
    loading = false,
}) => {
    const [searchText, setSearchText] = useState('')
    const [filter, setFilter] = useState({ attribute: unique, ord: 0 })

    const searchRef = useRef()
    const someSelectedRef = useRef()
    const trashButtonRef = useRef()

    const debouncedSearchText = useDebounce(searchText, 500);

    const handleSearchButtonClick = () => {
        if (searchText.length > 0) {
            searchRef?.current?.blur()
            setSearchText('')
            return
        }
        searchRef?.current?.focus()
    }

    const searchVals = searchText.trim().toLowerCase().split(' ')
    const filteredData = useMemo(() => {

        return data?.filter(d =>
            searchVals.every(val =>
                searchKeys.some(key => d[key] !== null && d[key].toString().toLowerCase().includes(val))
            )
        ).sort((a, b) => {
            if (filter.ord === 1) return a[filter.attribute] > b[filter.attribute] ? 1 : -1
            if (filter.ord === 2) return a[filter.attribute] < b[filter.attribute] ? 1 : -1
        })

    }, [data, debouncedSearchText, filter])


    return (
        loading ? (
            <Loader message={loadingMessage} className="bg-gray-50" />
        ) : !data.length ? (
            <div className="flex items-center justify-center size-full bg-gray-50">
                <p className="text-sm italic text-center text-gray-700">
                    {noDataMessage}
                </p>
            </div >
        ) :
            <div className={`relative overflow-auto size-full  ${theme === "dark" ? "bg-neutral-900 text-neutral-200" : " bg-white"}`}>
                {/* Header */}
                {search === "on" &&
                    <div className="sticky left-0 z-10 flex justify-end w-full p-3 h-14">
                        {/* Search */}
                        <div className="relative flex items-center bg-white shadow-sm">
                            <input
                                className='w-full h-full py-1 pl-3 pr-10 outline-none'
                                ref={searchRef}
                                onChange={(e) => { setSearchText(e.target.value) }}
                                value={searchText}
                                type="text"
                                placeholder="Search"
                            />
                            <button
                                onClick={handleSearchButtonClick}
                                className='absolute w-6 h-6 right-1 total-center opacity-white rounded-2xl'>
                                {
                                    searchText.length > 0 ?
                                        <Icons.Clear size='18px' style={{ color: '#4b5563' }} /> :
                                        <Icons.Search size='13px' style={{ color: '#4b5563' }} />
                                }
                            </button>
                        </div>
                    </div>
                }

                <div className={`absolute w-full
               ${search === 'on' ? "top-14" : ""}
               ${theme === 'dark' ? "" : "bg-white"}`}>
                    <div id="table-container" className={`relative flex w-full`}>
                        <table className={`w-full h-full `}>
                            <thead className='text-left'>
                                <tr className="h-8">
                                    {columns.map((column, index) => (
                                        <th className={`sticky top-0 z-10 items-center h-8 px-5 text-sm cursor-default font-bold ${theme === "dark" ? "bg-neutral-950    border-neutral-600" : "bg-[#E2E8F0] text-black"} whitespace-nowrap group`} key={index}>
                                            {column.label}
                                            <div className={`absolute right-0 w-8 h-8 p-1 -translate-y-1/2 top-1/2 ${filter.attribute === column.attribute && filter.ord !== 0 ? "opacity-100" : "opacity-0 group-hover:opacity-100"} duration-100`}>
                                                <button
                                                    type="button"
                                                    onClick={() => { setFilter(prev => ({ attribute: column.attribute, ord: (prev.attribute === column.attribute ? (prev.ord + 1) % 3 : 1) })) }}
                                                    className={` h-full w-full flex items-center justify-center`} >
                                                    {
                                                        filter.attribute === column.attribute ? (filter.ord === 1 ? <Icons.ArrowDown size="18px" /> : (filter.ord === 2 ? <Icons.ArrowUp size="18px" /> : <Icons.Filter size="18px" />)) : <Icons.Filter size="18px" />
                                                    }
                                                </button>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((row, i) =>
                                    <tr
                                        onClick={() => handleRowClick && handleRowClick(row)}
                                        className={`h-8 duration-150  ${row.type!="compra" ? theme === "dark" ? "hover:bg-neutral-700 cursor-pointer" : "hover:bg-blue-100 cursor-pointer":""} active:opacity-70 active:duration-0`}
                                        key={"R" + i}>
                                        {/*<td className="sticky px-2">
                                    <input
                                    readOnly checked={row?.isSelected | false} className="pointer-events-none" type="checkbox" />
                                 </td>*/
                                        }
                                        {columns.map((column, j) =>
                                            <td key={j} className="border-b">
                                                <p className="flex items-center px-5 py-1 whitespace-nowrap">
                                                    {column.Component ?
                                                        <column.Component data={row[column.attribute]} />
                                                        : <>
                                                            {row[column.attribute]}
                                                        </>
                                                    }
                                                </p>
                                            </td>
                                        )}
                                    </tr>
                                )}

                            </tbody>
                            {footers && <tfoot className="sticky bottom-0 ">
                                <tr className="h-8 ">
                                    {columns.map((column, index) => {
                                        const FootComponent = column.foot && footers[column.attribute] && footers[column.attribute].Component
                                        return (
                                            <td key={`TF_${index}`} className="font-medium text-center">
                                                {column.foot && (
                                                    FootComponent ?
                                                        <FootComponent
                                                            data={footers[column.attribute]}
                                                        />
                                                        :
                                                        footers[column.attribute]
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            </tfoot>}
                        </table>
                    </div>
                </div>
            </div>
    )
}

export default Table