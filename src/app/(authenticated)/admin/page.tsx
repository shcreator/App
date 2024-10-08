'use client'

import { Typography, Card, Row, Col, Statistic, Button } from 'antd'
import {
  ShoppingOutlined,
  UserOutlined,
  DollarOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AdminDashboardPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: salesData } = Api.purchase.findMany.useQuery({})
  const { data: usersData } = Api.user.findMany.useQuery({})

  const totalSales =
    salesData?.reduce((acc, purchase) => acc + purchase.price, 0) || 0
  const activeUsers =
    usersData?.filter(user => user.status === 'VERIFIED').length || 0

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Admin Dashboard</Title>
      <Paragraph>
        Welcome to the admin dashboard. Here you can monitor key metrics and
        access administrative tasks.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Total Sales"
              value={totalSales}
              precision={2}
              prefix={<DollarOutlined />}
              suffix="USD"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title="Active Users"
              value={activeUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Button
            type="primary"
            icon={<AppstoreOutlined />}
            onClick={() => handleNavigate('/admin/products')}
            block
          >
            Manage Products
          </Button>
        </Col>
        <Col xs={24} sm={8}>
          <Button
            type="primary"
            icon={<UserOutlined />}
            onClick={() => handleNavigate('/admin/users')}
            block
          >
            Manage Users
          </Button>
        </Col>
        <Col xs={24} sm={8}>
          <Button
            type="primary"
            icon={<ShoppingOutlined />}
            onClick={() => handleNavigate('/admin/transactions')}
            block
          >
            Manage Transactions
          </Button>
        </Col>
      </Row>

      <Title level={3} style={{ marginTop: '24px' }}>
        Recent Sales
      </Title>
      {salesData?.slice(0, 5).map(sale => (
        <Card key={sale.id} style={{ marginBottom: '12px' }}>
          <Row justify="space-between">
            <Col>
              <strong>{sale.product?.name || 'Unknown Product'}</strong>
            </Col>
            <Col>${sale.price.toFixed(2)}</Col>
            <Col>{dayjs(sale.purchaseDate).format('MMMM D, YYYY')}</Col>
          </Row>
        </Card>
      ))}
    </PageLayout>
  )
}
