"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const { user, loading } = useAuth();
  const { itemCount, totalCents } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  type DropdownKey = 'clothing' | 'sportswear' | 'footwear' | 'accessories';

  const [mobileDropdowns, setMobileDropdowns] = useState<Record<DropdownKey, boolean>>({
    clothing: false,
    sportswear: false,
    footwear: false,
    accessories: false
  });

  const toggleMobileDropdown = (dropdown: DropdownKey) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/auth/signout", {
        method: "POST",
      });
      if (res.redirected) {
        window.location.href = res.url;
      } else {
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openSearch = () => {
    closeMobileMenu();
    // Small delay to ensure mobile menu closes first
    setTimeout(() => {
      const searchOffcanvas = document.getElementById("offcanvasSearch");
      if (searchOffcanvas) {
        const bsOffcanvas = new (window as any).bootstrap.Offcanvas(
          searchOffcanvas,
        );
        bsOffcanvas.show();
      }
    }, 100);
  };

  return (
    <>
         <header className="bg-white border-bottom sticky-top" style={{ zIndex: 1030 }}>
           <div className="container-fluid">
             <div className="row py-3 align-items-center">
               {/* Logo */}
               <div className="col-6 col-md-2">
                 <Link href="/" className="d-block">
                   <Image
                     src="/images/logo.png"
                     alt="Lakshman Logo"
                     width={150}
                     height={30}
                     className="img-fluid"
                   />
                 </Link>
               </div>

               {/* Desktop Navigation */}
               <div className="col-md-6 col-lg-6 d-none d-md-flex">
                 <nav className="main-menu w-100">
                   <ul className="navbar-nav d-flex flex-row gap-3 mb-0">
                     {/* Clothing Dropdown */}
                     <li className="nav-item dropdown">
                       <a
                         className="nav-link dropdown-toggle"
                         href="#"
                         role="button"
                         data-bs-toggle="dropdown"
                         aria-expanded="false"
                       >
                         Clothing
                       </a>
                       <ul className="dropdown-menu">
                         <li>
                           <Link className="dropdown-item" href="/#products?category=men">
                             Men
                           </Link>
                         </li>
                         <li>
                           <Link className="dropdown-item" href="/#products?category=women">
                             Women
                           </Link>
                         </li>
                         <li>
                           <Link className="dropdown-item" href="/#products?category=kids">
                             Kids
                           </Link>
                         </li>
                       </ul>
                     </li>

                     {/* Sportswear Dropdown */}
                     <li className="nav-item dropdown">
                       <a
                         className="nav-link dropdown-toggle"
                         href="#"
                         role="button"
                         data-bs-toggle="dropdown"
                         aria-expanded="false"
                       >
                         Sportswear
                       </a>
                       <ul className="dropdown-menu">
                         <li>
                           <Link className="dropdown-item" href="/#products?category=running">
                             Running
                           </Link>
                         </li>
                         <li>
                           <Link className="dropdown-item" href="/#products?category=cricket">
                             Cricket
                           </Link>
                         </li>
                         <li>
                           <Link className="dropdown-item" href="/#products?category=football">
                             Football
                           </Link>
                         </li>
                         <li>
                           <Link className="dropdown-item" href="/#products?category=waskat">
                             Waskat
                           </Link>
                         </li>
                       </ul>
                     </li>

                     {/* Footwear Dropdown */}
                     <li className="nav-item dropdown">
                       <a
                         className="nav-link dropdown-toggle"
                         href="#"
                         role="button"
                         data-bs-toggle="dropdown"
                         aria-expanded="false"
                       >
                         Footwear
                       </a>
                       <ul className="dropdown-menu">
                         <li>
                           <Link className="dropdown-item" href="/#products?category=sports-shoes">
                             Sports Shoes
                           </Link>
                         </li>
                         <li>
                           <Link className="dropdown-item" href="/#products?category=casual-shoes">
                             Casual
                           </Link>
                         </li>
                       </ul>
                     </li>

                     {/* Accessories Dropdown */}
                     <li className="nav-item dropdown">
                       <a
                         className="nav-link dropdown-toggle"
                         href="#"
                         role="button"
                         data-bs-toggle="dropdown"
                         aria-expanded="false"
                       >
                         Accessories
                       </a>
                       <ul className="dropdown-menu">
                         <li>
                           <Link className="dropdown-item" href="/#products?category=bat">
                             Bat
                           </Link>
                         </li>
                         <li>
                           <Link className="dropdown-item" href="/#products?category=ball">
                             Ball
                           </Link>
                         </li>
                         <li>
                           <Link className="dropdown-item" href="/#products?category=gloves">
                             Gloves
                           </Link>
                         </li>
                         <li>
                           <Link className="dropdown-item" href="/#products?category=backpack">
                             Backpack
                           </Link>
                         </li>
                       </ul>
                     </li>

                     {/* Furniture Dropdown */}
                     <li className="nav-item dropdown">
                       <a
                         className="nav-link dropdown-toggle"
                         href="#"
                         role="button"
                         data-bs-toggle="dropdown"
                         aria-expanded="false"
                       >
                         Furniture
                       </a>
                       <ul className="dropdown-menu">
                         <li>
                           <Link className="dropdown-item" href="/#products?category=home-furniture">
                             Home
                           </Link>
                         </li>
                         <li>
                           <Link className="dropdown-item" href="/#products?category=office-furniture">
                             Office
                           </Link>
                         </li>
                       </ul>
                     </li>
                   </ul>
                 </nav>
               </div>

               {/* Desktop Search */}
               <div className="col-md-2 d-none d-md-block">
                 <button
                   className="search-bar bg-light p-2 rounded-4 d-flex align-items-center border-0 w-100 text-start"
                   type="button"
                   data-bs-toggle="offcanvas"
                   data-bs-target="#offcanvasSearch"
                 >
                   <span className="text-muted flex-grow-1 ps-2 small">
                     Search...
                   </span>
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="20"
                     height="20"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                   >
                     <circle cx="11" cy="11" r="8" />
                     <path d="m21 21-4.35-4.35" />
                   </svg>
                 </button>
               </div>

               {/* Desktop User & Cart */}
               <div className="col-md-2 d-none d-md-flex justify-content-end gap-3 align-items-center">
                 {/* User Account */}
                 {user ? (
                   <div className="dropdown">
                     <button
                       className="btn btn-link text-decoration-none p-0 d-flex align-items-center"
                       type="button"
                       data-bs-toggle="dropdown"
                     >
                       <div
                         className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                         style={{ width: "32px", height: "32px" }}
                       >
                         {user.user_metadata?.name?.charAt(0).toUpperCase() ||
                           user.email?.charAt(0).toUpperCase()}
                       </div>
                     </button>
                     <ul className="dropdown-menu dropdown-menu-end">
                       <li>
                         <Link className="dropdown-item" href="/account">
                           My Account
                         </Link>
                       </li>
                       <li>
                         <Link className="dropdown-item" href="/account?tab=orders">
                           My Orders
                         </Link>
                       </li>
                       <li>
                         <hr className="dropdown-divider" />
                       </li>
                       <li>
                         <button
                           className="dropdown-item text-danger"
                           onClick={handleLogout}
                         >
                           Logout
                         </button>
                       </li>
                     </ul>
                   </div>
                 ) : (
                   <Link href="/auth/login" className="btn btn-outline-primary btn-sm">
                     Sign In
                   </Link>
                 )}

                 {/* Cart */}
                 <button
                   className="btn btn-link position-relative p-0"
                   data-bs-toggle="offcanvas"
                   data-bs-target="#offcanvasCart"
                 >
                   <svg
                     width="24"
                     height="24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                   >
                     <circle cx="9" cy="21" r="1" />
                     <circle cx="20" cy="21" r="1" />
                     <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                   </svg>
                   {itemCount > 0 && (
                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                       {itemCount}
                     </span>
                   )}
                 </button>
               </div>

               {/* Mobile: Cart + Hamburger */}
               <div className="col-6 d-md-none d-flex justify-content-end align-items-center gap-3">
                 {/* Mobile Cart Button */}
                 <button
                   className="btn btn-link position-relative p-0"
                   data-bs-toggle="offcanvas"
                   data-bs-target="#offcanvasCart"
                 >
                   <svg
                     width="24"
                     height="24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                   >
                     <circle cx="9" cy="21" r="1" />
                     <circle cx="20" cy="21" r="1" />
                     <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                   </svg>
                   {itemCount > 0 && (
                     <span
                       className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                       style={{ fontSize: "10px" }}
                     >
                       {itemCount}
                     </span>
                   )}
                 </button>

                 {/* Hamburger Menu Toggle */}
                 <button
                   className="btn btn-link p-0 text-dark"
                   onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                   aria-label="Toggle menu"
                 >
                   <svg
                     width="28"
                     height="28"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                   >
                     <path d="M3 12h18M3 6h18M3 18h18" />
                   </svg>
                 </button>
               </div>
             </div>
           </div>
         </header>

         {/* Mobile Menu Overlay */}
         {mobileMenuOpen && (
           <>
             <div
               className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
               style={{ zIndex: 1040 }}
               onClick={closeMobileMenu}
             />

             <div
               className="position-fixed top-0 end-0 h-100 bg-white d-md-none overflow-auto"
               style={{
                 width: "85%",
                 maxWidth: "400px",
                 zIndex: 1050,
                 boxShadow: "-2px 0 10px rgba(0,0,0,0.1)",
               }}
             >
               {/* Mobile Menu Header */}
               <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                 <h5 className="mb-0 fw-bold">Menu</h5>
                 <button
                   className="btn btn-link p-0 text-dark"
                   onClick={closeMobileMenu}
                 >
                   <svg
                     width="24"
                     height="24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                   >
                     <path d="M18 6L6 18M6 6l12 12" />
                   </svg>
                 </button>
               </div>

               {/* User Section */}
               <div className="p-3 border-bottom bg-light">
                 {user ? (
                   <div className="d-flex align-items-center">
                     <div
                       className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                       style={{ width: "50px", height: "50px", fontSize: "20px" }}
                     >
                       {user.user_metadata?.name?.charAt(0).toUpperCase() ||
                         user.email?.charAt(0).toUpperCase()}
                     </div>
                     <div>
                       <div className="fw-semibold">
                         {user.user_metadata?.name || user.email?.split("@")[0]}
                       </div>
                       <small className="text-muted">{user.email}</small>
                     </div>
                   </div>
                 ) : (
                   <Link
                     href="/auth/login"
                     className="btn btn-primary w-100"
                     onClick={closeMobileMenu}
                   >
                     Sign In / Register
                   </Link>
                 )}
               </div>

               {/* Mobile Search Button */}
               <div className="p-3 border-bottom">
                 <button
                   className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
                   onClick={openSearch}
                 >
                   <svg
                     width="18"
                     height="18"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                   >
                     <circle cx="11" cy="11" r="8" />
                     <path d="m21 21-4.35-4.35" />
                   </svg>
                   <span>Search Products</span>
                 </button>
               </div>

               {/* Navigation Links with Dropdowns */}
               <div className="py-2">
                 {/* Clothing Dropdown */}
                 <div className="border-bottom">
                   <button
                     className="d-flex justify-content-between align-items-center w-100 px-3 py-3 border-0 bg-white text-dark text-start"
                     onClick={() => toggleMobileDropdown('clothing')}
                   >
                     <div className="d-flex align-items-center">
                       <svg width="20" height="20" className="me-3" fill="currentColor">
                         <path d="M12 2c-1.1 0-2 .9-2 2v1H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-2V4c0-1.1-.9-2-2-2zm0 2h2v2h-2V4zm4 5v12H8V9h8z" />
                       </svg>
                       <span className="fw-semibold">Clothing</span>
                     </div>
                     <svg
                       width="16"
                       height="16"
                       fill="currentColor"
                       style={{
                         transform: mobileDropdowns.clothing ? 'rotate(180deg)' : 'rotate(0deg)',
                         transition: 'transform 0.2s'
                       }}
                     >
                       <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                     </svg>
                   </button>
                   {mobileDropdowns.clothing && (
                     <div className="bg-light">
                       <Link
                         href="/#products?category=men"
                         className="d-block px-5 py-2 text-decoration-none text-dark"
                         onClick={closeMobileMenu}
                       >
                         Men
                       </Link>
                       <Link
                         href="/#products?category=women"
                         className="d-block px-5 py-2 text-decoration-none text-dark"
                         onClick={closeMobileMenu}
                       >
                         Women
                       </Link>
                       <Link
                         href="/#products?category=kids"
                         className="d-block px-5 py-2 text-decoration-none text-dark"
                         onClick={closeMobileMenu}
                       >
                         Kids
                       </Link>
                     </div>
                   )}
                 </div>

                 {/* Sportswear Dropdown */}
                 <div className="border-bottom">
                   <button
                     className="d-flex justify-content-between align-items-center w-100 px-3 py-3 border-0 bg-white text-dark text-start"
                     onClick={() => toggleMobileDropdown('sportswear')}
                   >
                     <div className="d-flex align-items-center">
                       <svg width="20" height="20" className="me-3" fill="currentColor">
                         <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
                       </svg>
                       <span className="fw-semibold">Sportswear</span>
                     </div>
                     <svg
                       width="16"
                       height="16"
                       fill="currentColor"
                       style={{
                         transform: mobileDropdowns.sportswear ? 'rotate(180deg)' : 'rotate(0deg)',
                         transition: 'transform 0.2s'
                       }}
                     >
                       <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                     </svg>
                   </button>
                   {mobileDropdowns.sportswear && (
                     <div className="bg-light">
                       <Link
                         href="/#products?category=running"
                         className="d-block px-5 py-2 text-decoration-none text-dark"
                         onClick={closeMobileMenu}
                       >
                         Running
                       </Link>
                       <Link
                         href="/#products?category=cricket"
                         className="d-block px-5 py-2 text-decoration-none text-dark"
                         onClick={closeMobileMenu}
                       >
                         Cricket
                       </Link>
                       <Link
                         href="/#products?category=football"
                         className="d-block px-5 py-2 text-decoration-none text-dark"
                         onClick={closeMobileMenu}
                       >
                         Football
                       </Link>
                       <Link
                         href="/#products?category=waskat"
                         className="d-block px-5 py-2 text-decoration-none text-dark"
                         onClick={closeMobileMenu}
                       >
                         Waskat
                       </Link>
                     </div>
                   )}
                 </div>

                 {/* Footwear Dropdown */}
                 <div className="border-bottom">
                   <button
                     className="d-flex justify-content-between align-items-center w-100 px-3 py-3 border-0 bg-white text-dark text-start"
                     onClick={() => toggleMobileDropdown('footwear')}
                   >
                     <div className="d-flex align-items-center">
                       <svg width="20" height="20" className="me-3" fill="currentColor">
                         <path d="M12.95 11.31L9.97 8.33C9.67 8.03 9.27 7.87 8.86 7.87s-.81.16-1.11.46L2.5 13.58V20h6.42l5.25-5.25c.61-.61.61-1.59 0-2.2l-1.22-1.24zM7.85 18H4.5v-3.35l3.35-3.35 3.35 3.35L7.85 18z" />
                       </svg>
                       <span className="fw-semibold">Footwear</span>
                     </div>
                     <svg
                       width="16"
                       height="16"
                       fill="currentColor"
                       style={{
                         transform: mobileDropdowns.footwear ? 'rotate(180deg)' : 'rotate(0deg)',
                         transition: 'transform 0.2s'
                       }}
                     >
                       <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                     </svg>
                   </button>
                   {mobileDropdowns.footwear && (
                     <div className="bg-light">
                       <Link
                         href="/#products?category=sports-shoes"
                         className="d-block px-5 py-2 text-decoration-none text-dark"
                         onClick={closeMobileMenu}
                       >
                         Sports Shoes
                       </Link>
                       <Link
                         href="/#products?category=casual-shoes"
                         className="d-block px-5 py-2 text-decoration-none text-dark"
                         onClick={closeMobileMenu}
                       >
                         Casual
                       </Link>
                     </div>
                   )}
                 </div>

                 {/* Accessories Dropdown */}
                 <div className="border-bottom">
                   <button
                     className="d-flex justify-content-between align-items-center w-100 px-3 py-3 border-0 bg-white text-dark text-start"
                     onClick={() => toggleMobileDropdown('accessories')}
                   >
                     <div className="d-flex align-items-center">
                       <svg width="20" height="20" className="me-3" fill="currentColor">
                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                       </svg>
                       <span className="fw-semibold">Accessories</span>
                     </div>
                     <svg
                       width="16"
                       height="16"
                       fill="currentColor"
                       style={{
                         transform: mobileDropdowns.accessories ? 'rotate(180deg)' : 'rotate(0deg)',
                         transition: 'transform 0.2s'
                       }}
                     >
                       <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                     </svg>
                   </button>
                   {mobileDropdowns.accessories && (
                     <div className="bg-light">
                       <Link
                         href="/#products?category=bat"
                         className="d-block px-5 py-2 text-decoration-none text-dark"
                         onClick={closeMobileMenu}
                       >
                         Bat
                       </Link>
                       <Link
                         href="/#products?category=ball"
                         className="d-block px-5 py-2 text-decoration-none text-dark"
                         onClick={closeMobileMenu}
                       >
                         Ball
                       </Link>
                       <Link
                         href="/#products?category=gloves"
                         className="d-block px-5 py-2 text-decoration-none text-dark"
                         onClick={closeMobileMenu}
                       >
                         Gloves
                       </Link>
                       <Link
                         href="/#products?category=backpack"
                         className="d-block px-5 py-2 text-decoration-none text-dark"
                         onClick={closeMobileMenu}
                       >
                         Backpack
                       </Link>
                     </div>
                   )}
                 </div>

                 {/* Furniture Link */}
                 <Link
                   href="/#products?category=furniture"
                   className="d-block px-3 py-3 text-decoration-none text-dark border-bottom"
                   onClick={closeMobileMenu}
                 >
                   <div className="d-flex align-items-center">
                     <svg width="20" height="20" className="me-3" fill="currentColor">
                       <path d="M7 11h2v2H7zm12-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                     </svg>
                     <span className="fw-semibold">Furniture</span>
                   </div>
                 </Link>
               </div>

               {/* User Account Links */}
               {user && (
                 <div className="py-2 border-top">
                   <Link
                     href="/account"
                     className="d-block px-3 py-3 text-decoration-none text-dark border-bottom"
                     onClick={closeMobileMenu}
                   >
                     <div className="d-flex align-items-center">
                       <svg width="20" height="20" className="me-3" fill="currentColor">
                         <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                       </svg>
                       <span className="fw-semibold">My Account</span>
                     </div>
                   </Link>

                   <Link
                     href="/account?tab=orders"
                     className="d-block px-3 py-3 text-decoration-none text-dark border-bottom"
                     onClick={closeMobileMenu}
                   >
                     <div className="d-flex align-items-center">
                       <svg width="20" height="20" className="me-3" fill="currentColor">
                         <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                       </svg>
                       <span className="fw-semibold">My Orders</span>
                     </div>
                   </Link>

                   <button
                     className="d-block w-100 px-3 py-3 text-start border-0 bg-white text-danger"
                     onClick={handleLogout}
                   >
                     <div className="d-flex align-items-center">
                       <svg width="20" height="20" className="me-3" fill="currentColor">
                         <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                       </svg>
                       <span className="fw-semibold">Logout</span>
                     </div>
                   </button>
                 </div>
               )}

               {/* Cart Summary in Mobile Menu */}
               <div className="p-3 bg-light border-top mt-auto">
                 <div className="d-flex justify-content-between align-items-center mb-2">
                   <span className="fw-semibold">Cart Total:</span>
                   <span className="fw-bold text-primary">
                     ₹{(totalCents / 100).toFixed(2)}
                   </span>
                 </div>
                 <button
                   className="btn btn-primary w-100"
                   data-bs-toggle="offcanvas"
                   data-bs-target="#offcanvasCart"
                   onClick={closeMobileMenu}
                 >
                   View Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
                 </button>
               </div>
             </div>
           </>
         )}
       </>
  );
}
