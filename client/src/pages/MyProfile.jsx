import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux'; // If using Redux for user data
// import { updateUserProfile } from '../app/features/authSlice'; // Example Redux action
import { FiUser, FiEdit3, FiCamera, FiMail, FiLock, FiBell, FiLogOut, FiSave, FiX } from 'react-icons/fi'; // Example icons
import DashboardLayout from '../components/common/DashboardLayout'; // Assuming you have this

// Mock current user data - replace with your actual data source
const mockCurrentUser = {
    id: 'user123',
    fullName: 'Alex Johnson',
    username: 'alexj',
    email: 'alex.johnson@example.com',
    bio: 'Passionate software developer and avid hiker. Always looking for new challenges and adventures.',
    location: 'San Francisco, CA',
    phone: '555-123-4567',
    profilePictureUrl: 'https://via.placeholder.com/150/007bff/ffffff?Text=A', // Placeholder image
    coverImageUrl: 'https://via.placeholder.com/1000x300/6c757d/ffffff?Text=Profile+Cover', // Placeholder cover
    joinDate: '2022-01-15T10:00:00.000Z',
    // Add other relevant fields
};

const MyProfile = () => {
    // const dispatch = useDispatch();
    // const { user: currentUser, loading, error } = useSelector((state) => state.auth); // Example for Redux

    const [currentUser, setCurrentUser] = useState(mockCurrentUser); // Using mock for now
    const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'account', 'preferences'
    const [isEditing, setIsEditing] = useState(false);

    // Form state for personal info (example)
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        bio: '',
        location: '',
        phone: '',
        // profilePicture: null, // For file upload
        // coverImage: null, // For file upload
    });

    // Populate form when currentUser data is available or changes
    useEffect(() => {
        if (currentUser) {
            setFormData({
                fullName: currentUser.fullName || '',
                username: currentUser.username || '',
                bio: currentUser.bio || '',
                location: currentUser.location || '',
                phone: currentUser.phone || '',
            });
        }
    }, [currentUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        // Logic to update profile
        // Example with Redux: await dispatch(updateUserProfile({ userId: currentUser.id, ...formData }));
        console.log('Saving profile:', formData);
        // Mock update:
        setCurrentUser(prev => ({ ...prev, ...formData }));
        setIsEditing(false);
        alert('Profile updated successfully!'); // Replace with toast notification
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        console.log('Changing password...');
        alert('Password change functionality not implemented yet.');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'personal':
                return (
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleInputChange} disabled={!isEditing}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 disabled:bg-gray-100" />
                            </div>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input type="text" name="username" id="username" value={formData.username} onChange={handleInputChange} disabled={!isEditing}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 disabled:bg-gray-100" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" name="email" id="email" value={currentUser.email || ''} disabled
                                className="w-full border-gray-300 rounded-md shadow-sm sm:text-sm p-2 bg-gray-100 cursor-not-allowed" title="Email cannot be changed here" />
                        </div>
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea name="bio" id="bio" rows="3" value={formData.bio} onChange={handleInputChange} disabled={!isEditing}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 disabled:bg-gray-100"></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input type="text" name="location" id="location" value={formData.location} onChange={handleInputChange} disabled={!isEditing}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 disabled:bg-gray-100" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} disabled={!isEditing}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 disabled:bg-gray-100" />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 border-t mt-6 flex justify-end gap-3">
                            {isEditing ? (
                                <>
                                    <button type="button" onClick={() => {
                                        setIsEditing(false);
                                        setFormData({ fullName: currentUser.fullName, username: currentUser.username, bio: currentUser.bio, location: currentUser.location, phone: currentUser.phone });
                                    }}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 border border-gray-300 flex items-center gap-2">
                                        <FiX size={16} /> Cancel
                                    </button>
                                    <button type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm flex items-center gap-2">
                                        <FiSave size={16} /> Save Changes
                                    </button>
                                </>
                            ) : (
                                <button type="button" onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm flex items-center gap-2">
                                    <FiEdit3 size={16} /> Edit Profile
                                </button>
                            )}
                        </div>
                    </form>
                );
            case 'account':
                return (
                    <form onSubmit={handleChangePassword} className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">Change Password</h3>
                            <p className="text-sm text-gray-500 mb-4">Update your password for enhanced security.</p>
                        </div>
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input type="password" name="currentPassword" id="currentPassword" required
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input type="password" name="newPassword" id="newPassword" required
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input type="password" name="confirmNewPassword" id="confirmNewPassword" required
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                        </div>
                        <div className="pt-4 border-t mt-6 flex justify-end">
                            <button type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm flex items-center gap-2">
                                <FiLock size={16} /> Change Password
                            </button>
                        </div>
                    </form>
                );
            // Add cases for 'preferences', 'activity', etc.
            default:
                return <p>Select a tab.</p>;
        }
    };

    if (!currentUser) { // Or loading state from Redux
        return (
            <DashboardLayout>
                <div className="p-10 text-center text-gray-500">Loading profile...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div>
                {/* Main Content Area with Tabs */}
                <div className="bg-white shadow-xl rounded-lg">
                    {/* Tabs Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-1 sm:space-x-4 px-4 sm:px-6" aria-label="Tabs">
                            {[
                                { id: 'personal', label: 'Personal Info', icon: <FiUser /> },
                                { id: 'account', label: 'Account Settings', icon: <FiLock /> },
                                // Add more tabs as needed
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`whitespace-nowrap py-3 px-1 sm:px-3 border-b-2 font-medium text-sm flex items-center gap-2
                                        ${activeTab === tab.id
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {React.cloneElement(tab.icon, { size: 16, className: "hidden sm:inline-block" })} {/* Icon with conditional display */}
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 sm:p-8">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MyProfile;