import { useNavigate } from 'react-router-dom'

interface ContactActionButtonsProps {
    itemGuid: string
    email: string
    onRefresh: (itemGuid: string) => void
    onRemove: (itemGuid: string) => void
    isRefreshing: boolean
}

export default function ContactActionButtons({
    itemGuid,
    email,
    onRefresh,
    onRemove,
    isRefreshing
}: ContactActionButtonsProps) {
    const navigate = useNavigate()

    return (
        <>
            <button
                onClick={() => navigate(`/contact/${itemGuid}`)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition font-medium max-w-[28%]"
            >
                View
            </button>
            <button
                onClick={() => onRefresh(itemGuid)}
                disabled={isRefreshing}
                className="flex-1 px-3 py-2 bg-slate-200 text-slate-900 text-sm rounded-lg hover:bg-slate-300 disabled:bg-slate-100 transition font-medium max-w-[28%]"
            >
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
                onClick={() => onRemove(itemGuid)}
                className="flex-1 px-3 py-2 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200 transition font-medium max-w-[28%]"
            >
                Remove
            </button>
        </>
    )
}
