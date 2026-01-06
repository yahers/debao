
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../App';
import { LOGO_URL } from '../constants';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useContext(AppContext);
  const location = useLocation();

  const navLinks = [
    { name: '集团首页', path: '/' },
    { name: '净化商城', path: '/mall' },
    { name: '行业标准', path: '/downloads' },
    { name: '品牌实力', path: '/static/brand' },
    { name: '科研学术', path: '/static/science' },
    { name: '联系我们', path: '/static/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="bg-secondary text-white text-[10px] py-1 px-10 flex justify-end gap-6 uppercase tracking-wider font-bold">
        <a href="#" className="hover:opacity-70">德宝集团官微</a>
        <a href="#" className="hover:opacity-70 flex items-center gap-1">语言：中文 <span className="material-symbols-outlined text-[12px]">expand_more</span></a>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-gray-100 px-6 md:px-10 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <img src={LOGO_URL} className="h-14 md:h-16 w-auto object-contain" alt="德宝集团 Logo" />
          <div className="hidden md:block border-l border-gray-200 pl-4">
            <p className="text-xl font-black text-secondary tracking-tighter">德宝集团</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Global Tech & Purification</p>
          </div>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-[15px] font-bold transition-all hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-gray-800'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link to="/mall" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined">shopping_bag</span>
          </Link>
          <div className="h-6 w-px bg-gray-200"></div>
          {user ? (
            <Link to={user.role === 'SUPER_ADMIN' ? '/admin' : '/vendor'} className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-cover bg-center border border-gray-200" style={{ backgroundImage: `url(${user.avatar})` }}></div>
              <span className="text-sm font-bold text-gray-800 hidden md:inline">{user.name}</span>
            </Link>
          ) : (
            <Link to="/login" className="bg-primary text-white px-5 py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all">登录 / 注册</Link>
          )}
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-secondary-dark text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-1">
            <h4 className="text-2xl font-black mb-6 text-primary">德宝集团</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">作为净化产业的领军企业，我们始终致力于为全球客户提供最卓越的空气与水质解决方案。</p>
            <div className="flex gap-4">
              <a href="#" className="size-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors shadow-lg"><span className="material-symbols-outlined text-[20px]">chat</span></a>
              <a href="#" className="size-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors shadow-lg"><span className="material-symbols-outlined text-[20px]">share</span></a>
            </div>
          </div>
          <div>
            <h5 className="font-black mb-6 text-sm uppercase tracking-widest text-gray-300">快速导航</h5>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link to="/downloads" className="hover:text-white transition-colors">标准下载中心</Link></li>
              <li><Link to="/mall" className="hover:text-white transition-colors">净化商城平台</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">投资者关系</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black mb-6 text-sm uppercase tracking-widest text-gray-300">技术领域</h5>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">工业洁净室</a></li>
              <li><a href="#" className="hover:text-white transition-colors">智慧实验室</a></li>
              <li><a href="#" className="hover:text-white transition-colors">商用空气净化</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black mb-6 text-sm uppercase tracking-widest text-gray-300">服务支持</h5>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">售后在线报修</a></li>
              <li><a href="#" className="hover:text-white transition-colors">设备维护指南</a></li>
              <li><a href="#" className="hover:text-white transition-colors">联系技术专家</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black mb-6 text-sm uppercase tracking-widest text-gray-300">关于德宝</h5>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">集团简介</a></li>
              <li><a href="#" className="hover:text-white transition-colors">发展历程</a></li>
              <li><a href="#" className="hover:text-white transition-colors">招贤纳士</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-600 font-bold">© 2024 德宝集团 (Debao Group) 版权所有 | 京ICP备88888888号</p>
          <div className="flex gap-6">
            <span className="text-[10px] text-gray-700 font-black uppercase tracking-widest">Global Offices: Beijing | Shanghai | Chongqing</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
