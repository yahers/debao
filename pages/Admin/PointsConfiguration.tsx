
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import AdminLayout from '../../components/AdminLayout';

const PointsConfiguration: React.FC = () => {
  const { tiers, setTiers } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [editTier, setEditTier] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const openModal = (t: any = null) => {
    setEditTier(t);
    setFormData(t || { name: '', minSpend: 0, maxSpend: 1000, multiplier: 1.0 });
    setShowModal(true);
  };

  const handleSaveTier = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTier) {
      setTiers(tiers.map((t: any) => t.id === editTier.id ? { ...formData } : t));
    } else {
      setTiers([...tiers, { ...formData, id: 't' + Date.now() }]);
    }
    setShowModal(false);
  };

  const deleteTier = (id: string) => {
    if (window.confirm('确定删除该会员等级？')) {
      setTiers(tiers.filter((t: any) => t.id !== id));
    }
  };

  return (
    <AdminLayout title="积分系统配置">
      <div className="max-w-4xl space-y-8 pb-20">
        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
           <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
             <span className="material-symbols-outlined text-primary">toll</span> 基础积分规则
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">每消费多少元获得1积分</label>
                <div className="relative">
                  <input type="number" defaultValue="1" className="w-full border-gray-200 rounded-xl h-12 text-sm pl-4 pr-12" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">CNY</span>
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">积分抵扣上限</label>
                <div className="relative">
                  <input type="number" defaultValue="30" className="w-full border-gray-200 rounded-xl h-12 text-sm pl-4 pr-12" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">%</span>
                </div>
             </div>
           </div>
           <button onClick={() => alert('规则已保存！')} className="mt-8 bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm">保存全局设置</button>
        </section>

        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">stars</span> 会员等级配置
              </h3>
              <button onClick={() => openModal()} className="text-sm font-bold text-primary hover:underline">+ 添加新等级</button>
           </div>
           <div className="space-y-4">
              {tiers.map((tier: any) => (
                <div key={tier.id} className="p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-8 group hover:border-primary/30 transition-all">
                  <div className="size-16 rounded-2xl bg-gray-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-bold text-gray-800 text-lg">{tier.name}</p>
                    <p className="text-xs text-gray-400">累积消费 {tier.minSpend} - {tier.maxSpend} 元 | 积分倍率: <span className="text-primary font-black">x{tier.multiplier}</span></p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => openModal(tier)} className="size-10 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-50 flex items-center justify-center"><span className="material-symbols-outlined">edit</span></button>
                    <button onClick={() => deleteTier(tier.id)} className="size-10 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-50 flex items-center justify-center"><span className="material-symbols-outlined">delete</span></button>
                  </div>
                </div>
              ))}
           </div>
        </section>
      </div>

      {/* Tier Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-800">{editTier ? '编辑等级' : '新增等级'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSaveTier} className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">等级名称</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-gray-200 rounded-xl h-12 text-sm" placeholder="如：铂金会员" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">消费区间(从)</label>
                  <input required type="number" value={formData.minSpend} onChange={e => setFormData({...formData, minSpend: Number(e.target.value)})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">消费区间(到)</label>
                  <input required type="number" value={formData.maxSpend} onChange={e => setFormData({...formData, maxSpend: Number(e.target.value)})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">积分奖励倍率</label>
                <input required type="number" step="0.1" value={formData.multiplier} onChange={e => setFormData({...formData, multiplier: Number(e.target.value)})} className="w-full border-gray-200 rounded-xl h-12 text-sm" />
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 border border-gray-200 rounded-xl font-bold text-gray-500">取消</button>
                <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20">保存等级</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default PointsConfiguration;
