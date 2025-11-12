'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  PiggyBank, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Calendar,
  MoreHorizontal,
  Eye,
  EyeOff,
  Home,
  BarChart3,
  Wallet,
  Settings,
  Bell,
  Plus,
  Search,
  Download,
  Upload,
  Zap,
  Shield,
  Smartphone,
  Car,
  ShoppingCart,
  Coffee,
  Plane,
  Building,
  BookOpen,
  Heart,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Briefcase,
  Calculator,
  FileText,
  Globe,
  Lightbulb,
  Edit,
  Trash2,
  Save,
  X,
  User,
  Lock,
  Palette,
  Moon,
  Sun,
  Mail,
  Database,
  HelpCircle,
  LogOut,
  ChevronRight,
  Activity,
  PieChart,
  BarChart,
  LineChart,
  Percent,
  Flag,
  Award,
  Coins,
  Banknote,
  Building2,
  Landmark
} from 'lucide-react'

// Mock data expandido
const monthlyData = [
  { month: 'Jan', income: 12500, expenses: 8200, savings: 4300, investments: 2000 },
  { month: 'Feb', income: 13200, expenses: 7800, savings: 5400, investments: 2200 },
  { month: 'Mar', income: 11800, expenses: 9100, savings: 2700, investments: 1800 },
  { month: 'Apr', income: 14500, expenses: 8900, savings: 5600, investments: 2500 },
  { month: 'May', income: 13800, expenses: 8400, savings: 5400, investments: 2300 },
  { month: 'Jun', income: 15200, expenses: 9200, savings: 6000, investments: 2800 },
]

const expenseCategories = [
  { name: 'Moradia', value: 3200, color: '#6366F1', icon: Building },
  { name: 'Alimentação', value: 1800, color: '#8B5CF6', icon: Coffee },
  { name: 'Transporte', value: 1200, color: '#3B82F6', icon: Car },
  { name: 'Entretenimento', value: 800, color: '#6366F1', icon: Smartphone },
  { name: 'Compras', value: 950, color: '#8B5CF6', icon: ShoppingCart },
  { name: 'Saúde', value: 650, color: '#3B82F6', icon: Heart },
  { name: 'Educação', value: 400, color: '#6366F1', icon: BookOpen },
  { name: 'Viagens', value: 300, color: '#8B5CF6', icon: Plane },
]

const transactions = [
  { id: 1, description: 'Salário Principal', amount: 8500, type: 'income', date: '2024-01-15', category: 'Trabalho', icon: Briefcase },
  { id: 2, description: 'Aluguel Apartamento', amount: -2200, type: 'expense', date: '2024-01-14', category: 'Moradia', icon: Building },
  { id: 3, description: 'Freelance Design', amount: 1200, type: 'income', date: '2024-01-13', category: 'Trabalho', icon: Briefcase },
  { id: 4, description: 'Supermercado Extra', amount: -450, type: 'expense', date: '2024-01-12', category: 'Alimentação', icon: ShoppingCart },
  { id: 5, description: 'Investimento CDB', amount: -1000, type: 'investment', date: '2024-01-11', category: 'Investimentos', icon: TrendingUp },
  { id: 6, description: 'Uber/99', amount: -35, type: 'expense', date: '2024-01-10', category: 'Transporte', icon: Car },
  { id: 7, description: 'Netflix + Spotify', amount: -49.90, type: 'expense', date: '2024-01-09', category: 'Entretenimento', icon: Smartphone },
  { id: 8, description: 'Dividendos ITUB4', amount: 85.50, type: 'income', date: '2024-01-08', category: 'Investimentos', icon: TrendingUp },
  { id: 9, description: 'Farmácia', amount: -120, type: 'expense', date: '2024-01-07', category: 'Saúde', icon: Heart },
  { id: 10, description: 'Curso Online', amount: -199, type: 'expense', date: '2024-01-06', category: 'Educação', icon: BookOpen },
]

const goals = [
  { id: 1, name: 'Casa Própria', current: 45000, target: 120000, color: '#6366F1', deadline: '2025-12', priority: 'high', description: 'Entrada para apartamento de 2 quartos', category: 'Imóvel' },
  { id: 2, name: 'Viagem Europa', current: 8500, target: 15000, color: '#8B5CF6', deadline: '2024-07', priority: 'medium', description: 'Viagem de 15 dias pela Europa', category: 'Lazer' },
  { id: 3, name: 'Reserva Emergência', current: 12000, target: 20000, color: '#3B82F6', deadline: '2024-06', priority: 'high', description: '6 meses de gastos essenciais', category: 'Segurança' },
  { id: 4, name: 'Carro Novo', current: 15000, target: 45000, color: '#6366F1', deadline: '2025-03', priority: 'low', description: 'SUV compacto 0km', category: 'Veículo' },
  { id: 5, name: 'Curso MBA', current: 3200, target: 25000, color: '#8B5CF6', deadline: '2024-08', priority: 'medium', description: 'MBA em Gestão Financeira', category: 'Educação' },
  { id: 6, name: 'Setup Home Office', current: 2800, target: 8000, color: '#3B82F6', deadline: '2024-04', priority: 'low', description: 'Computador e móveis para escritório', category: 'Trabalho' },
]

const investments = [
  { 
    id: 1,
    name: 'Tesouro Direto', 
    value: 25000, 
    percentage: 35, 
    return: '+8.2%', 
    color: '#6366F1',
    type: 'Renda Fixa',
    risk: 'Baixo',
    liquidity: 'Alta',
    monthlyReturn: 170.83,
    description: 'IPCA+ 2029'
  },
  { 
    id: 2,
    name: 'Ações Brasileiras', 
    value: 18000, 
    percentage: 25, 
    return: '+12.5%', 
    color: '#8B5CF6',
    type: 'Renda Variável',
    risk: 'Alto',
    liquidity: 'Alta',
    monthlyReturn: 187.50,
    description: 'ITUB4, PETR4, VALE3'
  },
  { 
    id: 3,
    name: 'CDB Banco Inter', 
    value: 15000, 
    percentage: 21, 
    return: '+9.8%', 
    color: '#3B82F6',
    type: 'Renda Fixa',
    risk: 'Baixo',
    liquidity: 'Média',
    monthlyReturn: 122.50,
    description: '110% CDI'
  },
  { 
    id: 4,
    name: 'Fundos Imobiliários', 
    value: 8500, 
    percentage: 12, 
    return: '+7.1%', 
    color: '#6366F1',
    type: 'Renda Variável',
    risk: 'Médio',
    liquidity: 'Alta',
    monthlyReturn: 50.29,
    description: 'HGLG11, XPML11'
  },
  { 
    id: 5,
    name: 'Criptomoedas', 
    value: 5000, 
    percentage: 7, 
    return: '+25.3%', 
    color: '#8B5CF6',
    type: 'Renda Variável',
    risk: 'Muito Alto',
    liquidity: 'Alta',
    monthlyReturn: 105.42,
    description: 'Bitcoin, Ethereum'
  },
]

