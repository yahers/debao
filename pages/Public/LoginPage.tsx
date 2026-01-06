
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import PublicLayout from '../../components/PublicLayout';

const LoginPage: React.FC = () => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [role, setRole] = useState<'SUPER_ADMIN' | 'VENDOR' | 'BUYER'>('BUYER');

  const handleLogin = () => {
    const mockUsers = {
      SUPER_ADMIN: { id: 'admin1', name: '系统管理员', email: 'admin@jingyuan.com', role: 'SUPER_ADMIN', points: 0, avatar: 'https://i.pravatar.cc/150?u=admin' },
      VENDOR: { id: 'v1', name: '环球过滤器-张经理', email: 'vendor@test.com', role: 'VENDOR', points: 0, avatar: 'https://i.pravatar.cc/150?u=vendor', vendorId: 'v1' },
      BUYER: { id: 'b1', name: '李明', email: 'liming@test.com', role: 'BUYER', points: 2500, avatar: 'https://i.pravatar.cc/150?u=buyer' },
    };

    const user = mockUsers[role];
    setUser(user);
    if (user.role === 'SUPER_ADMIN') navigate('/admin');
    else if (user.role === 'VENDOR') navigate('/vendor');
    else navigate('/mall');
  };

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
          <div className="bg-primary p-8 text-center text-white">
            <h2 className="text-2xl font-black mb-2">欢迎回来</h2>
            <p className="text-sm opacity-80">请选择身份并登录系统</p>
          </div>
          <div className="p-10 space-y-8">
            <div className="flex p-1 bg-gray-100 rounded-xl">
              <button 
                onClick={() => setRole('BUYER')}
                className={`flex-1 py-3 text-xs font-black rounded-lg transition-all ${role === 'BUYER' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                购买方
              </button>
              <button 
                onClick={() => setRole('VENDOR')}
                className={`flex-1 py-3 text-xs font-black rounded-lg transition-all ${role === 'VENDOR' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                供应商
              </button>
              <button 
                onClick={() => setRole('SUPER_ADMIN')}
                className={`flex-1 py-3 text-xs font-black rounded-lg transition-all ${role === 'SUPER_ADMIN' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                管理员
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">邮箱地址</label>
                <input type="email" defaultValue="test@example.com" className="w-full border-gray-200 rounded-xl focus:ring-primary focus:border-primary text-sm h-12" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">密码</label>
                <input type="password" defaultValue="password" className="w-full border-gray-200 rounded-xl focus:ring-primary focus:border-primary text-sm h-12" />
              </div>
            </div>

            <button 
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              立即登录
              <span className="material-symbols-outlined text-[20px]">login</span>
            </button>

            <div className="text-center text-xs text-gray-400">
              还没有账号？ <a href="#" className="text-primary font-bold hover:underline">立即注册</a>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
