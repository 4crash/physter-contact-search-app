import { useState } from 'react';

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

    // Detect if PNG or JPEG based on first few characters if possible, 
    // or just default to a safe one. raw base64 from Physter is usually jpeg or png.
    const prefix = picture.startsWith('iVBORw0KGgo') ? 'image/png' : 'image/jpeg';

    // Raw Base64 - add data URL prefix
    return `data:${prefix};base64,${picture}`;
}

// Get initials from name
function getInitials(name: string): string {
    return name.split(' ').filter(Boolean).map(n => n[0].toUpperCase()).join('');
}

export default function ContactAvatar({ profilePicture, fileAs, className }: ContactAvatarProps) {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const hasValidImage = !!profilePicture && isBase64String(profilePicture) && !imageError;
    const imageUrl = hasValidImage ? ensureDataUrl(profilePicture!) : '';

    return (
        <div className={className}>
            {hasValidImage ? (
                <>
                    {imageLoading && (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center animate-pulse">
                            <span className="text-lg font-bold text-white">
                                {getInitials(fileAs)}
                            </span>
                        </div>
                    )}
                    <img
                        src={imageUrl}
                        alt={fileAs}
                        className={`w-full h-full rounded-full object-cover ${imageLoading ? 'hidden' : ''}`}
                        onLoad={() => setImageLoading(false)}
                        onError={() => {
                            setImageError(true);
                            setImageLoading(false);
                        }}
                    />
                </>
            ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                        {getInitials(fileAs)}
                    </span>
                </div>
            )}
        </div>
    )
}