const budgetCategories = [
  { name: 'Moradia', budgeted: 3500, spent: 3200, color: '#6366F1' },
  { name: 'Alimentação', budgeted: 2000, spent: 1800, color: '#8B5CF6' },
  { name: 'Transporte', budgeted: 1500, spent: 1200, color: '#3B82F6' },
  { name: 'Entretenimento', budgeted: 1000, spent: 800, color: '#6366F1' },
  { name: 'Compras', budgeted: 800, spent: 950, color: '#8B5CF6' },
  { name: 'Saúde', budgeted: 700, spent: 650, color: '#3B82F6' },
]

const creditCards = [
  { name: 'Nubank Ultravioleta', limit: 15000, used: 3200, dueDate: '2024-02-15', color: '#8B5CF6' },
  { name: 'Itaú Personnalité', limit: 25000, used: 1800, dueDate: '2024-02-20', color: '#6366F1' },
  { name: 'Bradesco Black', limit: 20000, used: 950, dueDate: '2024-02-18', color: '#3B82F6' },
]

const cardUsageData = [
  { month: 'Jul', nubank: 2800, itau: 1200, bradesco: 800 },
  { month: 'Ago', nubank: 3100, itau: 1500, bradesco: 900 },
  { month: 'Set', nubank: 2900, itau: 1800, bradesco: 1100 },
  { month: 'Out', nubank: 3300, itau: 1600, bradesco: 950 },
  { month: 'Nov', nubank: 3000, itau: 1900, bradesco: 850 },
  { month: 'Dez', nubank: 3200, itau: 1800, bradesco: 950 },
]

const alerts = [
  { id: 1, type: 'warning', message: 'Orçamento de Compras excedido em R$ 150', priority: 'high' },
  { id: 2, type: 'info', message: 'Fatura do Nubank vence em 3 dias', priority: 'medium' },
  { id: 3, type: 'success', message: 'Meta de economia mensal atingida!', priority: 'low' },
  { id: 4, type: 'warning', message: 'Gasto com transporte 20% acima da média', priority: 'medium' },
]

const insights = [
  { 
    id: 1,
    title: 'Economia Inteligente', 
    description: 'Você pode economizar R$ 340/mês reduzindo gastos com delivery',
    impact: 'R$ 4.080/ano',
    type: 'savings',
    priority: 'high',
    category: 'Gastos',
    action: 'Considere cozinhar mais em casa'
  },
  { 
    id: 2,
    title: 'Oportunidade de Investimento', 
    description: 'Com sua reserva atual, considere diversificar em ações',
    impact: '+15% retorno potencial',
    type: 'investment',
    priority: 'medium',
    category: 'Investimentos',
    action: 'Aloque 20% em renda variável'
  },
  { 
    id: 3,
    title: 'Otimização de Cartão', 
    description: 'Concentrar gastos no Itaú pode render mais pontos',
    impact: '2x mais benefícios',
    type: 'optimization',
    priority: 'low',
    category: 'Cartões',
    action: 'Use o Itaú para compras grandes'
  },
  {
    id: 4,
    title: 'Meta em Risco',
    description: 'Viagem Europa pode não ser atingida no prazo atual',
    impact: 'Atraso de 3 meses',
    type: 'warning',
    priority: 'high',
    category: 'Metas',
    action: 'Aumente contribuição em R$ 200/mês'
  },
  {
    id: 5,
    title: 'Diversificação Recomendada',
    description: 'Sua carteira está concentrada em renda fixa',
    impact: 'Risco de oportunidade',
    type: 'investment',
    priority: 'medium',
    category: 'Investimentos',
    action: 'Considere fundos imobiliários'
  },
  {
    id: 6,
    title: 'Cashback Perdido',
    description: 'R$ 85 em cashback não utilizados este mês',
    impact: 'R$ 1.020/ano perdidos',
    type: 'optimization',
    priority: 'low',
    category: 'Benefícios',
    action: 'Ative notificações de cashback'
  }
]

const investmentPerformanceData = [
  { month: 'Jan', total: 65000, rendaFixa: 38000, rendaVariavel: 27000 },
  { month: 'Feb', total: 67200, rendaFixa: 39100, rendaVariavel: 28100 },
  { month: 'Mar', total: 69800, rendaFixa: 40200, rendaVariavel: 29600 },
  { month: 'Apr', total: 70500, rendaFixa: 40800, rendaVariavel: 29700 },
  { month: 'May', total: 71200, rendaFixa: 41200, rendaVariavel: 30000 },
  { month: 'Jun', total: 71500, rendaFixa: 41500, rendaVariavel: 30000 },
]

