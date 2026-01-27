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
                className="btn-primary btn-medium"
                aria-label={`View details for ${email}`}
            >
                View
            </button>
            <button
                onClick={() => onRefresh(itemGuid)}
                disabled={isRefreshing}
                className="btn-secondary "
                aria-label={`Refresh contact data for ${email}`}
            >
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
                onClick={() => onRemove(itemGuid)}
                className="btn-danger btn-medium"
                aria-label={`Remove ${email} from history`}
            >
                Remove
            </button>
        </>
    )
}
