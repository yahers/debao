
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import AdminLayout from '../../components/AdminLayout';

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'USERS' | 'FORUM'>('USERS');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // Simplified internal state for demonstration of "operational" behavior
  const [userList, setUserList] = useState([
    { id: '1', name: '李明', role: 'BUYER', email: 'liming@example.com', status: 'ACTIVE', points: 2500 },
    { id: '2', name: '环球过滤器', role: 'VENDOR', email: 'vendor@test.com', status: 'ACTIVE', points: 0 },
    { id: '3', name: '张工', role: 'BUYER', email: 'zhang@example.com', status: 'SUSPENDED', points: 120 },
  ]);

  const openUserModal = (u: any = null) => {
    setEditingUser(u);
    setFormData(u || { name: '', email: '', role: 'BUYER', status: 'ACTIVE', points: 0 });
    setShowUserModal(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUserList(userList.map(u => u.id === editingUser.id ? { ...formData } : u));
    } else {
      setUserList([...userList, { ...formData, id: Date.now().toString() }]);
    }
    setShowUserModal(false);
  };

  const deleteUser = (id: string) => {
    if (window.confirm('确定要删除此用户吗？操作不可恢复。')) {
      setUserList(userList.filter(u => u.id !== id));
    }
  };

  return (
    <AdminLayout title="用户与社区管理">
      <div className="mb-10 flex gap-4">
        <button 
          onClick={() => setActiveTab('USERS')}
          className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'USERS' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}
        >
          用户列表
        </button>
        <button 
          onClick={() => setActiveTab('FORUM')}
          className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'FORUM' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}
        >
          论坛版块管理
        </button>
      </div>

      {activeTab === 'USERS' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
             <h3 className="font-bold text-gray-800 text-lg">平台用户 ({userList.length})</h3>
             <button onClick={() => openUserModal()} className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-bold text-sm">新增用户</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">用户名/邮箱</th>
                  <th className="px-8 py-4">角色</th>
                  <th className="px-8 py-4 text-center">当前积分</th>
                  <th className="px-8 py-4">状态</th>
                  <th className="px-8 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {userList.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-4">
                      <div><p className="font-bold text-gray-800">{u.name}</p><p className="text-xs text-gray-400">{u.email}</p></div>
                    </td>
                    <td className="px-8 py-4">
                      <span className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-tight ${u.role === 'VENDOR' ? 'bg-teal-100 text-teal-600' : 'bg-blue-100 text-blue-600'}`}>
                        {u.role === 'VENDOR' ? '供应商' : '购买方'}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-center text-sm font-bold text-orange-500">{u.points}</td>
                    <td className="px-8 py-4">
                      <span className={`size-2 inline-block rounded-full mr-2 ${u.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-xs font-bold text-gray-600">{u.status === 'ACTIVE' ? '正常' : '封禁'}</span>
                    </td>
                    <td className="px-8 py-4 text-right space-x-2">
                       <button onClick={() => openUserModal(u)} className="p-2 text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                       <button onClick={() => deleteUser(u.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
           <h3 className="font-bold text-lg text-gray-800 mb-8">论坛帖子审核队列</h3>
           <div className="space-y-6">
             {[1,2,3].map(i => (
               <div key={i} className="flex gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 group hover:bg-white transition-all">
                 <img src={`https://picsum.photos/100/100?random=${i+50}`} className="size-20 rounded-xl object-cover" alt="" />
                 <div className="flex-1">
                   <h4 className="font-bold text-gray-800 mb-2 group-hover:text-primary">关于净化器滤芯选择的建议</h4>
                   <p className="text-sm text-gray-500 line-clamp-2">净化器滤芯种类繁多，对于刚入手的用户来说确实很有迷惑性。这里我总结了几个要点...</p>
                   <div className="flex justify-between items-center mt-4">
                     <span className="text-xs text-gray-400">发帖人：净化达人 | 2023-10-12</span>
                     <div className="flex gap-2">
                        <button onClick={() => window.confirm('确定删除该贴？')} className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-red-500">删除</button>
                        <button className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold">置顶</button>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-800">{editingUser ? '编辑用户' : '新增用户'}</h3>
              <button onClick={() => setShowUserModal(false)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSaveUser} className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">用户名称</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">邮箱地址</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">用户角色</label>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm">
                    <option value="BUYER">购买方</option><option value="VENDOR">供应商</option><option value="SUPER_ADMIN">管理员</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">状态</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm">
                    <option value="ACTIVE">正常</option><option value="SUSPENDED">禁用</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowUserModal(false)} className="flex-1 py-4 border border-gray-200 rounded-xl font-bold text-gray-500">取消</button>
                <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20">保存用户</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UserManagement;
