
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import AdminLayout from '../../components/AdminLayout';

const MallManagement: React.FC = () => {
  const { categories, setCategories, scenarios, setScenarios } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<'CATEGORIES' | 'SCENARIOS'>('CATEGORIES');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const openModal = (item: any = null) => {
    setEditItem(item);
    setFormData(item || {
      name: '', thumbnail: 'https://picsum.photos/200/200', productCount: 0, status: 'ACTIVE',
      sku: '', linkedCategories: [], points: []
    });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'CATEGORIES') {
      if (editItem) {
        setCategories(categories.map((c: any) => c.id === editItem.id ? { ...formData } : c));
      } else {
        setCategories([...categories, { ...formData, id: 'cat' + Date.now(), productCount: 0 }]);
      }
    } else {
      if (editItem) {
        setScenarios(scenarios.map((s: any) => s.id === editItem.id ? { ...formData } : s));
      } else {
        setScenarios([...scenarios, { ...formData, id: 'sc' + Date.now() }]);
      }
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('确定要删除吗？')) return;
    if (activeTab === 'CATEGORIES') setCategories(categories.filter((c: any) => c.id !== id));
    else setScenarios(scenarios.filter((s: any) => s.id !== id));
  };

  return (
    <AdminLayout title="商城运营管理">
      <div className="mb-10 flex gap-4">
        <button 
          onClick={() => setActiveTab('CATEGORIES')}
          className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'CATEGORIES' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}
        >
          分类管理
        </button>
        <button 
          onClick={() => setActiveTab('SCENARIOS')}
          className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'SCENARIOS' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}
        >
          场景采购配置
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
           <h3 className="font-bold text-gray-800 text-lg">
             {activeTab === 'CATEGORIES' ? `全部分类 (${categories.length})` : '采购场景配置'}
           </h3>
           <button onClick={() => openModal()} className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
             <span className="material-symbols-outlined text-[18px]">add</span> {activeTab === 'CATEGORIES' ? '添加新分类' : '创建新场景'}
           </button>
        </div>
        
        {activeTab === 'CATEGORIES' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">分类名称</th>
                  <th className="px-8 py-4">缩略图</th>
                  <th className="px-8 py-4">商品数量</th>
                  <th className="px-8 py-4">状态</th>
                  <th className="px-8 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {categories.map((cat: any) => (
                  <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-4 font-bold text-gray-800">{cat.name}</td>
                    <td className="px-8 py-4"><img src={cat.thumbnail} className="size-12 rounded-lg object-cover border border-gray-100" /></td>
                    <td className="px-8 py-4 text-sm text-gray-500">{cat.productCount} 件商品</td>
                    <td className="px-8 py-4">
                      <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tight ${cat.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                        {cat.status === 'ACTIVE' ? '启用中' : '已隐藏'}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right space-x-2">
                       <button onClick={() => openModal(cat)} className="p-2 text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                       <button onClick={() => handleDelete(cat.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {scenarios.map((scene: any) => (
              <div key={scene.id} className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden group">
                <div className="aspect-video relative">
                  <img src={scene.thumbnail} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button onClick={() => openModal(scene)} className="bg-white text-primary px-6 py-2 rounded-lg font-bold text-sm shadow-xl flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">edit</span> 编辑
                    </button>
                    <button onClick={() => handleDelete(scene.id)} className="bg-white text-red-500 px-6 py-2 rounded-lg font-bold text-sm shadow-xl flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">delete</span> 删除
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg text-gray-800">{scene.name}</h4>
                  <p className="text-xs text-gray-400 mb-2">SKU: {scene.sku}</p>
                  <div className="flex flex-wrap gap-2">
                    {scene.linkedCategories.map((cId: string) => (
                      <span key={cId} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-bold">{categories.find((c: any) => c.id === cId)?.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-800">{editItem ? '编辑' : '新增'}{activeTab === 'CATEGORIES' ? '分类' : '场景'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSave} className="p-8 overflow-y-auto space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{activeTab === 'CATEGORIES' ? '分类名称' : '场景名称'}</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">图片/缩略图URL</label>
                <input required value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
              </div>
              {activeTab === 'SCENARIOS' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">场景SKU</label>
                  <input required value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
                </div>
              )}
              {activeTab === 'CATEGORIES' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">显示状态</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm">
                    <option value="ACTIVE">正常启用</option><option value="HIDDEN">隐藏/维护</option>
                  </select>
                </div>
              )}
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">取消</button>
                <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">确认提交</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default MallManagement;
