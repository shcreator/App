'use client'

import { Typography, Card, InputNumber, Button, Space, Row, Col } from 'antd'
import { WalletOutlined, DollarOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BalanceTopupPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [topupAmount, setTopupAmount] = useState<number | null>(null)

  const { data: walletTransactions, isLoading } =
    Api.walletTransaction.findMany.useQuery({
      where: { userId: user?.id },
      orderBy: { dateCreated: 'desc' },
    })

  const { mutateAsync: createWalletTransaction } =
    Api.walletTransaction.create.useMutation()

  const currentBalance =
    walletTransactions?.reduce((acc, transaction) => {
      return transaction.transactionType === 'CREDIT'
        ? acc + transaction.amount
        : acc - transaction.amount
    }, 0) || 0

  const handleTopup = async () => {
    if (!topupAmount || topupAmount <= 0) {
      enqueueSnackbar('Please enter a valid amount', { variant: 'error' })
      return
    }

    try {
      await createWalletTransaction({
        data: {
          amount: topupAmount,
          transactionType: 'CREDIT',
          transactionDate: new Date().toISOString(),
          userId: user?.id || '',
        },
      })
      enqueueSnackbar('Wallet topped up successfully', { variant: 'success' })
      setTopupAmount(null)
      router.push('/wallet')
    } catch (error) {
      enqueueSnackbar('Failed to top up wallet', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Wallet Balance and Top-up</Title>
        <Text>
          View your current wallet balance and add funds to your account.
        </Text>

        <Card>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12}>
              <Space>
                <WalletOutlined style={{ fontSize: '24px' }} />
                <Title level={4}>Current Balance</Title>
              </Space>
            </Col>
            <Col xs={24} sm={12}>
              <Text strong style={{ fontSize: '18px' }}>
                ${currentBalance.toFixed(2)}
              </Text>
            </Col>
          </Row>
        </Card>

        <Card title="Top-up Your Wallet">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Text>Enter the amount you want to add to your wallet:</Text>
            <InputNumber
              prefix={<DollarOutlined />}
              min={0}
              step={0.01}
              style={{ width: '100%' }}
              value={topupAmount}
              onChange={value => setTopupAmount(value)}
            />
            <Button type="primary" onClick={handleTopup} block>
              Top-up Wallet
            </Button>
          </Space>
        </Card>
      </Space>
    </PageLayout>
  )
}
