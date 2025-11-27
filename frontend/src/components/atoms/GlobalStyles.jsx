import React from 'react';

const GlobalStyles = () => (
  <style>{`
    /* Gaya dari loginstyle.css dan dashboard.html */
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Nunito Sans', -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 18px;
        background-color: #F5F6FA;
        overflow-x: hidden;
    }

    /* --- Gaya Login/Create Account --- */
    .create-account-page { background-color: #FFF; overflow: hidden; }
    .main-background {
        background-color: #4880FF; width: 100%; min-height: 100vh; position: relative;
        display: flex; align-items: center; justify-content: center; padding: 40px 20px;
    }
    .background-shapes { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
    .signup-container { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; width: 100%; }
    .signup-card {
        border-radius: 24px; background-color: #FFF; border: 0.3px solid #B9B9B9;
        display: flex; width: 630px; max-width: 100%; flex-direction: column;
        align-items: stretch; padding: 60px 57px;
    }
    .signup-title { color: #202224; font-size: 32px; font-weight: 700; text-align: center; margin: 0 0 15px 0; }
    .signup-subtitle { color: #202224; font-size: 18px; font-weight: 600; opacity: 0.8; text-align: center; margin-bottom: 61px; }
    .signup-form { width: 100%; }
    .form-group { margin-bottom: 25px; }
    .form-label { color: #202224; font-size: 18px; font-weight: 600; display: block; margin-bottom: 15px; }
    .form-input {
        width: 100%; height: 56px; border-radius: 8px; border: 1px solid #D8D8D8;
        background: #F1F4F9; padding: 16px; font-family: 'Nunito Sans', -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 18px; font-weight: 600; color: #202224; outline: none;
    }
    .form-input:focus { border-color: #4880FF; }
    .password-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .forget-password { color: #202224; font-size: 18px; font-weight: 600; opacity: 0.6; text-decoration: none; cursor: pointer; }
    .terms-checkbox { display: flex; align-items: center; gap: 12px; margin-top: 25px; }
    .checkbox-input {
        width: 24px; height: 24px; border-radius: 6px; border: 0.6px solid #A3A3A3;
        background: #FFF; position: relative; appearance: none; cursor: pointer; outline: none;
    }
    .checkbox-input:checked { background: #4880FF; border-color: #4880FF; }
    .checkbox-input:checked::after {
        content: ''; position: absolute; left: 8px; top: 4px; width: 6px; height: 12px;
        border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg);
    }
    .checkbox-label { color: #202224; font-size: 18px; font-weight: 600; opacity: 0.8; cursor: pointer; }
    .signup-button {
        width: 100%; max-width: 418px; height: 56px; border-radius: 8px;
        background: #4880FF; border: none; color: #FFF; font-family: 'Nunito Sans', -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 20px; font-weight: 700; cursor: pointer; margin: 55px auto 18px auto;
        display: block; transition: all 0.2s ease;
    }
    .signup-button:hover { opacity: 0.9; }
    .login-section { text-align: center; margin-top: 18px; }
    .login-text { color: #202224; font-size: 18px; font-weight: 600; opacity: 0.65; }
    .login-link { color: #5A8CFF; font-size: 18px; font-weight: 700; text-decoration: underline; margin-left: 6px; cursor: pointer; }

    /* --- Gaya Dashboard --- */
    .dashboard-layout { display: flex; min-height: 100vh; }
    .sidebar {
        width: 240px; background: #FFF; border-right: 0.9px solid #E0E0E0;
        flex-shrink: 0; transition: transform 0.3s ease-in-out;
    }
    .logo { padding: 24px 66px; font-size: 20px; font-weight: 800; }
    .logo .text-blue { color: #4880FF; }
    .sidebar-divider { height: 0.6px; background: #E0E0E0; margin: 50px 0; }
    .sidebar-menu { padding: 0; }
    .sidebar-item {
        height: 50px; display: flex; align-items: center; padding: 0 40px 0 78px;
        font-size: 14px; font-weight: 600; letter-spacing: 0.3px; cursor: pointer;
        position: relative; transition: all 0.2s ease;
    }
    .sidebar-item:not(.active):hover { background-color: #f0f4ff; }
    .sidebar-item.active { background: #4880FF; color: #FFF; border-radius: 6px; margin: 0 24px 0 0; }
    .sidebar-item.active::before { content: ''; position: absolute; left: -5px; top: 0; width: 9px; height: 50px; background: #4880FF; border-radius: 4px; }
    .main-content { flex: 1; background: #F5F6FA; overflow-y: auto; width: 100%; }
    .top-bar { height: 70px; background: #FFF; display: flex; align-items: center; padding: 0 30px; gap: 24px; }
    .menu-icon { font-size: 22px; opacity: 0.898; cursor: pointer; display: none; }
    .search-container { width: 388px; height: 38px; position: relative; }
    .search-input {
        width: 100%; height: 100%; border-radius: 19px; border: 0.6px solid #D5D5D5;
        background: #F5F6FA; padding: 0 20px 0 45px; font-size: 14px; color: #202224;
    }
    .search-input::placeholder { opacity: 0.5; }
    .search-icon { position: absolute; left: 17px; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; opacity: 0.5; }
    .content-area { padding: 40px 50px; }

    /* --- Gaya Tabel & Form Umum --- */
    .table-container { background: #FFF; border-radius: 8px; overflow-x: auto; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .table { width: 100%; border-collapse: collapse; }
    .table th, .table td { padding: 16px; text-align: left; white-space: nowrap; font-size: 16px; }
    .table th { background: #F8F9FA; font-weight: 600; border-bottom: 1px solid #E0E0E0; }
    .table td { border-bottom: 1px solid #F0F0F0; }
    .table tr:last-child td { border-bottom: none; }
    .table tr:hover { background: #f8f9fa; }

    .form-container { background: #FFF; padding: 50px; border-radius: 8px; max-width: 1013px; margin: 0 auto; }
    .form-row { display: flex; flex-wrap: wrap; gap: 40px; margin-bottom: 20px; }
    .form-col { flex: 1; min-width: 250px; }
    .form-field { margin-bottom: 25px; }
    .form-field label { display: block; font-size: 20px; font-weight: 600; margin-bottom: 7px; }
    .form-field input {
        width: 100%; height: 37px; border: 1px solid #000; background: #FFF;
        padding: 0 12px; font-size: 14px;
    }

    /* --- Gaya Tombol --- */
    .btn-group { display: flex; gap: 15px; justify-content: flex-end; margin-top: 40px; }
    .btn {
        padding: 8px 20px; border-radius: 6px; border: none; font-size: 16px;
        font-weight: 700; cursor: pointer; height: 34px; display: inline-flex;
        align-items: center; justify-content: center; transition: background-color 0.2s;
    }
    .btn-edit { background: #00A00D; color: #FFF; }
    .btn-edit:hover { background: #008a0b; }
    .btn-delete { background: #FF1A1A; color: #FFF; }
    .btn-delete:hover { background: #e01717; }
    .btn-add { background: #4880FF; color: #FFF; }
    .btn-add:hover { background: #3a6fe0; }
    .btn-cancel { background: #868e96; color: #FFF; }
    .btn-cancel:hover { background: #6c757d; }

    /* --- Gaya Modal --- */
    .modal-overlay {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); display: flex;
        justify-content: center; align-items: center; z-index: 1000;
    }
    .modal-content {
        background: #fff; padding: 30px; border-radius: 8px; text-align: center;
        width: 90%; max-width: 400px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    .modal-content h3 { margin-bottom: 15px; }
    .modal-content p { margin-bottom: 25px; color: #555; }

    /* --- Media Queries --- */
    @media (max-width: 768px) {
        .menu-icon { display: block; }
        .sidebar { position: fixed; left: 0; top: 0; height: 100%; z-index: 200; transform: translateX(-240px); }
        .sidebar.show { transform: translateX(0); }
        .content-area { padding: 20px; }
        .search-container { width: 100%; max-width: 250px; }
        .form-container { padding: 20px; }
    }
  `}</style>
);

export default GlobalStyles;