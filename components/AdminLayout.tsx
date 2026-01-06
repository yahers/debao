
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

const AdminLayout: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
  const { user, setUser } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const menuGroups = [
    {
      label: '控制台',
      items: [
        { name: '总览', path: '/admin', icon: 'dashboard' },
      ]
    },
    {
      label: '内容管理 (公司网站)',
      items: [
        { name: '网页内容管理', path: '/admin/content', icon: 'article' },
        { name: '行业标准管理', path: '/admin/content?tab=standards', icon: 'download' },
      ]
    },
    {
      label: '商城运营 (净化商城)',
      items: [
        { name: '分类管理', path: '/admin/mall', icon: 'category' },
        { name: '商品审核', path: '/admin/approval', icon: 'fact_check' },
        { name: '积分系统配置', path: '/admin/points', icon: 'toll' },
        { name: '场景采购配置', path: '/admin/mall?tab=scenarios', icon: 'water_drop' },
      ]
    },
    {
      label: '用户与供应商',
      items: [
        { name: '用户管理', path: '/admin/users', icon: 'group' },
        { name: '论坛内容管理', path: '/admin/users?tab=forum', icon: 'forum' },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">统一管理后台</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Admin Console</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {menuGroups.map((group) => (
            <div key={group.label} className="mb-6">
              <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[2px] mb-3">{group.label}</p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group ${location.pathname === item.path ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                  >
                    <span className={`material-symbols-outlined text-[20px] ${location.pathname === item.path ? 'fill' : ''}`}>{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
            <div className="size-10 rounded-full bg-cover bg-center border border-slate-700" style={{ backgroundImage: `url(${user?.avatar})` }}></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">超级管理员</p>
            </div>
            <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-colors">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 shrink-0 z-20">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input type="text" placeholder="搜索功能或内容..." className="bg-gray-100 border-none rounded-lg h-10 pl-10 pr-4 text-sm w-80 focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="flex items-center gap-3">
               <button className="relative p-2 text-gray-400 hover:text-primary transition-colors">
                 <span className="material-symbols-outlined">notifications</span>
                 <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
               </button>
               <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                 <span className="material-symbols-outlined">settings</span>
               </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
