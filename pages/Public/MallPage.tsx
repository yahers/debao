
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import PublicLayout from '../../components/PublicLayout';
import { Link } from 'react-router-dom';

const MallPage: React.FC = () => {
  const { categories, products } = useContext(AppContext);
  const featuredProducts = products.filter((p: any) => p.status === 'APPROVED').slice(0, 4);

  return (
    <PublicLayout>
      {/* Search Header */}
      <div className="bg-primary py-10 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white">
            <h1 className="text-3xl font-black mb-2">场景化采购方案</h1>
            <p className="opacity-90">点击场景中的设备查看详情，为不同空间定制专业净化方案</p>
          </div>
          <div className="relative max-w-xl w-full">
            <input type="text" placeholder="搜索空气净化器、滤芯..." className="w-full h-12 pl-6 pr-24 rounded-lg border-none focus:ring-2 focus:ring-white/50 text-gray-800" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-dark text-white px-6 py-2 rounded-md font-bold hover:brightness-110 transition-all">搜索</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Mall Nav */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 border-b border-gray-100 mb-10">
          <Link to="/mall" className="bg-primary text-white px-6 py-2 rounded font-bold text-sm">全部</Link>
          <button className="px-6 py-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium">家用净化</button>
          <button className="px-6 py-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium">商用净化</button>
          <button className="px-6 py-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium">工业净化</button>
          <button className="px-6 py-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium">车载净化</button>
          <button className="px-6 py-2 text-gray-500 hover:text-primary transition-colors text-sm font-medium">净化耗材</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar Categories */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
              <div className="bg-primary/5 p-4 border-b border-gray-100">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">category</span> 场景产品分类
                </h3>
              </div>
              <nav className="p-2">
                {categories.map((cat: any) => (
                  <button key={cat.id} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium flex items-center justify-between group transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-primary">check_box_outline_blank</span>
                      {cat.name}
                    </div>
                    <span className="text-xs text-gray-400 font-bold">{cat.productCount}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="mt-8 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl p-6 text-white shadow-lg">
              <h4 className="font-bold text-lg mb-4">需要定制专属净化方案？</h4>
              <p className="text-xs text-gray-300 mb-6">填写您的需求信息，我们的专业团队将在24小时内与您联系。</p>
              <Link to="/scenarios" className="block w-full text-center bg-white text-secondary font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors">立即咨询</Link>
            </div>
          </aside>

          {/* Main Content: Scenarios & Products */}
          <div className="lg:col-span-3 space-y-12">
            {/* Hot Scenarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden h-40 group cursor-pointer">
                <img src="https://picsum.photos/600/300?random=120" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Scenario" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h4 className="text-white font-bold text-xl">农业场景采购</h4>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden h-40 group cursor-pointer">
                <img src="https://picsum.photos/600/300?random=121" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Scenario" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h4 className="text-white font-bold text-xl">医疗场景采购</h4>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">shopping_basket</span> 热门产品
                </h3>
                <Link to="/mall/all" className="text-sm text-gray-400 hover:text-primary">查看全部产品 →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {featuredProducts.map((p: any) => (
                  <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all flex gap-4 group">
                    <div className="w-32 h-32 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden">
                      <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={p.name} />
                    </div>
                    <div className="flex flex-col justify-between flex-1 py-1">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">{p.name}</h4>
                        <div className="flex items-center gap-1 text-orange-400 mb-2">
                          <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                          <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                          <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                          <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                          <span className="material-symbols-outlined text-[14px]">star_half</span>
                          <span className="text-[10px] text-gray-400 ml-1">(75)</span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2">{p.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-primary font-black text-lg">¥{p.price}</span>
                        <button className="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-colors">
                          <span className="material-symbols-outlined">add_shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Order Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                <h4 className="font-bold text-gray-800">快速下单</h4>
                <button className="text-xs text-primary font-bold">查看全部产品清单</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-50/30">
                    <tr>
                      <th className="px-6 py-4 font-bold">产品名称</th>
                      <th className="px-6 py-4 font-bold">规格</th>
                      <th className="px-6 py-4 font-bold">单价</th>
                      <th className="px-6 py-4 font-bold">数量</th>
                      <th className="px-6 py-4 font-bold text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {featuredProducts.slice(0, 2).map((p: any) => (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-800">{p.name}</td>
                        <td className="px-6 py-4 text-gray-500">标准型</td>
                        <td className="px-6 py-4 font-bold">¥{p.price}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center border border-gray-200 rounded w-max">
                            <button className="px-2 py-1 hover:bg-gray-100">-</button>
                            <input type="text" className="w-8 border-none text-center p-0 text-xs focus:ring-0" value="1" readOnly />
                            <button className="px-2 py-1 hover:bg-gray-100">+</button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-primary font-bold hover:underline">加入购物车</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default MallPage;
