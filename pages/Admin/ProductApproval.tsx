
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import AdminLayout from '../../components/AdminLayout';

const ProductApproval: React.FC = () => {
  const { products, setProducts } = useContext(AppContext);
  const pendingProducts = products.filter((p: any) => p.status === 'PENDING');
  const [selectedProduct, setSelectedProduct] = useState<any>(pendingProducts[0] || null);

  const handleApprove = (id: string) => {
    setProducts(products.map((p: any) => p.id === id ? { ...p, status: 'APPROVED' } : p));
    setSelectedProduct(null);
  };

  const handleReject = (id: string) => {
    setProducts(products.map((p: any) => p.id === id ? { ...p, status: 'REJECTED' } : p));
    setSelectedProduct(null);
  };

  return (
    <AdminLayout title="供应商商品审核">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Queue */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-[calc(100vh-200px)]">
          <div className="p-6 border-b border-gray-50">
            <h3 className="font-bold flex items-center justify-between">
              待审核列表
              <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full">{pendingProducts.length}</span>
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {pendingProducts.length > 0 ? pendingProducts.map((p: any) => (
              <div 
                key={p.id} 
                onClick={() => setSelectedProduct(p)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedProduct?.id === p.id ? 'bg-primary/5 border-primary' : 'bg-white border-gray-100 hover:border-gray-200'}`}
              >
                <div className="flex gap-4">
                  <img src={p.imageUrl} className="size-14 rounded-lg object-cover" alt="" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-800 truncate">{p.name}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">{p.brand} • SKU: {p.sku}</p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-300">
                <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
                <p className="text-sm font-bold">暂无待审核商品</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Detail View */}
        <div className="lg:col-span-2 space-y-6">
          {selectedProduct ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)]">
              <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
                <div>
                  <h4 className="text-2xl font-black text-gray-800">{selectedProduct.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">供应商：<span className="text-primary font-bold">环球过滤器有限公司</span></p>
                </div>
                <div className="flex gap-3">
                   <button onClick={() => handleReject(selectedProduct.id)} className="px-6 py-2 rounded-lg border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-colors">驳回修改</button>
                   <button onClick={() => handleApprove(selectedProduct.id)} className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">通过并上架</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10">
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">商品主图</h5>
                    <img src={selectedProduct.imageUrl} className="w-full aspect-square rounded-2xl object-cover shadow-sm border border-gray-100" alt="" />
                  </div>
                  <div className="space-y-6">
                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">基本属性</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold mb-1">建议售价</p>
                        <p className="text-lg font-black text-primary">¥{selectedProduct.price}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold mb-1">当前库存</p>
                        <p className="text-lg font-black text-gray-800">{selectedProduct.inventory} 件</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold mb-1">所属分类</p>
                        <p className="text-sm font-bold text-gray-800">{selectedProduct.category}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold mb-1">认证资质</p>
                        <p className="text-sm font-bold text-gray-800">CE, RoHS</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                   <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">商品详细描述</h5>
                   <div className="p-6 rounded-2xl bg-gray-50 text-sm text-gray-600 leading-relaxed">
                     {selectedProduct.description}
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-gray-100 rounded-2xl">
              <span className="material-symbols-outlined text-6xl mb-4">open_in_new</span>
              <p className="text-lg font-bold">请选择左侧商品进行审核</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductApproval;
