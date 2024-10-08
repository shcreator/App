'use client'

import { Typography, Button, Spin, Card, Space } from 'antd'
import { ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ProductDetailsPage() {
  const router = useRouter()
  const params = useParams<{ productId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: product, isLoading } = Api.product.findUnique.useQuery({
    where: { id: params.productId },
  })

  const { data: userWallet, isLoading: isLoadingWallet } =
    Api.walletTransaction.findMany.useQuery({
      where: { userId: user?.id },
    })

  const { mutateAsync: purchaseProduct } = Api.purchase.create.useMutation()

  const walletBalance =
    userWallet?.reduce((acc, transaction) => acc + transaction.amount, 0) || 0

  const handlePurchase = async () => {
    if (!product) return

    if (walletBalance < product.price) {
      enqueueSnackbar('Insufficient balance. Please top up your wallet.', {
        variant: 'error',
      })
      router.push('/balance-topup')
      return
    }

    try {
      await purchaseProduct({
        data: {
          price: product.price,
          purchaseDate: new Date().toISOString(),
          userId: user?.id || '',
          productId: product.id,
        },
      })
      enqueueSnackbar('Product purchased successfully!', { variant: 'success' })
      router.push('/purchase-history')
    } catch (error) {
      enqueueSnackbar('Failed to purchase product. Please try again.', {
        variant: 'error',
      })
    }
  }

  if (isLoading || isLoadingWallet) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!product) {
    return (
      <PageLayout layout="narrow">
        <Title level={2}>Product Not Found</Title>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Product Details</Title>
        <Card>
          <Title level={3}>{product.name}</Title>
          <Paragraph>{product.description}</Paragraph>
          <Paragraph>
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </Paragraph>
          <Space>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handlePurchase}
              disabled={!user}
            >
              Purchase
            </Button>
            <Button
              icon={<DollarOutlined />}
              onClick={() => router.push('/balance-topup')}
              disabled={!user}
            >
              Top Up Wallet
            </Button>
          </Space>
        </Card>
        {user && (
          <Card>
            <Title level={4}>Your Wallet</Title>
            <Paragraph>
              <strong>Current Balance:</strong> ${walletBalance.toFixed(2)}
            </Paragraph>
          </Card>
        )}
      </Space>
    </PageLayout>
  )
}
