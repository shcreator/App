'use client'

import { Typography, Table, Space, Card, Row, Col } from 'antd'
import { WalletOutlined, HistoryOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function WalletPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: walletTransactions, isLoading } =
    Api.walletTransaction.findMany.useQuery({
      where: { userId: user?.id },
      orderBy: { dateCreated: 'desc' },
    })

  const { data: purchases } = Api.purchase.findMany.useQuery({
    where: { userId: user?.id },
    include: { product: true },
    orderBy: { dateCreated: 'desc' },
  })

  const calculateBalance = () => {
    if (!walletTransactions) return 0
    return walletTransactions.reduce((acc, transaction) => {
      return transaction.transactionType === 'TOP_UP'
        ? acc + transaction.amount
        : acc - transaction.amount
    }, 0)
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
  ]

  const purchaseColumns = [
    {
      title: 'Date',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (product: any) => product.name,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>My Wallet</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Card>
              <Space direction="vertical">
                <Text strong>Current Balance</Text>
                <Title level={3}>
                  <WalletOutlined /> ${calculateBalance().toFixed(2)}
                </Title>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              hoverable
              onClick={() => router.push('/balance-topup')}
              style={{ cursor: 'pointer' }}
            >
              <Space direction="vertical">
                <Text strong>Top Up Balance</Text>
                <Text>Click here to add funds to your wallet</Text>
              </Space>
            </Card>
          </Col>
        </Row>
        <Title level={3}>
          <HistoryOutlined /> Transaction History
        </Title>
        <Table
          dataSource={walletTransactions}
          columns={columns}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
        <Title level={3}>
          <HistoryOutlined /> Purchase History
        </Title>
        <Table
          dataSource={purchases}
          columns={purchaseColumns}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Space>
    </PageLayout>
  )
}