// Função para formatar valores monetários de forma consistente
const formatCurrency = (value) => {
  return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// Componente de Gráfico de Fluxo de Caixa Avançado - AJUSTADO PARA PREENCHER MAIS ESPAÇO
const CashFlowChart = ({ data, height = 400 }) => {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="w-full h-full flex items-center justify-center" style={{ minHeight: height }}>
      <div className="text-gray-400">Carregando gráfico...</div>
    </div>
  }

  const maxValue = Math.max(...data.map(d => Math.max(d.income, d.expenses, d.savings)))
  const minValue = 0
  const range = maxValue - minValue
  
  return (
    <div className="w-full h-full" style={{ minHeight: height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
        {/* Grid lines */}
        {[0, 20, 40, 60, 80, 100].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#374151" strokeWidth="0.2" opacity="0.3" />
        ))}
        
        {/* Bars */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 85 + 7.5
          const barWidth = 10 / data.length
          
          const incomeHeight = (item.income / maxValue) * 75
          const expenseHeight = (item.expenses / maxValue) * 75
          const savingsHeight = (item.savings / maxValue) * 75
          
          return (
            <g key={index}>
              {/* Income bar */}
              <rect
                x={x - barWidth * 1.5}
                y={95 - incomeHeight - 10}
                width={barWidth}
                height={incomeHeight}
                fill="url(#incomeGradient)"
                className="hover:opacity-80 transition-opacity duration-300"
                rx="0.5"
              >
                <title>Receitas {item.month}: {formatCurrency(item.income)}</title>
              </rect>
              
              {/* Expense bar */}
              <rect
                x={x - barWidth * 0.5}
                y={95 - expenseHeight - 10}
                width={barWidth}
                height={expenseHeight}
                fill="url(#expenseGradient)"
                className="hover:opacity-80 transition-opacity duration-300"
                rx="0.5"
              >
                <title>Gastos {item.month}: {formatCurrency(item.expenses)}</title>
              </rect>
              
              {/* Savings bar */}
              <rect
                x={x + barWidth * 0.5}
                y={95 - savingsHeight - 10}
                width={barWidth}
                height={savingsHeight}
                fill="url(#savingsGradient)"
                className="hover:opacity-80 transition-opacity duration-300"
                rx="0.5"
              >
                <title>Economia {item.month}: {formatCurrency(item.savings)}</title>
              </rect>
              
              {/* Month label */}
              <text x={x} y="97" textAnchor="middle" fontSize="2.5" fill="#9CA3AF">
                {item.month}
              </text>
            </g>
          )
        })}
        
        {/* Gradients */}
        <defs>
          <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="1"/>
          </linearGradient>
          <linearGradient id="expenseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="1"/>
          </linearGradient>
          <linearGradient id="savingsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#2563EB" stopOpacity="1"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Componente de Gráfico de Evolução da Carteira - AJUSTADO PARA PREENCHER MAIS ESPAÇO
const PortfolioEvolutionChart = ({ data, height = 400 }) => {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="w-full h-full flex items-center justify-center" style={{ minHeight: height }}>
      <div className="text-gray-400">Carregando gráfico...</div>
    </div>
  }

  const maxValue = Math.max(...data.map(d => d.total))
  const minValue = Math.min(...data.map(d => Math.min(d.rendaFixa, d.rendaVariavel)))
  const range = maxValue - minValue
  
  const getY = (value) => 85 - ((value - minValue) / range) * 70
  
  const createPath = (values) => {
    return values.map((value, index) => {
      const x = (index / (values.length - 1)) * 85 + 7.5
      const y = getY(value)
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
  }
  
  return (
    <div className="w-full h-full" style={{ minHeight: height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
        {/* Grid lines */}
        {[15, 30, 45, 60, 75, 85].map(y => (
          <line key={y} x1="7.5" y1={y} x2="92.5" y2={y} stroke="#374151" strokeWidth="0.2" opacity="0.3" />
        ))}
        
        {/* Area fills */}
        <defs>
          <linearGradient id="totalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1"/>
          </linearGradient>
          <linearGradient id="fixedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.1"/>
          </linearGradient>
          <linearGradient id="variableGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        
        {/* Area paths */}
        <path
          d={`${createPath(data.map(d => d.total))} L 92.5 85 L 7.5 85 Z`}
          fill="url(#totalGradient)"
          opacity="0.6"
        />
        
        {/* Lines */}
        <path
          d={createPath(data.map(d => d.total))}
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="1.2"
          className="drop-shadow-sm"
        />
        
        <path
          d={createPath(data.map(d => d.rendaFixa))}
          fill="none"
          stroke="#6366F1"
          strokeWidth="1"
          strokeDasharray="3,2"
        />
        
        <path
          d={createPath(data.map(d => d.rendaVariavel))}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="1"
          strokeDasharray="3,2"
        />
        
        {/* Data points */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 85 + 7.5
          return (
            <g key={index}>
              <circle cx={x} cy={getY(item.total)} r="1.5" fill="#8B5CF6" className="drop-shadow-sm">
                <title>Total {item.month}: {formatCurrency(item.total)}</title>
              </circle>
              <circle cx={x} cy={getY(item.rendaFixa)} r="1" fill="#6366F1">
                <title>Renda Fixa {item.month}: {formatCurrency(item.rendaFixa)}</title>
              </circle>
              <circle cx={x} cy={getY(item.rendaVariavel)} r="1" fill="#3B82F6">
                <title>Renda Variável {item.month}: {formatCurrency(item.rendaVariavel)}</title>
              </circle>
              
              {/* Month labels */}
              <text x={x} y="95" textAnchor="middle" fontSize="2.5" fill="#9CA3AF">
                {item.month}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// Componente de Gráfico de Pizza Avançado para Alocação
const AllocationPieChart = ({ data, size = 280 }) => {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="text-gray-400">Carregando...</div>
    </div>
  }

  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0
  
  const radius = size / 2 - 20
  const centerX = size / 2
  const centerY = size / 2
  
  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="drop-shadow-lg">
        <defs>
          {data.map((item, index) => (
            <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={item.color} stopOpacity="1"/>
              <stop offset="100%" stopColor={item.color} stopOpacity="0.7"/>
            </linearGradient>
          ))}
        </defs>
        
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100
          const angle = (item.value / total) * 360
          const startAngle = currentAngle
          const endAngle = currentAngle + angle
          
          const x1 = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180)
          const y1 = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180)
          const x2 = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180)
          const y2 = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180)
          
          const largeArcFlag = angle > 180 ? 1 : 0
          
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ')
          
          // Label position
          const labelAngle = (startAngle + endAngle) / 2
          const labelRadius = radius * 0.7
          const labelX = centerX + labelRadius * Math.cos((labelAngle - 90) * Math.PI / 180)
          const labelY = centerY + labelRadius * Math.sin((labelAngle - 90) * Math.PI / 180)
          
          currentAngle += angle
          
          return (
            <g key={index}>
              <path
                d={pathData}
                fill={`url(#gradient-${index})`}
                className="hover:opacity-80 transition-all duration-300 hover:scale-105"
                style={{ transformOrigin: `${centerX}px ${centerY}px` }}
              >
                <title>{`${item.name}: ${percentage.toFixed(1)}% (${formatCurrency(item.value)})`}</title>
              </path>
              
              {/* Percentage labels */}
              {percentage > 8 && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fill="white"
                  fontWeight="bold"
                  className="drop-shadow-sm"
                >
                  {percentage.toFixed(0)}%
                </text>
              )}
            </g>
          )
        })}
        
        {/* Center circle for donut effect */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.35}
          fill="#0D0D0D"
          className="drop-shadow-sm"
        />
        
        {/* Center text */}
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fill="#9CA3AF"
          fontWeight="bold"
        >
          Total
        </text>
        <text
          x={centerX}
          y={centerY + 8}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="#6B7280"
        >
          {formatCurrency(total)}
        </text>
      </svg>
    </div>
  )
}

