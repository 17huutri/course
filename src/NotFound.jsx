import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="bg-local md:bg-fixed" style={{
        backgroundImage: 'url(https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-8-800x457.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}>
        <Link to="/" className="link-home">
            Go Home
        </Link>
    </div>

);

export default NotFound;
