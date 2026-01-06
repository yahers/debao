
import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../../App';
import PublicLayout from '../../components/PublicLayout';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { products } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find((p: any) => p.id === id);

  if (!product) return <div>Product Not Found</div>;

  return (
    <PublicLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Gallery */}
            <div className="space-y-6">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100">
                <img src={product.imageUrl} className="w-full h-full object-cover" alt={product.name} />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-all cursor-pointer bg-white shadow-sm">
                    <img src={`https://picsum.photos/400/400?random=${i+100}`} className="w-full h-full object-cover" alt="" />
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                <Link to="/mall" className="hover:text-primary">商城首页</Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span>{product.category}</span>
              </nav>

              <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-8">
                 <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded">官方正品</span>
                 <span className="text-xs font-bold text-gray-400">品牌：<span className="text-gray-800">{product.brand}</span></span>
                 <span className="text-xs font-bold text-gray-400">SKU：<span className="text-gray-800">{product.sku}</span></span>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8 space-y-6">
                 <div className="flex items-baseline gap-4">
                    <span className="text-sm font-bold text-gray-400">商城价</span>
                    <span className="text-4xl font-black text-primary">¥{product.price}</span>
                 </div>
                 <div className="h-px bg-gray-50"></div>
                 <div className="grid grid-cols-2 gap-8 text-sm">
                    <div className="flex gap-2">
                       <span className="text-gray-400">库存</span>
                       <span className="font-bold text-gray-800">{product.inventory} 件</span>
                    </div>
                    <div className="flex gap-2">
                       <span className="text-gray-400">运费</span>
                       <span className="font-bold text-gray-800">免运费</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center gap-6">
                    <span className="text-sm font-bold text-gray-400">采购数量</span>
                    <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                       <button onClick={() => setQuantity(Math.max(1, quantity-1))} className="px-5 py-3 hover:bg-gray-50 transition-colors"><span className="material-symbols-outlined text-[18px]">remove</span></button>
                       <input type="number" value={quantity} readOnly className="w-16 border-none text-center font-bold text-lg focus:ring-0 p-0" />
                       <button onClick={() => setQuantity(quantity+1)} className="px-5 py-3 hover:bg-gray-50 transition-colors"><span className="material-symbols-outlined text-[18px]">add</span></button>
                    </div>
                 </div>

                 <div className="flex gap-4 pt-4">
                    <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3">
                       <span className="material-symbols-outlined">shopping_cart</span>
                       加入购物车
                    </button>
                    <button className="flex-1 bg-secondary hover:bg-secondary-dark text-white font-black py-4 rounded-2xl shadow-lg shadow-secondary/20 transition-all">
                       立即采购
                    </button>
                 </div>
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><span className="material-symbols-outlined">storefront</span></div>
                    <div>
                       <p className="font-bold text-gray-800">中元德宝官方旗舰店</p>
                       <div className="flex items-center gap-1 text-[10px] text-orange-400 font-bold uppercase tracking-wider mt-0.5">
                          <span className="material-symbols-outlined text-[12px] fill-current">stars</span>
                          五星商户
                       </div>
                    </div>
                 </div>
                 <button className="text-xs font-black text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all">进入店铺</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
         <div className="border-b border-gray-100 flex gap-12 mb-12">
            <button className="text-lg font-black text-gray-800 border-b-4 border-primary pb-4">产品详情</button>
            <button className="text-lg font-bold text-gray-400 hover:text-gray-600 pb-4">规格参数</button>
            <button className="text-lg font-bold text-gray-400 hover:text-gray-600 pb-4">评价 (75)</button>
         </div>
         <div className="prose prose-teal max-w-none">
            <p>{product.description}</p>
            <img src="https://picsum.photos/1200/600?random=10" className="rounded-2xl shadow-lg" alt="" />
            <p>本产品采用了最新的高效HEPA过滤技术，能够滤除空气中99.97%的小至0.3微米的颗粒物。内置高精度激光传感器，实时监测并显示空气质量状况。全封闭循环系统，确保在大风量下依然保持超静音运行。</p>
         </div>
      </div>
    </PublicLayout>
  );
};

export default ProductDetail;
