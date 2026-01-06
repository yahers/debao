
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import AdminLayout from '../../components/AdminLayout';

const Dashboard: React.FC = () => {
  const { products, articles, user } = useContext(AppContext);
  const pendingApprovals = products.filter((p: any) => p.status === 'PENDING').length;

  const stats = [
    { name: '待审核商品', value: pendingApprovals, icon: 'approval', color: 'bg-orange-500' },
    { name: '本月订单数', value: '1,240', icon: 'shopping_cart', color: 'bg-blue-500' },
    { name: '活跃供应商', value: '42', icon: 'storefront', color: 'bg-primary' },
    { name: '总积分发放', value: '850k', icon: 'stars', color: 'bg-purple-500' },
  ];

  return (
    <AdminLayout title="控制台总览">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`size-14 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg shadow-current/20`}>
              <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.name}</p>
              <p className="text-2xl font-black text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">最新内容动态</h3>
              <button className="text-sm text-primary font-bold hover:underline">管理全部内容</button>
            </div>
            <div className="divide-y divide-gray-50">
              {articles.slice(0, 5).map((art: any) => (
                <div key={art.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <img src={art.imageUrl} className="size-12 rounded object-cover" alt="" />
                    <div>
                      <p className="font-bold text-sm text-gray-800">{art.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{art.category} • {art.publishDate}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">已发布</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-6">快捷操作</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-primary/10 hover:text-primary transition-all group">
                <span className="material-symbols-outlined text-2xl mb-2 group-hover:scale-110 transition-transform">add_circle</span>
                <span className="text-xs font-bold">发布新闻</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-primary/10 hover:text-primary transition-all group">
                <span className="material-symbols-outlined text-2xl mb-2 group-hover:scale-110 transition-transform">upload_file</span>
                <span className="text-xs font-bold">上传标准</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-primary/10 hover:text-primary transition-all group">
                <span className="material-symbols-outlined text-2xl mb-2 group-hover:scale-110 transition-transform">category</span>
                <span className="text-xs font-bold">修改分类</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-primary/10 hover:text-primary transition-all group">
                <span className="material-symbols-outlined text-2xl mb-2 group-hover:scale-110 transition-transform">account_balance_wallet</span>
                <span className="text-xs font-bold">积分结算</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 text-white shadow-lg">
             <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined">verified</span>
                <h4 className="font-bold">审核中心</h4>
             </div>
             <p className="text-xs opacity-80 leading-relaxed mb-6">当前有 {pendingApprovals} 个商品待审核，请及时处理以免影响供应商运营效率。</p>
             <button className="w-full py-3 bg-white text-primary font-bold rounded-lg shadow-sm hover:bg-gray-100 transition-colors">前往审核</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
