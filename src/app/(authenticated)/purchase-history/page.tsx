'use client'

import { Typography, List, Card, Button, Space, Row, Col } from 'antd'
import { DownloadOutlined, ShoppingOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function PurchaseHistoryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: purchases, isLoading } = Api.purchase.findMany.useQuery({
    where: { userId: user?.id },
    include: { product: true },
    orderBy: { purchaseDate: 'desc' },
  })

  const handleDownload = (fileUrl: string | null | undefined) => {
    if (fileUrl) {
      window.open(fileUrl, '_blank')
    } else {
      enqueueSnackbar('No file available for download', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Purchase History</Title>
        <Text>View and manage your past purchases</Text>

        <List
          loading={isLoading}
          dataSource={purchases}
          renderItem={purchase => (
            <List.Item>
              <Card style={{ width: '100%' }}>
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={24} sm={12}>
                    <Space direction="vertical">
                      <Text strong>{purchase.product?.name}</Text>
                      <Text>Price: ${purchase.price.toFixed(2)}</Text>
                      <Text>
                        Purchased on:{' '}
                        {dayjs(purchase.purchaseDate).format('MMMM D, YYYY')}
                      </Text>
                    </Space>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Space>
                      {purchase.product?.fileUrl && (
                        <Button
                          icon={<DownloadOutlined />}
                          onClick={() =>
                            handleDownload(purchase.product?.fileUrl)
                          }
                        >
                          Download
                        </Button>
                      )}
                      <Button
                        icon={<ShoppingOutlined />}
                        onClick={() =>
                          router.push(`/products/${purchase.product?.id}`)
                        }
                      >
                        View Product
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </Space>
    </PageLayout>
  )
}
