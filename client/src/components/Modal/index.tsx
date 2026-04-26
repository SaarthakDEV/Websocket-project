import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

type ModalProps = {
    open: boolean,
    onClose: () => void,
    userId: number,
}

type User = {
    id: string,
    name: string,
}

const Modal = ({ open, onClose, userId }: ModalProps) => {
    const user_id = useSelector((state:any) => state.auth.id);
    const [search, setSearch] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const fetchUsersList = async (query: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/users`, {
                params: { search: query }
            });
            if (response.status === 200) {
                setUsers(response.data.users.filter((user:{id: number}) => user.id !== userId) ?? []);
            }
        } catch {
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddFriend = async (user: User) => {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/user/friends/${user_id}`, { friend_id: user.id });
            setAddedIds(prev => new Set(prev).add(user.id));
            onClose();
        } catch {
            // handle error if needed
        }
    };

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (!search.trim()) {
            setUsers([]);
            return;
        }
        timeoutRef.current = setTimeout(() => {
            fetchUsersList(search);
        }, 500);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [search]);

    const handleClose = () => {
        setSearch("");
        setUsers([]);
        setAddedIds(new Set());
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={handleClose}>
            <div
                className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-6"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Friends</h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none"
                    >
                        ✕
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                />

                <div className="mt-3 max-h-64 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    {loading ? (
                        <p className="p-4 text-center text-sm text-gray-500">Searching...</p>
                    ) : users.length > 0 ? (
                        <ul>
                            {users.map((user, idx) => (
                                <li
                                    key={user.id}
                                    className={`flex items-center justify-between px-4 py-3 ${idx !== users.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                                >
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                                        {/* <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p> */}
                                    </div>
                                    <button
                                        onClick={() => handleAddFriend(user)}
                                        disabled={addedIds.has(user.id)}
                                        className="text-sm px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-green-500 disabled:cursor-default transition-colors"
                                    >
                                        {addedIds.has(user.id) ? 'Added' : 'Add'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : search.trim() ? (
                        <p className="p-4 text-center text-sm text-gray-500">No users found</p>
                    ) : (
                        <p className="p-4 text-center text-sm text-gray-400">Start typing to search</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
