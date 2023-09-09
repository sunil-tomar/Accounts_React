import React, { Link } from 'react';

export default function Header(){
    return <div className="app-header">
             <ul>
             <li><Link to="/login">Login </Link></li>
             <li><Link to="/">Home </Link></li>
             <li> <Link to="/accounts">Accounts </Link></li>
             <li> <Link to="/product">Product </Link></li>
             <li><Link to="/about">About </Link></li>
             <li> <Link to="/contact">Contact </Link></li>
             <li> <Link to="/QnA">Exam </Link></li>
             </ul>
         </div>
   }
 