// Componente de Gráfico de Uso dos Cartões Avançado - AJUSTADO PARA PREENCHER MAIS ESPAÇO
const AdvancedCardUsageChart = ({ data, height = 400 }) => {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="w-full h-full flex items-center justify-center" style={{ minHeight: height }}>
      <div className="text-gray-400">Carregando gráfico...</div>
    </div>
  }

  const maxValue = Math.max(...data.map(d => d.nubank + d.itau + d.bradesco))
  const barWidth = 75 / data.length
  
  return (
    <div className="w-full h-full" style={{ minHeight: height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
        {/* Grid lines */}
        {[15, 30, 45, 60, 75, 85].map(y => (
          <line key={y} x1="12.5" y1={y} x2="87.5" y2={y} stroke="#374151" strokeWidth="0.2" opacity="0.3" />
        ))}
        
        <defs>
          <linearGradient id="nubankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="1"/>
          </linearGradient>
          <linearGradient id="itauGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="1"/>
          </linearGradient>
          <linearGradient id="bradescoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#2563EB" stopOpacity="1"/>
          </linearGradient>
        </defs>
        
        {data.map((item, index) => {
          const x = 12.5 + (index * (75 / data.length)) + (barWidth * 0.1)
          const actualBarWidth = barWidth * 0.8
          
          const nubankHeight = (item.nubank / maxValue) * 65
          const itauHeight = (item.itau / maxValue) * 65
          const bradescoHeight = (item.bradesco / maxValue) * 65
          
          const totalHeight = nubankHeight + itauHeight + bradescoHeight
          
          return (
            <g key={index}>
              {/* Stacked bars with rounded corners */}
              <rect
                x={x}
                y={85 - nubankHeight}
                width={actualBarWidth}
                height={nubankHeight}
                fill="url(#nubankGradient)"
                className="hover:opacity-80 transition-opacity duration-300"
                rx="0.8"
              >
                <title>Nubank {item.month}: {formatCurrency(item.nubank)}</title>
              </rect>
              
              <rect
                x={x}
                y={85 - nubankHeight - itauHeight}
                width={actualBarWidth}
                height={itauHeight}
                fill="url(#itauGradient)"
                className="hover:opacity-80 transition-opacity duration-300"
                rx="0.8"
              >
                <title>Itaú {item.month}: {formatCurrency(item.itau)}</title>
              </rect>
              
              <rect
                x={x}
                y={85 - totalHeight}
                width={actualBarWidth}
                height={bradescoHeight}
                fill="url(#bradescoGradient)"
                className="hover:opacity-80 transition-opacity duration-300"
                rx="0.8"
              >
                <title>Bradesco {item.month}: {formatCurrency(item.bradesco)}</title>
              </rect>
              
              {/* Month labels */}
              <text
                x={x + actualBarWidth / 2}
                y="95"
                textAnchor="middle"
                fontSize="2.5"
                fill="#9CA3AF"
              >
                {item.month}
              </text>
              
              {/* Total value on top */}
              <text
                x={x + actualBarWidth / 2}
                y={85 - totalHeight - 3}
                textAnchor="middle"
                fontSize="2.2"
                fill="#E5E7EB"
                fontWeight="bold"
              >
                R$ {(item.nubank + item.itau + item.bradesco).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </text>
            </g>
          )
        })}
        
        {/* Y-axis labels */}
        {[0, 25, 50, 75, 100].map((percent, index) => {
          const value = (maxValue * percent) / 100
          const y = 85 - (percent * 0.65)
          return (
            <text
              key={index}
              x="10"
              y={y}
              textAnchor="end"
              fontSize="2.2"
              fill="#6B7280"
            >
              {value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [showAddGoal, setShowAddGoal] = useState(false)

  const totalBalance = 47850.32
  const monthlyIncome = 15200
  const monthlyExpenses = 9200
  const monthlySavings = 6000
  const totalInvestments = 71500
  const netWorth = totalBalance + totalInvestments

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'transactions', name: 'Transações', icon: CreditCard },
    { id: 'investments', name: 'Investimentos', icon: TrendingUp },
    { id: 'budget', name: 'Orçamento', icon: Calculator },
    { id: 'goals', name: 'Metas', icon: Target },
    { id: 'cards', name: 'Cartões', icon: CreditCard },
    { id: 'insights', name: 'Insights', icon: Lightbulb },
    { id: 'settings', name: 'Configurações', icon: Settings },
  ]

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Bell className="w-5 h-5 mr-2 text-blue-400" />
              Alertas Importantes
            </h3>
            <span className="text-sm text-blue-400">{alerts.length} alertas</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-black/20 rounded-lg">
                <div className={`p-1 rounded-full ${
                  alert.type === 'warning' ? 'bg-blue-500/20' :
                  alert.type === 'success' ? 'bg-purple-500/20' : 'bg-blue-500/20'
                }`}>
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-blue-400" />
                  ) : alert.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <p className="text-sm text-gray-300 flex-1">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Net Worth */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg">
              <Star className="w-5 h-5 text-blue-400" />
            </div>
            <button 
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="p-1 hover:bg-gray-700/50 rounded transition-colors"
            >
              {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400 text-sm">Patrimônio Líquido</p>
            <p className="text-2xl font-bold">
              {balanceVisible ? formatCurrency(netWorth) : '••••••'}
            </p>
            <div className="flex items-center text-blue-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +18.3% este ano
            </div>
          </div>
        </div>

        {/* Total Balance */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Wallet className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400 text-sm">Saldo em Conta</p>
            <p className="text-2xl font-bold text-purple-400">
              {balanceVisible ? formatCurrency(totalBalance) : '••••••'}
            </p>
            <div className="flex items-center text-purple-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5% este mês
            </div>
          </div>
        </div>

        {/* Investments */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400 text-sm">Investimentos</p>
            <p className="text-2xl font-bold text-blue-400">
              {balanceVisible ? `R$ ${totalInvestments.toLocaleString('pt-BR')}` : '••••••'}
            </p>
            <div className="flex items-center text-blue-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +22.1% este ano
            </div>
          </div>
        </div>

        {/* Monthly Savings */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <PiggyBank className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400 text-sm">Economia Mensal</p>
            <p className="text-2xl font-bold text-purple-400">
              R$ {monthlySavings.toLocaleString('pt-BR')}
            </p>
            <div className="flex items-center text-purple-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15.7% vs mês anterior
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section - AJUSTADO PARA GRÁFICOS MAIORES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Chart - AUMENTADO */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Fluxo de Caixa</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                Receitas
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                Gastos
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                Economia
              </div>
            </div>
          </div>
          <div className="h-80">
            <CashFlowChart data={monthlyData} height={320} />
          </div>
        </div>

        {/* Investment Portfolio */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6">Portfólio de Investimentos</h3>
          <div className="space-y-4">
            {investments.map((investment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: investment.color }}
                  ></div>
                  <div>
                    <p className="font-medium">{investment.name}</p>
                    <p className="text-sm text-gray-400">{investment.percentage}% da carteira</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ {investment.value.toLocaleString('pt-BR')}</p>
                  <p className="text-sm text-blue-400">{investment.return}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Goals */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Metas Financeiras</h3>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-6">
            {goals.slice(0, 3).map((goal, index) => {
              const progress = (goal.current / goal.target) * 100
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{goal.name}</p>
                      <p className="text-xs text-gray-400">Prazo: {goal.deadline}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{progress.toFixed(0)}%</p>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        goal.priority === 'high' ? 'bg-blue-500/20 text-blue-400' :
                        goal.priority === 'medium' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {goal.priority === 'high' ? 'Alta' : goal.priority === 'medium' ? 'Média' : 'Baixa'}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(progress, 100)}%`,
                        background: `linear-gradient(90deg, ${goal.color}, ${goal.color}80)`
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      R$ {goal.current.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-gray-400">
                      R$ {goal.target.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <Zap className="w-5 h-5 mr-2 text-blue-400" />
              Insights Inteligentes
            </h3>
          </div>
          <div className="space-y-4">
            {insights.slice(0, 3).map((insight, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    {insight.type === 'savings' ? (
                      <PiggyBank className="w-4 h-4 text-blue-400" />
                    ) : insight.type === 'investment' ? (
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                    ) : (
                      <Zap className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{insight.description}</p>
                    <p className="text-xs text-blue-400 mt-2 font-semibold">{insight.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderTransactions = () => (
    <div className="space-y-6">
      {/* Transaction Header - CORRIGIDO PARA MOBILE */}
      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Transações</h2>
          <p className="text-gray-400">Gerencie todas suas movimentações financeiras</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar transações..."
              className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
          <button 
            onClick={() => setShowAddTransaction(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Transação</span>
          </button>
        </div>
      </div>

      {/* Transaction Stats - CORRIGIDO PARA MOBILE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
              <ArrowUpRight className="w-5 h-5 text-purple-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-gray-400 text-sm">Total Receitas</p>
              <p className="text-xl font-bold text-purple-400 truncate">R$ 9.785,50</p>
              <p className="text-xs text-purple-400">+12.3% vs mês anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg flex-shrink-0">
              <ArrowDownRight className="w-5 h-5 text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-gray-400 text-sm">Total Gastos</p>
              <p className="text-xl font-bold text-blue-400 truncate">R$ 5.529,80</p>
              <p className="text-xs text-blue-400">-5.2% vs mês anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-gray-400 text-sm">Investimentos</p>
              <p className="text-xl font-bold text-purple-400 truncate">R$ 1.000,00</p>
              <p className="text-xs text-purple-400">Meta mensal atingida</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List - CORRIGIDO PARA MOBILE */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Todas as Transações</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {transactions.map((transaction) => {
            const IconComponent = transaction.icon
            return (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-3 sm:p-4 bg-[#0D0D0D]/50 rounded-xl hover:bg-[#0D0D0D]/70 transition-colors group cursor-pointer"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
                    transaction.type === 'income' 
                      ? 'bg-purple-500/20' 
                      : transaction.type === 'investment'
                      ? 'bg-blue-500/20'
                      : 'bg-blue-500/20'
                  }`}>
                    <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      transaction.type === 'income' 
                        ? 'text-purple-400' 
                        : transaction.type === 'investment'
                        ? 'text-blue-400'
                        : 'text-blue-400'
                    }`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base truncate">{transaction.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs sm:text-sm text-gray-400">
                      <span className="truncate">{transaction.category}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <p className={`font-semibold text-sm sm:text-lg ${
                    transaction.amount > 0 ? 'text-purple-400' : 'text-blue-400'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                    transaction.type === 'income' ? 'bg-purple-500/20 text-purple-400' :
                    transaction.type === 'investment' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {transaction.type === 'income' ? 'Receita' : 
                     transaction.type === 'investment' ? 'Investimento' : 'Gasto'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderBudget = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Orçamento Mensal</h2>
          <p className="text-gray-400">Controle seus gastos por categoria</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Orçamento Total</p>
          <p className="text-2xl font-bold">R$ 9.500,00</p>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-2xl p-6">
          <div className="text-center">
            <p className="text-purple-400 text-sm mb-2">Disponível</p>
            <p className="text-3xl font-bold text-purple-400">R$ 3.470</p>
            <p className="text-xs text-purple-400 mt-1">36.5% do orçamento</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-6">
          <div className="text-center">
            <p className="text-blue-400 text-sm mb-2">Gasto</p>
            <p className="text-3xl font-bold text-blue-400">R$ 5.880</p>
            <p className="text-xs text-blue-400 mt-1">61.9% do orçamento</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6">
          <div className="text-center">
            <p className="text-indigo-400 text-sm mb-2">Excedido</p>
            <p className="text-3xl font-bold text-indigo-400">R$ 150</p>
            <p className="text-xs text-indigo-400 mt-1">1.6% acima</p>
          </div>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-6">Categorias de Orçamento</h3>
        <div className="space-y-6">
          {budgetCategories.map((category, index) => {
            const percentage = (category.spent / category.budgeted) * 100
            const isOverBudget = category.spent > category.budgeted
            
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${isOverBudget ? 'text-blue-400' : 'text-gray-300'}`}>
                      R$ {category.spent.toLocaleString('pt-BR')} / R$ {category.budgeted.toLocaleString('pt-BR')}
                    </p>
                    <p className={`text-sm ${isOverBudget ? 'text-blue-400' : 'text-gray-400'}`}>
                      {percentage.toFixed(1)}% {isOverBudget ? 'excedido' : 'usado'}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      isOverBudget ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : ''
                    }`}
                    style={{ 
                      width: `${Math.min(percentage, 100)}%`,
                      background: isOverBudget ? undefined : `linear-gradient(90deg, ${category.color}, ${category.color}80)`
                    }}
                  ></div>
                </div>
                {isOverBudget && (
                  <div className="flex items-center text-blue-400 text-sm">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Excedido em R$ {(category.spent - category.budgeted).toLocaleString('pt-BR')}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderCards = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Cartões de Crédito</h2>
        <p className="text-gray-400">Gerencie seus cartões e limites</p>
      </div>

      {/* Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creditCards.map((card, index) => {
          const usagePercentage = (card.used / card.limit) * 100
          const isHighUsage = usagePercentage > 80
          
          return (
            <div key={index} className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: card.color }}
                  ></div>
                  <h3 className="font-semibold text-sm">{card.name}</h3>
                </div>
                <CreditCard className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Limite Usado</span>
                    <span className={`text-sm font-semibold ${isHighUsage ? 'text-blue-400' : 'text-gray-300'}`}>
                      {usagePercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isHighUsage ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Usado</p>
                    <p className="font-semibold">R$ {card.used.toLocaleString('pt-BR')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Limite</p>
                    <p className="font-semibold">R$ {card.limit.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Vencimento</span>
                    <span className="text-sm font-medium">{card.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Card Usage Chart - AUMENTADO */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Uso dos Cartões (Últimos 6 meses)</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              Nubank
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
              Itaú
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              Bradesco
            </div>
          </div>
        </div>
        <div className="h-80">
          <AdvancedCardUsageChart data={cardUsageData} height={320} />
        </div>
      </div>
    </div>
  )

  const renderInvestments = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Investimentos</h2>
          <p className="text-gray-400">Acompanhe e gerencie sua carteira de investimentos</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Novo Investimento</span>
          </button>
        </div>
      </div>

      {/* Investment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <PieChart className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Patrimônio Total</p>
              <p className="text-2xl font-bold text-purple-400">R$ 71.500</p>
              <p className="text-xs text-purple-400">+22.1% este ano</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Rendimento Mensal</p>
              <p className="text-2xl font-bold text-blue-400">R$ 636</p>
              <p className="text-xs text-blue-400">+8.5% vs mês anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <Percent className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Rentabilidade</p>
              <p className="text-2xl font-bold text-indigo-400">10.7%</p>
              <p className="text-xs text-indigo-400">Média anual</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Diversificação</p>
              <p className="text-2xl font-bold text-blue-400">5</p>
              <p className="text-xs text-blue-400">Tipos de ativos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Performance Chart - AUMENTADO */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Evolução da Carteira</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
              Renda Fixa
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              Renda Variável
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              Total
            </div>
          </div>
        </div>
        <div className="h-80">
          <PortfolioEvolutionChart data={investmentPerformanceData} height={320} />
        </div>
      </div>

      {/* Investment Portfolio Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Breakdown */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6">Composição da Carteira</h3>
          <div className="space-y-4">
            {investments.map((investment) => (
              <div key={investment.id} className="p-4 bg-[#0D0D0D]/50 rounded-xl hover:bg-[#0D0D0D]/70 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: investment.color }}
                    ></div>
                    <div>
                      <p className="font-medium">{investment.name}</p>
                      <p className="text-xs text-gray-400">{investment.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">R$ {investment.value.toLocaleString('pt-BR')}</p>
                    <p className="text-sm text-blue-400">{investment.return}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Tipo</p>
                    <p className="font-medium">{investment.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Risco</p>
                    <p className={`font-medium ${
                      investment.risk === 'Baixo' ? 'text-purple-400' :
                      investment.risk === 'Médio' ? 'text-blue-400' :
                      investment.risk === 'Alto' ? 'text-indigo-400' :
                      'text-blue-400'
                    }`}>{investment.risk}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Liquidez</p>
                    <p className="font-medium">{investment.liquidity}</p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Rendimento Mensal</span>
                    <span className="text-sm font-semibold text-blue-400">
                      +R$ {investment.monthlyReturn.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Allocation Chart */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6">Alocação por Tipo</h3>
          <div className="flex items-center justify-center mb-6">
            <AllocationPieChart data={investments} size={280} />
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-1 gap-3">
            {investments.map((investment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#0D0D0D]/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: investment.color }}
                  ></div>
                  <span className="text-sm font-medium">{investment.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold">{investment.percentage}%</span>
                  <p className="text-xs text-gray-400">R$ {investment.value.toLocaleString('pt-BR')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderGoals = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Metas Financeiras</h2>
          <p className="text-gray-400">Defina e acompanhe seus objetivos financeiros</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowAddGoal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Meta</span>
          </button>
        </div>
      </div>

      {/* Goals Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total de Metas</p>
              <p className="text-2xl font-bold text-blue-400">{goals.length}</p>
              <p className="text-xs text-blue-400">Ativas</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Metas Atingidas</p>
              <p className="text-2xl font-bold text-purple-400">2</p>
              <p className="text-xs text-purple-400">Este ano</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <PiggyBank className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Poupado</p>
              <p className="text-2xl font-bold text-indigo-400">R$ 86.500</p>
              <p className="text-xs text-indigo-400">Todas as metas</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Próximo Prazo</p>
              <p className="text-2xl font-bold text-blue-400">2024-04</p>
              <p className="text-xs text-blue-400">Setup Home Office</p>
            </div>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Todas as Metas</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100
            const remaining = goal.target - goal.current
            const monthsRemaining = new Date(goal.deadline).getMonth() - new Date().getMonth() + 
              (new Date(goal.deadline).getFullYear() - new Date().getFullYear()) * 12
            const monthlyNeeded = monthsRemaining > 0 ? remaining / monthsRemaining : 0
            
            return (
              <div key={goal.id} className="p-6 bg-[#0D0D0D]/50 rounded-xl hover:bg-[#0D0D0D]/70 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: goal.color }}
                      ></div>
                      <h4 className="font-semibold">{goal.name}</h4>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        goal.priority === 'high' ? 'bg-blue-500/20 text-blue-400' :
                        goal.priority === 'medium' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {goal.priority === 'high' ? 'Alta' : goal.priority === 'medium' ? 'Média' : 'Baixa'}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{goal.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>📅 {goal.deadline}</span>
                      <span>🏷️ {goal.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setEditingGoal(goal.id)}
                      className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors text-blue-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progresso</span>
                    <span className="font-semibold">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(progress, 100)}%`,
                        background: `linear-gradient(90deg, ${goal.color}, ${goal.color}80)`
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      R$ {goal.current.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-gray-400">
                      R$ {goal.target.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
                
                {/* Goal Stats */}
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-700">
                  <div>
                    <p className="text-xs text-gray-400">Faltam</p>
                    <p className="font-semibold text-sm">R$ {remaining.toLocaleString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Mensal necessário</p>
                    <p className="font-semibold text-sm">R$ {monthlyNeeded.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>
                
                {/* Action Button */}
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-blue-500/30 text-blue-400 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                  Adicionar Valor
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderInsights = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Zap className="w-7 h-7 mr-3 text-blue-400" />
            Insights Inteligentes
          </h2>
          <p className="text-gray-400">Análises personalizadas para otimizar suas finanças</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2">
            <Lightbulb className="w-4 h-4" />
            <span>Gerar Novos Insights</span>
          </button>
        </div>
      </div>

      {/* Insights Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Lightbulb className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Insights</p>
              <p className="text-2xl font-bold text-blue-400">{insights.length}</p>
              <p className="text-xs text-blue-400">Disponíveis</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Alta Prioridade</p>
              <p className="text-2xl font-bold text-purple-400">
                {insights.filter(i => i.priority === 'high').length}
              </p>
              <p className="text-xs text-purple-400">Requer atenção</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <PiggyBank className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Economia Potencial</p>
              <p className="text-2xl font-bold text-indigo-400">R$ 4.080</p>
              <p className="text-xs text-indigo-400">Por ano</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Retorno Potencial</p>
              <p className="text-2xl font-bold text-blue-400">+15%</p>
              <p className="text-xs text-blue-400">Investimentos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Priority Insights */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-purple-400" />
              Prioridade Alta
            </h3>
            <span className="text-sm text-purple-400">
              {insights.filter(i => i.priority === 'high').length} insights
            </span>
          </div>
          <div className="space-y-4">
            {insights.filter(i => i.priority === 'high').map((insight) => (
              <div key={insight.id} className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    {insight.type === 'savings' ? (
                      <PiggyBank className="w-4 h-4 text-purple-400" />
                    ) : insight.type === 'investment' ? (
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                    ) : insight.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-purple-400" />
                    ) : (
                      <Zap className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
                        {insight.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-purple-400 font-semibold">{insight.impact}</p>
                      <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                        {insight.action}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Insights */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
              Oportunidades de Investimento
            </h3>
            <span className="text-sm text-blue-400">
              {insights.filter(i => i.type === 'investment').length} insights
            </span>
          </div>
          <div className="space-y-4">
            {insights.filter(i => i.type === 'investment').map((insight) => (
              <div key={insight.id} className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                        {insight.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-blue-400 font-semibold">{insight.impact}</p>
                      <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                        {insight.action}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Insights */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Todos os Insights</h3>
          <div className="flex items-center space-x-2">
            <select className="bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all">
              <option value="all">Todas as categorias</option>
              <option value="savings">Economia</option>
              <option value="investment">Investimentos</option>
              <option value="optimization">Otimização</option>
              <option value="warning">Alertas</option>
            </select>
            <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight) => (
            <div key={insight.id} className="p-4 bg-[#0D0D0D]/50 rounded-xl hover:bg-[#0D0D0D]/70 transition-colors">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  insight.type === 'savings' ? 'bg-blue-500/20' :
                  insight.type === 'investment' ? 'bg-purple-500/20' :
                  insight.type === 'warning' ? 'bg-indigo-500/20' :
                  'bg-blue-500/20'
                }`}>
                  {insight.type === 'savings' ? (
                    <PiggyBank className={`w-4 h-4 ${
                      insight.type === 'savings' ? 'text-blue-400' :
                      insight.type === 'investment' ? 'text-purple-400' :
                      insight.type === 'warning' ? 'text-indigo-400' :
                      'text-blue-400'
                    }`} />
                  ) : insight.type === 'investment' ? (
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                  ) : insight.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Zap className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      insight.priority === 'high' ? 'bg-purple-500/20 text-purple-400' :
                      insight.priority === 'medium' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      {insight.priority === 'high' ? 'Alta' : insight.priority === 'medium' ? 'Média' : 'Baixa'}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-semibold ${
                      insight.type === 'savings' ? 'text-blue-400' :
                      insight.type === 'investment' ? 'text-purple-400' :
                      insight.type === 'warning' ? 'text-indigo-400' :
                      'text-blue-400'
                    }`}>{insight.impact}</p>
                    <span className="text-xs px-2 py-1 bg-gray-700/50 text-gray-400 rounded-full">
                      {insight.category}
                    </span>
                  </div>
                  <button className="w-full mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors text-left">
                    💡 {insight.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Configurações</h2>
        <p className="text-gray-400">Personalize sua experiência no FinanceHub Pro</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold">Perfil</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Nome Completo</label>
              <input 
                type="text" 
                defaultValue="João Silva"
                className="w-full bg-[#0D0D0D]/50 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input 
                type="email" 
                defaultValue="joao.silva@email.com"
                className="w-full bg-[#0D0D0D]/50 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Telefone</label>
              <input 
                type="tel" 
                defaultValue="(11) 99999-9999"
                className="w-full bg-[#0D0D0D]/50 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3 rounded-lg text-sm font-medium transition-all duration-300">
              Salvar Alterações
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Lock className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold">Segurança</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-lg">
              <div>
                <p className="font-medium">Autenticação de Dois Fatores</p>
                <p className="text-sm text-gray-400">Adicione uma camada extra de segurança</p>
              </div>
              <button className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg text-sm">
                Ativado
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-lg">
              <div>
                <p className="font-medium">Notificações de Login</p>
                <p className="text-sm text-gray-400">Receba alertas sobre novos acessos</p>
              </div>
              <button className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
                Ativo
              </button>
            </div>
            
            <button className="w-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-400 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:from-purple-500/30 hover:to-blue-500/30">
              Alterar Senha
            </button>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Palette className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold">Aparência</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Tema</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center space-x-3 p-3 bg-[#0D0D0D]/50 border border-blue-500/30 rounded-lg">
                  <Moon className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Escuro</span>
                </button>
                <button className="flex items-center space-x-3 p-3 bg-[#0D0D0D]/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
                  <Sun className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Claro</span>
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Cor de Destaque</label>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-blue-400"></div>
                <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-purple-400"></div>
                <div className="w-8 h-8 bg-indigo-500 rounded-full border border-gray-700"></div>
                <div className="w-8 h-8 bg-violet-500 rounded-full border border-gray-700"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-lg">
              <div>
                <p className="font-medium">Animações</p>
                <p className="text-sm text-gray-400">Efeitos visuais e transições</p>
              </div>
              <button className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
                Ativo
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Bell className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold">Notificações</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-lg">
              <div>
                <p className="font-medium">Alertas de Orçamento</p>
                <p className="text-sm text-gray-400">Quando exceder limites</p>
              </div>
              <button className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg text-sm">
                Ativo
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-lg">
              <div>
                <p className="font-medium">Vencimento de Cartões</p>
                <p className="text-sm text-gray-400">Lembrete de faturas</p>
              </div>
              <button className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
                Ativo
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-lg">
              <div>
                <p className="font-medium">Insights Semanais</p>
                <p className="text-sm text-gray-400">Relatório por email</p>
              </div>
              <button className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-lg text-sm">
                Inativo
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-lg">
              <div>
                <p className="font-medium">Metas Atingidas</p>
                <p className="text-sm text-gray-400">Celebrar conquistas</p>
              </div>
              <button className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg text-sm">
                Ativo
              </button>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold">Dados & Privacidade</h3>
          </div>
          
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-lg hover:bg-[#0D0D0D]/70 transition-colors">
              <div className="flex items-center space-x-3">
                <Download className="w-4 h-4 text-blue-400" />
                <span>Exportar Dados</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-lg hover:bg-[#0D0D0D]/70 transition-colors">
              <div className="flex items-center space-x-3">
                <Database className="w-4 h-4 text-purple-400" />
                <span>Backup Automático</span>
              </div>
              <span className="text-sm text-purple-400">Ativo</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-lg hover:bg-[#0D0D0D]/70 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-gray-400" />
                <span>Política de Privacidade</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Support & Help */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <HelpCircle className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold">Suporte & Ajuda</h3>
          </div>
          
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-lg hover:bg-[#0D0D0D]/70 transition-colors">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Central de Ajuda</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-lg hover:bg-[#0D0D0D]/70 transition-colors">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>Contatar Suporte</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-lg hover:bg-[#0D0D0D]/70 transition-colors">
              <div className="flex items-center space-x-3">
                <Star className="w-4 h-4 text-blue-400" />
                <span>Avaliar App</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            <div className="pt-4 border-t border-gray-700">
              <button className="w-full flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-400 rounded-lg hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300">
                <LogOut className="w-4 h-4" />
                <span>Sair da Conta</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-gray-800/50 rounded-2xl p-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold">FinanceHub Pro</h3>
          </div>
          <p className="text-sm text-gray-400">Versão 2.1.0</p>
          <p className="text-xs text-gray-500">© 2024 FinanceHub Pro. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header - CORRIGIDO PARA MOBILE */}
      <header className="border-b border-gray-800/50 bg-[#1A1A1A]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-geist-sans font-semibold">FinanceHub Pro</h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-[#1A1A1A] border border-gray-700 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              >
                <option value="7d">7 dias</option>
                <option value="30d">30 dias</option>
                <option value="90d">90 dias</option>
                <option value="1y">1 ano</option>
              </select>
              
              <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                {alerts.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{alerts.length}</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs - CORRIGIDO PARA MOBILE */}
      <nav className="border-b border-gray-800/50 bg-[#1A1A1A]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/30'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'transactions' && renderTransactions()}
        {activeTab === 'budget' && renderBudget()}
        {activeTab === 'cards' && renderCards()}
        {activeTab === 'investments' && renderInvestments()}
        {activeTab === 'goals' && renderGoals()}
        {activeTab === 'insights' && renderInsights()}
        {activeTab === 'settings' && renderSettings()}
      </main>
    </div>
  )
}