import React from 'react';
import { ArrowDownLeft, ArrowUpRight, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BGC_RED  = '#CC0000';
const BGC_DARK = '#1A1A2E';

const QuickActions = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const actions = [
    { id: 'historique', label: 'Historique', icon: ArrowDownLeft, page: '/historique' },
    { id: 'virement',   label: 'Virement',   icon: ArrowUpRight,  page: '/virement'   },
    { id: 'cartes',     label: 'Cartes',     icon: CreditCard,    page: '/cartes'     },
  ];

  const handleClick = (action) => {
    if (setActiveTab) setActiveTab(action.id);
    navigate(action.page);
  };

  return (
    <div style={{ padding: '0 16px', marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #E5E7EB' }}>
        {actions.map((action) => {
          const Icon     = action.icon;
          const isActive = activeTab === action.id;
          return (
            <button key={action.id} onClick={() => handleClick(action)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer',
              color: isActive ? BGC_RED : '#6B7280',
              transition: 'color 0.2s',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: isActive ? '#FEE2E2' : '#F3F4F6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: isActive ? `2px solid ${BGC_RED}` : '2px solid transparent',
                transition: 'all 0.2s',
              }}>
                <Icon style={{ width: 20, height: 20 }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{action.label}</span>
              {isActive && (
                <div style={{ width: '100%', height: 2, borderRadius: 9999, background: BGC_RED }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;