import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-2xl p-8 bg-white shadow-md rounded-md">
                <h1 className="text-4xl font-bold mb-4">Question Paper Generator</h1>
                <p className="text-gray-600 mb-6">
                    Welcome to the Question Paper Generator, a tool that helps you create customized question papers for exams.
                </p>
                <div className="flex justify-center">
                    <Link to="/generate" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
