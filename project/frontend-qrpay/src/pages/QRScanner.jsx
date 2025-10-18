// src/pages/QRScanner.jsx
import React, {useState, useEffect} from 'react';
import { QrCode, Download, Share2, Copy, CheckCircle, User, Mail, Phone } from 'lucide-react';

export default function QRScanner() {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
    const userName = localStorage.getItem('userName') || 'User';

    useEffect(() => {
        generateQRCode();
    }, [userId]);

    const generateQRCode = () => {
        setLoading(true);
        // Generate QR code using a free API service
        // The QR code contains the user's unique ID
        const qrData = encodeURIComponent(userId);
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrData}`;
        setQrCodeUrl(qrUrl);
        setLoading(false);
    };

    const handleCopyUserId = () => {
        navigator.clipboard.writeText(userId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadQR = () => {
        const link = document.createElement('a');
        link.href = qrCodeUrl;
        link.download = `qr-code-${userId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShareQR = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My QR Code',
                    text: `My User ID: ${userId}`,
                    url: qrCodeUrl
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        } else {
            // Fallback: copy to clipboard
            handleCopyUserId();
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My QR Code</h1>
                <p className="text-gray-600">Your unique QR code for quick identification</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* QR Code Card */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                <QrCode className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Your QR Code</h2>
                                <p className="text-sm text-gray-600">Scan this code to access your profile</p>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Display */}
                    <div className="p-8 flex flex-col items-center justify-center">
                        {loading ? (
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-600">Generating QR Code...</p>
                            </div>
                        ) : (
                            <>
                                <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-gray-100 mb-6">
                                    <img
                                        src={qrCodeUrl}
                                        alt="User QR Code"
                                        className="w-64 h-64"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <button
                                        onClick={handleDownloadQR}
                                        className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                                    >
                                        <Download className="w-5 h-5" />
                                        <span>Download</span>
                                    </button>

                                    <button
                                        onClick={handleShareQR}
                                        className="flex items-center space-x-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-sm"
                                    >
                                        <Share2 className="w-5 h-5" />
                                        <span>Share</span>
                                    </button>

                                    <button
                                        onClick={handleCopyUserId}
                                        className="flex items-center space-x-2 px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition shadow-sm"
                                    >
                                        {copied ? (
                                            <>
                                                <CheckCircle className="w-5 h-5" />
                                                <span>Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-5 h-5" />
                                                <span>Copy ID</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 mt-6 text-center max-w-md">
                                    This QR code contains your unique user ID. Share it with others to quickly connect or make payments.
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* User Info Card */}
                <div className="space-y-6">
                    {/* Profile Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Information</h3>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-600 mb-1">Name</p>
                                    <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-600 mb-1">Email</p>
                                    <p className="text-sm font-semibold text-gray-900 truncate">{userEmail}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <QrCode className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-600 mb-1">User ID</p>
                                    <p className="text-xs font-mono text-gray-900 break-all">{userId}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Usage Info */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li className="flex items-start space-x-2">
                                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                                <span>Show your QR code to another user</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                                <span>They can scan it to get your user ID</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                                <span>Use for quick payments or connections</span>
                            </li>
                        </ul>
                    </div>

                    {/* Security Note */}
                    <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
                        <div className="flex items-start space-x-2">
                            <div className="w-5 h-5 text-amber-600 flex-shrink-0">⚠️</div>
                            <div>
                                <p className="text-sm font-semibold text-amber-900 mb-1">Security Note</p>
                                <p className="text-xs text-amber-800">
                                    Only share your QR code with trusted individuals. It contains your unique user ID.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <QrCode className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Unique Code</h3>
                    <p className="text-sm text-gray-600">
                        Your QR code is unique to your account and never changes.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <Download className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Save & Share</h3>
                    <p className="text-sm text-gray-600">
                        Download your QR code or share it directly with others.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <Share2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Access</h3>
                    <p className="text-sm text-gray-600">
                        Others can scan your code for instant identification.
                    </p>
                </div>
            </div>
        </div>
    );
}