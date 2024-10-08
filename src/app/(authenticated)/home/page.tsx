'use client'

import { Table, Input, Typography, Space } from 'antd'
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Prisma } from '@prisma/client'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchTerm, setSearchTerm] = useState('')

  const { data: products, isLoading } = Api.product.findMany.useQuery({})

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Prisma.ProductGetPayload<{}>) => (
        <Space size="middle">
          <ShoppingCartOutlined
            onClick={() => router.push(`/products/${record.id}`)}
            style={{ fontSize: '20px', cursor: 'pointer' }}
          />
        </Space>
      ),
    },
  ]

  const filteredProducts = products?.filter(
    product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Digital Products Catalog</Title>
      <Paragraph>
        Browse our selection of digital products and find what you need.
      </Paragraph>

      <Input
        placeholder="Search products"
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16 }}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <Table
        columns={columns}
        dataSource={filteredProducts}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </PageLayout>
  )
}
