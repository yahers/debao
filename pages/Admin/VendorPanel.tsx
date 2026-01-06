
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const VendorPanel: React.FC = () => {
  const { user, products, setProducts, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', price: 0, category: '工业空气净化', description: '', imageUrl: 'https://picsum.photos/400/400?random=' + Math.random()
  });

  const vendorProducts = products.filter((p: any) => p.vendorId === user?.id);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      ...newProduct,
      id: 'p' + Date.now(),
      sku: 'SKU-' + Date.now().toString().slice(-6),
      inventory: 100,
      brand: '我的品牌',
      vendorId: user?.id || 'v1',
      status: 'PENDING'
    };
    setProducts([...products, product]);
    setShowAddForm(false);
    alert('商品已提交，请等待管理员审核！');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
        <div className="mb-10 flex items-center gap-2">
          <div className="size-8 bg-teal-500 rounded flex items-center justify-center"><span className="material-symbols-outlined text-white text-lg">storefront</span></div>
          <span className="font-bold text-lg">供应商后台</span>
        </div>
        <nav className="flex-1 space-y-2">
          <button className="w-full text-left px-4 py-3 bg-teal-500 rounded-lg text-sm font-bold flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">inventory_2</span> 我的商品
          </button>
          <button className="w-full text-left px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-medium flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">brand_awareness</span> 品牌信息
          </button>
          <button className="w-full text-left px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-medium flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">payments</span> 财务对账
          </button>
        </nav>
        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 text-slate-500 hover:text-white transition-colors">
          <span className="material-symbols-outlined">logout</span> 退出登录
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-black text-gray-800">商品管理</h1>
            <p className="text-sm text-gray-400">管理您的在线商品及审核进度</p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span> 发布新商品
          </button>
        </header>

        {/* Product List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">商品名称</th>
                <th className="px-8 py-4">价格</th>
                <th className="px-8 py-4">分类</th>
                <th className="px-8 py-4">审核状态</th>
                <th className="px-8 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {vendorProducts.map((p: any) => (
                <tr key={p.id}>
                  <td className="px-8 py-4 flex items-center gap-4">
                    <img src={p.imageUrl} className="size-12 rounded object-cover" alt="" />
                    <span className="font-bold text-gray-800">{p.name}</span>
                  </td>
                  <td className="px-8 py-4 text-sm font-black text-primary">¥{p.price}</td>
                  <td className="px-8 py-4 text-xs font-bold text-gray-500">{p.category}</td>
                  <td className="px-8 py-4">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tight ${
                      p.status === 'APPROVED' ? 'bg-green-100 text-green-600' : 
                      p.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {p.status === 'APPROVED' ? '已通过' : p.status === 'PENDING' ? '待审核' : '被驳回'}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal: Add Product */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-black text-gray-800">发布新商品</h3>
                <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">close</span></button>
              </div>
              <form onSubmit={handleAddProduct} className="p-8 overflow-y-auto space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">商品名称</label>
                  <input required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} type="text" className="w-full border-gray-200 rounded-xl focus:ring-primary h-12 text-sm" placeholder="例如：高效工业空气过滤器" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">售价 (¥)</label>
                    <input required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} type="number" className="w-full border-gray-200 rounded-xl focus:ring-primary h-12 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">商品分类</label>
                    <select className="w-full border-gray-200 rounded-xl focus:ring-primary h-12 text-sm">
                      <option>工业空气净化</option>
                      <option>家用净水器</option>
                      <option>滤芯耗材</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">商品详情说明</label>
                  <textarea value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full border-gray-200 rounded-xl focus:ring-primary p-4 text-sm h-32" placeholder="请输入商品核心优势及规格参数..."></textarea>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-4 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">取消</button>
                  <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">提交审核</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VendorPanel;
