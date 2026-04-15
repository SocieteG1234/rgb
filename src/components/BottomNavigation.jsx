import React from 'react';
import { LayoutGrid, ArrowUpRight, CreditCard, MessageCircle, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const RBC_BLUE = '#003168';

const BottomNavigation = () => {
  const navigate  = useNavigate();
  const location  = useLocation();

  const navItems = [
    { id: 'synthese',   label: 'Synthèse',   icon: LayoutGrid,    page: '/dashboard'  },
    { id: 'virements',  label: 'Virements',  icon: ArrowUpRight,  page: '/virement'   },
    { id: 'cartes',     label: 'Cartes',     icon: CreditCard,    page: '/cartes'     },
    { id: 'conseiller', label: 'Conseiller', icon: MessageCircle, page: '/conseiller' },
    { id: 'actus',      label: 'Mes actus',  icon: Bell,          page: '/actus'      },
  ];

  const activeItem = navItems.find(i => location.pathname === i.page)?.id || 'synthese';

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#fff', borderTop: '1px solid #e5e7eb',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.06)', zIndex: 50,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '8px 0 4px' }}>
        {navItems.map(item => {
          const Icon     = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button key={item.id} onClick={() => navigate(item.page)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer',
              color: isActive ? RBC_BLUE : '#9ca3af', padding: '4px 12px',
            }}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
              {isActive && <div style={{ width: 16, height: 3, background: RBC_BLUE, borderRadius: 2 }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;