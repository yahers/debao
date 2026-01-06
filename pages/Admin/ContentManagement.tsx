
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import AdminLayout from '../../components/AdminLayout';
import { useLocation } from 'react-router-dom';

const ContentManagement: React.FC = () => {
  const { articles, setArticles, banners, setBanners, standards, setStandards } = useContext(AppContext);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialTab = query.get('tab') === 'standards' ? 'STANDARDS' : 'ARTICLES';
  
  const [activeTab, setActiveTab] = useState<'ARTICLES' | 'BANNERS' | 'STANDARDS'>(initialTab);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  // Form States
  const [formData, setFormData] = useState<any>({});

  const openModal = (item: any = null) => {
    setEditItem(item);
    setFormData(item || {
      title: '', summary: '', content: '', type: 'NEWS', category: '行业新闻', imageUrl: 'https://picsum.photos/400/300', isActive: true,
      name: '', code: '', fileSize: '2.0 MB', downloads: 0, link: ''
    });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'ARTICLES') {
      if (editItem) {
        setArticles(articles.map((a: any) => a.id === editItem.id ? { ...formData } : a));
      } else {
        setArticles([...articles, { ...formData, id: 'a' + Date.now(), publishDate: new Date().toISOString().split('T')[0] }]);
      }
    } else if (activeTab === 'BANNERS') {
      if (editItem) {
        setBanners(banners.map((b: any) => b.id === editItem.id ? { ...formData } : b));
      } else {
        setBanners([...banners, { ...formData, id: 'b' + Date.now() }]);
      }
    } else if (activeTab === 'STANDARDS') {
      if (editItem) {
        setStandards(standards.map((s: any) => s.id === editItem.id ? { ...formData } : s));
      } else {
        setStandards([...standards, { ...formData, id: 's' + Date.now(), downloads: 0, status: 'ACTIVE' }]);
      }
    }
    setShowModal(false);
  };

  const handleDelete = (id: string, type: string) => {
    if (!window.confirm('确定要删除这项内容吗？')) return;
    if (type === 'art') setArticles(articles.filter((a: any) => a.id !== id));
    if (type === 'ban') setBanners(banners.filter((b: any) => b.id !== id));
    if (type === 'std') setStandards(standards.filter((s: any) => s.id !== id));
  };

  return (
    <AdminLayout title="内容管理">
      <div className="mb-10 flex gap-4 overflow-x-auto pb-2">
        {['ARTICLES', 'BANNERS', 'STANDARDS'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}
          >
            {tab === 'ARTICLES' ? '新闻与科普' : tab === 'BANNERS' ? '门户轮播图' : '行业标准下载'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
           <h3 className="font-bold text-gray-800 text-lg">
             {activeTab === 'ARTICLES' ? '文章列表' : activeTab === 'BANNERS' ? '轮播图列表' : '标准文档列表'}
           </h3>
           <button onClick={() => openModal()} className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
             <span className="material-symbols-outlined text-[18px]">add</span> 新增内容
           </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">{activeTab === 'STANDARDS' ? '标准名称' : '标题/名称'}</th>
                <th className="px-8 py-4">{activeTab === 'BANNERS' ? '链接' : '分类'}</th>
                <th className="px-8 py-4">{activeTab === 'BANNERS' ? '状态' : '日期/大小'}</th>
                <th className="px-8 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {activeTab === 'ARTICLES' && articles.map((art: any) => (
                <tr key={art.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-4"><div className="flex items-center gap-4"><img src={art.imageUrl} className="size-10 rounded object-cover" /><span className="font-bold text-gray-800">{art.title}</span></div></td>
                  <td className="px-8 py-4"><span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">{art.category}</span></td>
                  <td className="px-8 py-4 text-sm text-gray-400">{art.publishDate}</td>
                  <td className="px-8 py-4 text-right space-x-2">
                    <button onClick={() => openModal(art)} className="p-2 text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                    <button onClick={() => handleDelete(art.id, 'art')} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </td>
                </tr>
              ))}
              {activeTab === 'BANNERS' && banners.map((ban: any) => (
                <tr key={ban.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-4"><div className="flex items-center gap-4"><img src={ban.imageUrl} className="w-20 h-10 rounded object-cover" /><span className="font-bold text-gray-800">{ban.title}</span></div></td>
                  <td className="px-8 py-4 text-xs text-gray-400">{ban.link}</td>
                  <td className="px-8 py-4"><span className={`text-[10px] font-bold px-2 py-1 rounded ${ban.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{ban.isActive ? '展示中' : '已下线'}</span></td>
                  <td className="px-8 py-4 text-right space-x-2">
                    <button onClick={() => openModal(ban)} className="p-2 text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                    <button onClick={() => handleDelete(ban.id, 'ban')} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </td>
                </tr>
              ))}
              {activeTab === 'STANDARDS' && standards.map((std: any) => (
                <tr key={std.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-4"><div><p className="font-bold text-gray-800">{std.name}</p><p className="text-[10px] text-gray-400 uppercase tracking-tighter">{std.code}</p></div></td>
                  <td className="px-8 py-4 text-xs text-gray-500">{std.category}</td>
                  <td className="px-8 py-4 text-xs text-gray-400">{std.fileSize}</td>
                  <td className="px-8 py-4 text-right space-x-2">
                    <button onClick={() => openModal(std)} className="p-2 text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                    <button onClick={() => handleDelete(std.id, 'std')} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-800">{editItem ? '编辑' : '新增'}{activeTab === 'ARTICLES' ? '文章' : activeTab === 'BANNERS' ? '轮播图' : '标准'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSave} className="p-8 overflow-y-auto space-y-6">
              {activeTab === 'ARTICLES' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">标题</label>
                      <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">分类</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm">
                        <option>行业新闻</option><option>科普分享</option><option>公司动态</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">封面图URL</label>
                    <input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">摘要</label>
                    <textarea value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full border-gray-200 rounded-xl p-4 text-sm h-20" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">内容</label>
                    <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full border-gray-200 rounded-xl p-4 text-sm h-32" />
                  </div>
                </>
              )}
              {activeTab === 'BANNERS' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">标题</label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">图片URL</label>
                    <input required value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">跳转链接</label>
                    <input value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="rounded text-primary focus:ring-primary" id="ban-active" />
                    <label htmlFor="ban-active" className="text-sm text-gray-600 font-bold">是否启用展示</label>
                  </div>
                </>
              )}
              {activeTab === 'STANDARDS' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">标准名称</label>
                      <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">标准编号</label>
                      <input required value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" placeholder="如: GB/T 18883" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">分类</label>
                      <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">文件大小</label>
                      <input value={formData.fileSize} onChange={e => setFormData({...formData, fileSize: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
                    </div>
                  </div>
                </>
              )}
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">取消</button>
                <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">保存更改</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ContentManagement;
