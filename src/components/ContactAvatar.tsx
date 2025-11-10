interface ContactAvatarProps {
    profilePicture?: string | null;
    fileAs: string;
    className?: string;
}

// Helper function to check if string is Base64
function isBase64String(str: string): boolean {
    if (!str) return false;
    // Check if it starts with data: (data URL) or matches Base64 pattern
    if (str.startsWith('data:')) return true;
    // Validate Base64 pattern (optional, for pure Base64 strings)
    try {
        return /^[A-Za-z0-9+/=]*$/.test(str) && str.length % 4 === 0;
    } catch {
        return false;
    }
}

// Convert raw Base64 to data URL if needed
function ensureDataUrl(picture: string): string {
    if (!picture) return '';

    // Already a data URL
    if (picture.startsWith('data:')) return picture;

    // Raw Base64 - add data URL prefix (default to JPEG)
    return `data:image/jpeg;base64,${picture}`;
}

export default function ContactAvatar({ profilePicture, fileAs, className }: ContactAvatarProps) {
    const hasValidImage = profilePicture && isBase64String(profilePicture);
    const imageUrl = hasValidImage ? ensureDataUrl(profilePicture) : '';

    return (
        <div className={className}>
            {
                hasValidImage ? (
                    <img
                        src={imageUrl}
                        alt={fileAs}
                        className=" rounded-full object-cover flex-shrink-0"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-white">
                            {fileAs.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}
        </div >
    )
}