import React, { useState } from "react";

const Help = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [issue, setIssue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation logic can be added here

        // Call the parent component's onSubmit function
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Help Form</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="border border-gray-300 rounded w-full py-2 px-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="border border-gray-300 rounded w-full py-2 px-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issue">
                    Describe your issue
                </label>
                <textarea
                    id="issue"
                    className="border border-gray-300 rounded w-full py-2 px-3"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            >
                Submit
            </button>
        </form>
    );
};

export default Help;


