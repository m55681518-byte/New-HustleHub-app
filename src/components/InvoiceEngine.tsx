import { useState } from 'react';
import { FileText, Download, Send, Plus } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

const InvoiceEngine = () => {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Development Phase 1', quantity: 1, rate: 2500 }
  ]);

  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, rate: 0 }]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <FileText className="text-indigo-400" /> Invoice Editor
        </h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 items-end bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <div className="flex-grow">
                <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Description</label>
                <input 
                  type="text" 
                  value={item.description}
                  onChange={(e) => {
                    const newItems = items.map(i => i.id === item.id ? {...i, description: e.target.value} : i);
                    setItems(newItems);
                  }}
                  className="w-full bg-transparent border-b border-slate-700 focus:border-indigo-500 outline-none py-1 transition-colors"
                />
              </div>
              <div className="w-20">
                <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Qty</label>
                <input 
                  type="number" 
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = items.map(i => i.id === item.id ? {...i, quantity: Number(e.target.value)} : i);
                    setItems(newItems);
                  }}
                  className="w-full bg-transparent border-b border-slate-700 focus:border-indigo-500 outline-none py-1"
                />
              </div>
              <div className="w-28">
                <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Rate</label>
                <input 
                  type="number" 
                  value={item.rate}
                  onChange={(e) => {
                    const newItems = items.map(i => i.id === item.id ? {...i, rate: Number(e.target.value)} : i);
                    setItems(newItems);
                  }}
                  className="w-full bg-transparent border-b border-slate-700 focus:border-indigo-500 outline-none py-1 text-indigo-400"
                />
              </div>
            </div>
          ))}
        </div>
        <button onClick={addItem} className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
          <Plus size={16} /> Add Line Item
        </button>
      </div>
      <div className="bg-white text-slate-950 p-10 rounded-2xl shadow-2xl shadow-indigo-500/5 min-h-[500px] flex flex-col">
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="text-2xl font-black tracking-tighter text-indigo-600 mb-1">HUSTLEHUB</div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Electronic Invoice</div>
          </div>
          <div className="text-right">
            <div className="font-bold">INV-{(new Date().getFullYear())}-001</div>
            <div className="text-sm text-slate-500">{new Date().toLocaleDateString()}</div>
          </div>
        </div>
        <div className="flex-grow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-slate-100 text-[10px] uppercase font-bold text-slate-400">
                <th className="py-4">Description</th>
                <th className="py-4 text-center">Qty</th>
                <th className="py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {items.map(item => (
                <tr key={item.id} className="border-b border-slate-50">
                  <td className="py-4 font-medium">{item.description || 'New Service'}</td>
                  <td className="py-4 text-center">{item.quantity}</td>
                  <td className="py-4 text-right font-bold">${(item.quantity * item.rate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 pt-8 border-t-2 border-slate-100 space-y-2">
          <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between text-slate-500"><span>Tax (10%)</span><span>${tax.toLocaleString()}</span></div>
          <div className="flex justify-between text-xl font-black pt-4"><span>Total Due</span><span className="text-indigo-600">${total.toLocaleString()}</span></div>
        </div>
        <div className="mt-10 flex gap-3">
          <button className="flex-grow py-3 bg-slate-950 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"><Download size={18} /> Download PDF</button>
          <button className="flex-grow py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all"><Send size={18} /> Send to Client</button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceEngine;